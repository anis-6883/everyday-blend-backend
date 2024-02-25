import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
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
  },
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
