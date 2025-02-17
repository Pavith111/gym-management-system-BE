import express from 'express';
import { getGyms, getGymById, createGym, updateGym, deleteGym } from '../controllers/gym.controller.js';

const router = express.Router();

router.get('/', getGyms);
router.get('/:id', getGymById);

router.post('/', createGym);
router.put('/:id', updateGym);
router.delete('/:id', deleteGym);

export default router;