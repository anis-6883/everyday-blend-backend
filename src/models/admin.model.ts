import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: "admin",
    },
    status: {
      type: String,
      default: "1",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
