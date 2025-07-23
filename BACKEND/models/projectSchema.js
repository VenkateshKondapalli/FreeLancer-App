const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
      // required: true, // Name of the client
    },
    freelancerName: {
      type: String,
      // required: true, // Name of the freelancer
    },
    technologies: [String], // ["React", "Node.js"]
    budget: {
      type: Number,
      required: true,
    },
    deadline: {
      type: String, // or Date, but string is okay for simple input like "31 July"
    },
    status: {
      type: String,
      enum: ["open", "in progress", "completed"],
      default: "open",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const projectModel = model("project", projectSchema);

module.exports = { projectModel };
