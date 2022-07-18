const mongoose = require('mongoose');

const CharSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const Chars = mongoose.model('Chars', CharSchema);

module.exports = Chars;