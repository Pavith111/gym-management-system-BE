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
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    price: {
      monthly: { type: Number, required: true },
      annual: { type: Number, required: true },
      dayPass: { type: Number, required: true },
    },
    facilities: [
      {
        type: String,
        enum: [
          "Advanced Equipments",
          "Normal Equipments",
          "Personal Trainers",
          "Strength Training",
          "Cardio Machines",
          "Group Classes",
          "Swimming Pool",
          "Sauna",
          "Spa",
          "Locker Room",
        ],
      },
    ],
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    images: [
      {
        url: String,
        alt: String,
      },
    ],
    contactInfo: {
      phone: String,
      email: String,
      website: String,
    },
    hours: {
      weekdays: {
        open: String,
        close: String,
      },
      saturday: {
        open: String,
        close: String,
      },
      sunday: {
        open: String,
        close: String,
      },
    },
    amenities: [String],
    description: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Gym = mongoose.model("Gym", gymSchema);
export default Gym;
