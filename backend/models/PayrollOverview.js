import mongoose from "mongoose";

const BreakdownSchema = new mongoose.Schema(
  {
    name: String,
    netPay: Number,
    tax: Number,
    employer: Number
  },
  { _id: false }
);

const TrendSchema = new mongoose.Schema(
  {
    name: String,
    netPay: Number,
    tax: Number,
    employer: Number
  },
  { _id: false }
);

const PayrollOverviewSchema = new mongoose.Schema(
  {
    period: {
      type: String,
      required: true,
      unique: true
    },

    verified: {
      type: Number,
      default: 0
    },

    finalized: {
      type: Boolean,
      default: false
    },

    timeline: [
      {
        status: String,
        title: String,
        period: String,
        amount: String,
        badge: String
      }
    ],

    stats: {
      netPay: String,
      tax: String,
      employer: String
    },

    charts: {
      breakdown: [BreakdownSchema],
      trend: [TrendSchema]
    }
  },
  {
    timestamps: true
  }
);

const PayrollOverview = mongoose.model(
  "PayrollOverview",
  PayrollOverviewSchema
);

export default PayrollOverview;
