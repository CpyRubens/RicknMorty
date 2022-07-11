const mongooose = require('mongoose');

const CharSchema = new mongooose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
});

const Chars = mongooose.model('Chars', CharSchema);

module.exports = Chars;