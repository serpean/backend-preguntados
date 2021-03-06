const mongoose = require('mongoose');
const random = require('mongoose-simple-random');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  answers: {
    type: [],
    required: true
  },
  correct: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['GEO', 'ENT', 'HIS', 'ART', 'SCI', 'SPO'],
    required: true
  }
});

questionSchema.plugin(random);

module.exports = mongoose.model('Question', questionSchema);
