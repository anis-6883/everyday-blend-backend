import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { APP_SECRET } from "../configs/constants";

const transformErrorsToMap = (errors: any[]) => {
  const errorMap: { [key: string]: string } = {};

  errors.forEach((error: { path: string; msg: string }) => {
    const { path, msg } = error;
    errorMap[path] = msg;
  });

  return errorMap;
};

const generateSalt = async () => {
  return await bcrypt.genSalt();
};

const generatePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

const generateSignature = (payload: any, expiresIn: number | string) => {
  return jwt.sign(payload, APP_SECRET, { expiresIn });
};

const excludeMany = async (array: any[], keys: any[]): Promise<any[]> => {
  let newArray: any[] = [];
  array?.map((item) => {
    const temp: any = { ...item._doc };
    for (let key of keys) {
      delete temp[key];
    }
    newArray.push(temp);
  });
  return newArray;
};

const exclude = (existingApp: any, keys: any[]) => {
  for (let key of keys) {
    delete existingApp[key];
  }
  return existingApp;
};

export { exclude, excludeMany, generatePassword, generateSalt, generateSignature, transformErrorsToMap };
