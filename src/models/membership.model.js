import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gym: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gym",
      required: true,
    },
    membership_type: {
      type: Number,
      enum: ["monthly", "annual"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "expired"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Membership = mongoose.model("Membership", membershipSchema);
export default Membership;
