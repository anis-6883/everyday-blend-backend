const sendVerificationEmail = require("../middleware/sendEmailVerification");
const User = require("../models/User");
const {
  exclude,
  generateSignature,
  GeneratePassword,
  GenerateSalt,
  validatePassword,
  generateVerificationCode,
  GenerateVerificationToken,
  CheckOptValidity,
  IsTimestampSmallerThanTwoMinutesAgo,
} = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const EXPIRE_TIME = 60 * 60 * 20 * 1000; // 20 Hours

// Create New User
const CreateUser = async (userInputs) => {
  try {
    const { email, password, provider } = userInputs;

    const existingUser = await User.findOne({ email });

    if (existingUser && existingUser.email_verified !== 0) {
      return { status: false, message: "This email already exist!" };
    }

    if (existingUser && existingUser.email_verified === 0) {
      await User.deleteOne({ email: existingUser.email });
    }

    const salt = await GenerateSalt();
    const hashedPassword = await GeneratePassword(password, salt);

    if (provider === "email") {
      const otp = generateVerificationCode(6);

      const hashedOtp = await bcrypt.hash(otp, 10);

      const newUser = new User({
        name: userInputs.name,
        email: email,
        password: hashedPassword,
        provider: userInputs.provider,
        salt: salt,
        verify_code: hashedOtp,
      });

      await newUser.save();
      // Send Email
      await sendVerificationEmail(newUser?.email, otp);

      // Generate access token
      const accessToken = await GenerateVerificationToken({
        email: newUser.email,
      });

      return { status: true, accessToken, message: "OTP send successfully!" };
    } else {
      return { status: false };
    }
  } catch (error) {
    console.error("Error", error);
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      throw new Error("Email is already exist!");
    }
    throw new Error("Failed to create user");
  }
};

// User Sign In
const signIn = async (userInfo) => {
  try {
    const { email, password } = userInfo;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const validPassword = await validatePassword(
        password,
        existingUser.password,
        existingUser.salt
      );

      if (validPassword) {
        const accessToken = await generateSignature(
          {
            email: existingUser.email,
            role: existingUser.role,
          },
          60 * 60 * 24 // 1 Day
        );

        const refreshToken = await generateSignature(
          {
            email: existingUser.email,
            role: existingUser.role,
          },
          60 * 60 * 24 * 7 // 7 Days
        );

        const user = exclude(existingUser.toObject(), [
          "_id",
          "__v",
          "password",
          "salt",
          "verify_code",
          "provider",
          "forget_code",
          "createdAt",
          "updatedAt",
        ]);
        return {
          status: true,
          message: "Login successfully!",
          data: {
            accessToken,
            refreshToken,
            expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
            ...user,
          },
        };
      } else {
        return {
          status: false,
          message: "Your credentials are incorrect or have expired!",
        };
      }
    } else {
      return {
        status: false,
        message: "Your credentials are incorrect or have expired!",
      };
    }
  } catch (error) {
    console.error("Error in Sign In:", error);
    throw new Error("Failed to Sign In user");
  }
};

