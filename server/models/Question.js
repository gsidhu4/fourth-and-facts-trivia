import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    question: String,
    choices: [String],
    correct_answer: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Question', questionSchema);