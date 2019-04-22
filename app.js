const express = require('express');
const bodyParser = require('express');
const mongoose = require('mongoose');
const chokidar = require('chokidar');

const hotfolder = require('./src/util/hotfolder_reader');

const questionRoutes = require('./src/routes/question');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", questionRoutes)


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
    app.listen(5000);
    console.log('Server on! http://localhost:3001/api');
  })
  .catch(err => console.log(err));
