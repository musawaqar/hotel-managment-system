const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: Number,
      required: true,
      unique: true,
    },

    roomName: {
      type: String,
      required: true,
      trim: true,
    },

    // Store only the path to an image in React's public folder
    // Example: "/rooms/deluxe1.jpg"
    roomImage: {
      type: String,
      default: "",
    },

    roomType: {
      type: String,
      required: true,
      enum: ["single", "double", "suite", "family", "deluxe"],
    },

    roomPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    roomIsAvailable: {
      type: Boolean,
      default: true,
    },

    maxOccupancy: {
      type: Number,
      required: true,
      min: 1,
    },

    bedType: {
      type: String,
      enum: ["single", "double", "queen", "king"],
      default: "queen",
    },

    roomSize: {
      type: Number, // Square feet
      required: true,
    },

    view: {
      type: String,
      enum: ["city", "garden", "pool", "sea", "mountain"],
      default: "city",
    },

    wifi: {
      type: Boolean,
      default: true,
    },

    airConditioning: {
      type: Boolean,
      default: true,
    },

    breakfastIncluded: {
      type: Boolean,
      default: false,
    },

    parkingIncluded: {
      type: Boolean,
      default: false,
    },

    balcony: {
      type: Boolean,
      default: false,
    },

    workspace: {
      type: Boolean,
      default: false,
    },

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    tags: [
      {
        type: String,
      },
    ],

    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", roomSchema);