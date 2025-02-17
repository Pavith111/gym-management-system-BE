import Gym from "../models/gym.model.js";

export const createGym = async (req, res) => {
  try {
    const gym = await Gym.create(req.body);
    res.status(201).json({ gym });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getGyms = async (req, res) => {
  try {
    const gyms = await Gym.find();
    res.status(200).json(gyms);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGymById = async (req, res) => {
  try {
    const gym = await Gym.findById(req.params.id);
    if (!gym) {
      res.status(404).json({ message: "Gym not found" });
    }
    res.status(200).json({ gym });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateGym = async (req, res) => {
  try {
    const gym = await Gym.findByIdAndUpdate(req.params.id, req.body);
    if (!gym) {
      res.status(404).json({ message: "Gym not found" });
    }
    res.status(200).json({ gym });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteGym = async (req, res) => {
  try {
    const gym = await Gym.findByIdAndDelete(req.params.id);
    if (!gym) {
      res.status(404).json({ message: "Gym not found" });
    }
    res.status(200).json({ gym });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};