const express = require('express');

const questionController = require('../controllers/question');

const router = express.Router();

// Get 4 random questions
router.get('/questions', questionController.getQuestions);

router.get('/question', questionController.getQuestion)

//Return a random question due a type
router.get('/question-type/:type', questionController.getQuestionByType);

//Save question
router.post('/question', questionController.postQuestion);

module.exports = router;
