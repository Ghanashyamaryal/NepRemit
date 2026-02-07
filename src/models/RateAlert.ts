import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IRateAlert extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  currencyPair: string; // e.g., "USD/NPR"
  baseCurrency: string;
  targetCurrency: string;
  targetRate: number;
  direction: "above" | "below";
  isActive: boolean;
  triggeredAt?: Date;
  lastNotifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const rateAlertSchema = new Schema<IRateAlert>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    currencyPair: {
      type: String,
      required: true,
    },
    baseCurrency: {
      type: String,
      required: true,
    },
    targetCurrency: {
      type: String,
      required: true,
      default: "NPR",
    },
    targetRate: {
      type: Number,
      required: true,
    },
    direction: {
      type: String,
      enum: ["above", "below"],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    triggeredAt: {
      type: Date,
    },
    lastNotifiedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for efficient querying
rateAlertSchema.index({ userId: 1, isActive: 1 });
rateAlertSchema.index({ isActive: 1, currencyPair: 1 });
rateAlertSchema.index({ userId: 1, currencyPair: 1, targetRate: 1, direction: 1 });

export const RateAlert: Model<IRateAlert> =
  mongoose.models.RateAlert ||
  mongoose.model<IRateAlert>("RateAlert", rateAlertSchema);
