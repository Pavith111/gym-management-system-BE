import express from 'express';
import { createMembership, getMemberships, cancelMembership } from '../controllers/membership.controller.js';

const router = express.Router();

router.post('/', createMembership);
router.get('/', getMemberships);
router.delete('/:id', cancelMembership);

export default router;