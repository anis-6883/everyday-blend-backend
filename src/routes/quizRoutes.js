const express = require('express');
const { body, param, validationResult } = require('express-validator');
const quizController = require('../controllers/quizController');
const router = express.Router();

router.post(
    '/create',
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('questions').isArray({ min: 1 }).withMessage('At least one question is required')
    ],
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ status: false, errors: errors.array() });
            }

            const quizData = req.body;
            const newQuiz = await quizController.createQuiz(quizData);
            return res.status(201).json(newQuiz);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
);

router.get('/all', async (req, res, next) => {
    try {
        const allQuizData = await quizController.getAllQuiz();

        return res.status(200).json({ status: true, data: allQuizData });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/find/:quizId', [param('quizId').notEmpty().withMessage('Quiz ID is required')], async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: false, errors: errors.array() });
        }
        const quizId = req.params.quizId;

        const quizData = await quizController.getQuizById(quizId);

        if (!quizData) {
            return res.status(404).json({ status: false, message: 'Quiz does not exist' });
        }

        return res.status(200).json({ status: true, data: quizData });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.put(
    '/update/:quizId',
    [
        param('quizId').notEmpty().withMessage('Quiz ID is required'),
        body('newData').isObject().notEmpty().withMessage('New data is required')
    ],
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ status: false, errors: errors.array() });
            }

            const quizId = req.params.quizId;
            const newData = req.body.newData;

            const updatedQuiz = await quizController.updateQuizById(quizId, newData);

            if (!updatedQuiz) {
                return res.status(404).json({ status: false, message: 'Quiz not found' });
            }

            return res.status(200).json({ status: true, data: updatedQuiz });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
);

router.delete('/delete/:quizId', [param('quizId').notEmpty().withMessage('Quiz ID is required')], async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: false, errors: errors.array() });
        }

        const quizId = req.params.quizId;
        const deleteResult = await quizController.deleteQuizById(quizId);

        if (deleteResult === 0) {
            return res.status(404).json({ status: false, message: 'Quiz not found' });
        }

        return res.status(200).json({ status: true, message: 'Quiz deleted successfully' });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
