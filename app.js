const express = require('express');
const bodyParser = require('express');
const mongoose = require('mongoose');
const chokidar = require('chokidar');

const Question = require('./src/models/question');
const hotfolder = require('./src/util/hotfolder_reader');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/api/questions', (req, res, next) => {
  Question.findRandom({}, {}, { limit: 4 }, function(err, results) {
    if (err) {
      console.log(err)
      return res.status(500).json({"message": "Server error"})
    }
    res.status(200).json({ list: results });
  });
});

app.post('/api/question', (req, res, next) => {
  const question = new Question({
    question: req.body.question,
    answers: req.body.answers,
    correct: req.body.correct
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
});

chokidar
  .watch('hotfolder/', { ignored: /(^|[\/\\])\../ })
  .on('add', path => {
    const pathSplit = path.split('/');
    const regex = new RegExp(/QUESTION\_\d+\.json/g);
    if(pathSplit[pathSplit.length-1].match(regex)) {
      console.log("Processing " + path);
      hotfolder.hotfolderFile(path);
    } {
      console.log("Unvalid file " + path);
    }
  });

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0-yylxr.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(3001);
    console.log('Server on! http://localhost:3001/api');
  })
  .catch(err => console.log(err));
