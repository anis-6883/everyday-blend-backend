const sendVerificationEmail = require("../middleware/sendEmailVerification");
const User = require("../models/User");
const {
  Exclude,
  GenerateSignature,
  GeneratePassword,
  GenerateSalt,
  ValidatePassword,
  generateVerificationCode,
  GenerateVerificationToken,
  CheckOptValidity,
  IsTimestampSmallerThanTwoMinutesAgo,
} = require("../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

const SignIn = async (userInfo) => {
  try {
    const { email, password } = userInfo;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const validPassword = await ValidatePassword(
        password,
        existingUser.password,
        existingUser.salt
      );

      if (validPassword) {
        const token = await GenerateSignature({
          email: existingUser.email,
          id: existingUser._id,
          user_type: existingUser.user_type,
        });

        const user = Exclude(existingUser.toObject(), [
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
          message: "Logged In successfully",
          accessToken: token,
          user,
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

const VerifyEmail = async (optInfo) => {
  try {
    const { token, otp } = optInfo;
    const decode = jwt.verify(token, process.env.APP_SECRET);
    const email = decode.email;
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return { status: false, message: "Otp is expired or incorrect!" };
    }
    const hashedOtp = findUser.verify_code;
    const isValidOpt = CheckOptValidity(otp, hashedOtp);
    const isValidTime = IsTimestampSmallerThanTwoMinutesAgo(findUser.createdAt);
    if (isValidOpt && isValidTime) {
      const userData = {
        email_verified: 1,
        status: 1,
        verify_code: null,
      };
      const verifiedUser = await User.findByIdAndUpdate(findUser._id, userData);
      const accessToken = await GenerateSignature({
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

// Get User Profile
const GetProfile = async (userInfo) => {
  try {
    const { email } = userInfo;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new Error("No Profile");
    }

    const userWithoutSensitiveInfo = Exclude(existingUser.toObject(), [
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
    if (error.message === "No Profile") {
      throw new Error("User profile does not exist");
    } else {
      throw new Error("Failed to retrieve user profile");
    }
  }
};

module.exports = {
  CreateUser,
  SignIn,
  VerifyEmail,
  GetProfile,
};
