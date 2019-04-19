const fs = require('fs');
const Question = require('../models/question');

exports.hotfolderFile = path => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) return console.log(err);
    const js = JSON.parse(data);
    fs.unlink(path, err => {
      if (err) console.log(err);
    });
    js.forEach((element, index) => {
      const newQuestion = new Question({
        question: element.question,
        answers: element.answers,
        correct: element.correct
      });
      newQuestion
        .save()
        .then(() => {
          console.log('SAVED QUESTION');
        })
        .catch(err => {
          console.log('ERROR SAVING QUESTION IN HOTFOLDER');
          console.log(err);
        });
    });
  });
};
