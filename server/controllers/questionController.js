import Question from '../models/Question.js';

export const getDailyQuestions = async (req, res) => {
    try {
        const allQuestions = await Question.find();
        const shuffled = allQuestions.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        res.json(selected);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch questions' });
    }
};
