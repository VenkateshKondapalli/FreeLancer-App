const mongoose = require("mongoose");

const bycrpt = require("bcrypt");

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["client", "freelancer"],
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

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bycrpt.hash(this.password.toString(), 12);
  }
  next();
});

const UserModel = model("user", userSchema);
module.exports = { UserModel };
