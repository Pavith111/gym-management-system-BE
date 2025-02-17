import mongoose from "mongoose";

const gymSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    facilities: [String],
    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Gym = mongoose.model("Gym", gymSchema);
export default Gym;
