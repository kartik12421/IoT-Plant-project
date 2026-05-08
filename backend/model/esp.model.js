import mongoose from "mongoose";

const sensorDataSchema = new mongoose.Schema(
  {
    moisture: {
      type: Number,
      required: true,
    },

    temperature: {
      type: Number,
      required: true,
    },

    light: {
      type: Number,
      required: true,
    },

    environment: {
      type: String,
      enum: ["DARK", "DIM", "BRIGHT"],
      required: true,
    },

    pump: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const SensorData = mongoose.model("SensorData", sensorDataSchema);

export default SensorData;