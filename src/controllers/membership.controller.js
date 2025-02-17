import Membership from "../models/membership.model.js";

export const createMembership = async (req, res) => {
  try {
    const membership = await Membership.create(req.body);
    res.status(201).json({ membership });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMemberships = async (req, res) => {
  try {
    const membership = await Membership.find();
    res.status(200).json({ membership });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const cancelMembership = async (req, res) => {
  try {
    const membershipId = req.params.id;
    const membership = await Membership.findByIdAndDelete(membershipId);
    res.status(200).json({ membership });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
