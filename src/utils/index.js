const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const APP_SECRET = process.env.APP_SECRET;

//Utility functions
module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

module.exports.GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

module.exports.GenerateSignature = async (payload) => {
  try {
    return jwt.sign(payload, process.env.APP_SECRET, { expiresIn: "7d" });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.GenerateTempToken = async (data) => {
  try {
    return jwt.sign(payload, code, { expiresIn: "1d" });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.GenerateVerificationToken = async (payload) => {
  try {
    return jwt.sign(payload, process.env.APP_SECRET, { expiresIn: "1d" });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.CheckOptValidity = async (opt, hashedOtp) => {
  try {
    await bcrypt.compare(opt, hashedOtp, (err, result) => {
      if (err) {
        return false;
      } else {
        return true;
      }
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.IsTimestampSmallerThanTwoMinutesAgo = (timestamp) => {
  const inputDate = new Date(timestamp);
  const currentTime = new Date();
  const timeDifference = currentTime - inputDate;
  return timeDifference <= 120000;
};

module.exports.ValidateSignature = async (req) => {
  try {
    //const signature = req.get("Authorization"); //Another way from direct Authorization
    const signature = req.headers.authorization; //Taking auth token from headers
    const payload = await jwt.verify(
      signature.split(" ")[1],
      process.env.APP_SECRET
    );
    req.user = payload;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports.ExcludeMany = async (array, keys) => {
  let newArray = [];
  array?.map((item) => {
    for (let key of keys) {
      delete item[key];
    }
    newArray.push(item);
  });
  return newArray;
};

module.exports.Exclude = (user, keys) => {
  for (let key of keys) {
    delete user[key];
  }
  return user;
};

module.exports.FormateData = (data) => {
  if (data) {
    return data;
  } else {
    throw new Error("Data Not found!");
  }
};

module.exports.UpdateObject = (oldObject, newObject) => {
  const newData = Object?.entries(oldObject);
  newData.forEach((item) => {
    const key = item[0];
    const value = item[1];

    if (newObject.hasOwnProperty(key)) {
      oldObject[key] = newObject[key];
    }
  });
  return oldObject;
};

module.exports.deleteImagesFromArray = async (array) => {
  for (const item of array) {
    await deleteImage(item.image_url);
  }
};

module.exports.generateVerificationCode = (length) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};
