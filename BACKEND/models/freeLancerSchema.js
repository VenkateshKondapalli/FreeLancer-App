const mongoose = require("mongoose");
const { otpModel } = require("./otpSchema");

const { Schema, model } = mongoose;

const freelancerSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      default: "freelancer",
    },
    fullName: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    experience: {
      type: String,
    },
    bio: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const freelancerModel = model("freelancer", freelancerSchema);

module.exports = { otpModel };
