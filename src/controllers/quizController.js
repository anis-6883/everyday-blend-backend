const Quiz = require('../models/Quiz');
const { Exclude } = require('../utils');

const createQuiz = async quizData => {
    try {
        const newQuiz = await Quiz.create(quizData);

        const quiz = Exclude(newQuiz.toObject(), [
            '_id',
            'createdAt',
            'updatedAt'
        ]);

        return { status: true, message: 'Quiz created successfully', data: quiz };
    } catch (error) {
        console.error('Error in createQuiz:', error);
        throw new Error('Failed to create quiz');
    }
};

const getAllQuiz = async () => {
    try {
        const allQuizData = await Quiz.find();

        return allQuizData;
    } catch (error) {
        console.error('Error while fetching all quiz data:', error);
        throw new Error('Failed to fetch quiz data');
    }
};

const getQuizById = async quizId => {
    try {
        const quizData = await Quiz.findById(quizId);

        return quizData;
    } catch (error) {
        console.error('Error while fetching quiz by ID:', error);
        throw new Error('Failed to fetch quiz by ID');
    }
};

const updateQuizById = async (quizId, newData) => {
    try {
        const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, newData, { new: true });

        return updatedQuiz;
    } catch (error) {
        console.error('Error while updating quiz by ID:', error);
        throw new Error('Failed to update quiz by ID');
    }
};

const deleteQuizById = async quizId => {
    try {
        const deleteResult = await Quiz.findByIdAndDelete(quizId);

        if (deleteResult) {
            return 1;
        } else {
            return 0; 
        }
    } catch (error) {
        console.error('Error while deleting quiz by ID:', error);
        throw new Error('Failed to delete quiz by ID');
    }
};

module.exports = {
    createQuiz,
    getAllQuiz,
    getQuizById,
    updateQuizById,
    deleteQuizById
};
