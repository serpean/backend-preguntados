const Question = require('../models/question');

exports.getQuestions = (req, res, next) => {
  Question.findRandom({}, {}, { limit: 4 }, function(err, results) {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(200).json({ list: results });
  });
};

exports.getQuestion = (req, res, next) => {
  Question.findOneRandom(function(err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(200).json(result);
  });
};

exports.getQuestionByType = (req, res, next) => {
  const type = req.params.type;

  return Question.findOneRandom({ type: type }, function(err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(200).json(result);
  });
};

exports.postQuestion = (req, res, next) => {
  const question = new Question({
    question: req.body.question,
    answers: req.body.answers,
    correct: req.body.correct,
    type: req.body.type
  });

  question
    .save()
    .then(() => {
      res.status(200).json({ message: 'SAVED' });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ message: 'ERROR' });
    });
};
