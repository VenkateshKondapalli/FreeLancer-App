const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const clientSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      default: "client",
    },
    fullName: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
    },
    projectType: {
      type: String,
    },
    budgetRange: {
      type: String,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

clientModel = model("Client", clientSchema);

module.exports = { clientModel };