// Get Access Token
const getAccessToken = async (userInfo) => {
  try {
    const accessToken = await generateSignature(
      {
        email: userInfo.email,
        role: userInfo.role,
      },
      60 * 60 * 24 // 1 Day
    );

    const refreshToken = await generateSignature(
      {
        email: userInfo.email,
        role: userInfo.role,
      },
      60 * 60 * 24 * 7 // 7 Days
    );

    return {
      status: true,
      message: "Access Token refresh successfully!",
      data: {
        accessToken,
        refreshToken,
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  } catch (error) {
    console.error("Error in Sign In:", error);
    throw new Error("Failed to Sign In user");
  }
};

// Verify Email
const VerifyEmail = async (optInfo) => {
  try {
    const { token, otp } = optInfo;
    const decode = jwt.verify(token, process.env.APP_SECRET);
    const email = decode.email;
    const findUser = await User.findOne({ email });

    if (!findUser) {
      return { status: false, message: "Otp is expired or incorrect!" };
    }

    // console.log(findUser);

    const hashedOtp = findUser.verify_code;
    const isValidOpt = await CheckOptValidity(otp, hashedOtp);
    const isValidTime = IsTimestampSmallerThanTwoMinutesAgo(findUser.createdAt);

    if (isValidOpt && isValidTime) {
      const userData = {
        email_verified: 1,
        status: 1,
        verify_code: null,
      };
      const verifiedUser = await User.findByIdAndUpdate(findUser._id, userData);
      const accessToken = await generateSignature({
        email: verifiedUser.email,
        role: verifiedUser.role,
      });
      const user = Exclude(verifiedUser.toObject(), [
        "password",
        "salt",
        "verify_code",
        "provider",
        "forget_code",
        "createdAt",
        "updatedAt",
        "_id",
        "__v",
      ]);
      return { status: true, data: { user, accessToken } };
    } else {
      return { status: false, message: "OTP is expired or incorrect!" };
    }
  } catch (error) {
    console.error("Error", error);
    throw new Error("Failed");
  }
};

// Resend OTP
const ResendOTP = async (userInfo) => {
  try {
    const { email } = userInfo;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return { status: false, message: "User not found" };
    }

    if (existingUser.email_verified !== 0) {
      return { status: false, message: "Email is already verified" };
    }

    const otp = generateVerificationCode(6);
    const hashedOtp = await bcrypt.hash(otp, 10);

    await User.findByIdAndUpdate(existingUser._id, { verify_code: hashedOtp });

    await sendVerificationEmail(existingUser.email, otp);

    return { status: true, message: "New OTP sent successfully!" };
  } catch (error) {
    console.error("Error in Resend Verification Email:", error);
    throw new Error("Failed to resend verification email");
  }
};

// Change Password
const ChangePassword = async ({ email, oldPassword, newPassword }) => {
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return { status: false, message: "User not found" };
    }

    const isPasswordValid = await validatePassword(
      oldPassword,
      existingUser.password,
      existingUser.salt
    );

    if (!isPasswordValid) {
      return { status: false, message: "Invalid old password" };
    }

    if (oldPassword === newPassword) {
      return {
        status: false,
        message: "New password cannot be the same as the old password",
      };
    }

    const newSalt = await GenerateSalt();
    const hashedNewPassword = await GeneratePassword(newPassword, newSalt);

    existingUser.password = hashedNewPassword;
    existingUser.salt = newSalt;

    await existingUser.save();

    return { status: true, message: "Password changed successfully" };
  } catch (error) {
    console.error("Error in Change Password:", error);
    throw new Error("Failed to change password");
  }
};

// Get User Profile
const GetProfile = async (userInfo) => {
  try {
    const { email } = userInfo;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new Error("No Profile");
    }

    const userWithoutSensitiveInfo = exclude(existingUser.toObject(), [
      "_id",
      "__v",
      "password",
      "salt",
      "verify_code",
      "provider",
      "forget_code",
      "createdAt",
      "updatedAt",
    ]);

    return {
      status: true,
      message: "User profile found",
      user: userWithoutSensitiveInfo,
    };
  } catch (error) {
    console.log(error);
    if (error.message === "No Profile") {
      throw new Error("User profile does not exist");
    } else {
      throw new Error("Failed to retrieve user profile");
    }
  }
};

// Update User Profile
const UpdateProfile = async (updatedUserInfo) => {
  try {
    const { email, name, image, role } = updatedUserInfo;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return { status: false, message: "User not found" };
    }

    if (name) {
      existingUser.name = name;
    }

    if (image) {
      existingUser.image = image;
    }

    if (role) {
      existingUser.role = role;
    }

    await existingUser.save();

    const userWithoutSensitiveInfo = {
      ...existingUser.toObject(),
      password: undefined,
      salt: undefined,
      verify_code: undefined,
      provider: undefined,
      forget_code: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    };

    return {
      status: true,
      message: "User profile updated",
      user: userWithoutSensitiveInfo,
    };
  } catch (error) {
    console.error("Error in Update Profile:", error);
    throw new Error("Failed to update user profile");
  }
};

// Delete User Account
const DeleteUser = async (userInfo) => {
  try {
    const { email } = userInfo;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return { status: false, message: "User not found" };
    }

    await User.deleteOne({ email });

    return { status: true, message: "User deleted successfully" };
  } catch (error) {
    console.error("Error in Delete User:", error);
    throw new Error("Failed to delete user");
  }
};

module.exports = {
  CreateUser,
  signIn,
  getAccessToken,
  VerifyEmail,
  ResendOTP,
  GetProfile,
  UpdateProfile,
  DeleteUser,
  ChangePassword,
};
