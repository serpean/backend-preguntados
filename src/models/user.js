const mongoose = require('mongoose');

const Schema = mongoose.Schema();

const userSchema = new Schema({
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  questions: {
    type: [Schema.Type.ObjectId],
    ref: 'Question'
  }
});

exports.module = mongoose.model('User', userSchema);
