import express from 'express';
import { getDailyQuestions } from '../controllers/questionController.js';

const router = express.Router();

router.get('/daily', getDailyQuestions);

export default router;
