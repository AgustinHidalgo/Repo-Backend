import mongoose from "mongoose";

const TicketsSchema = new mongoose.Schema(
  {
    code: {
      type: Number,
    },
    user: {
      type: String,
    },
    total: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const ticketsModel = mongoose.model("tickets", TicketsSchema);