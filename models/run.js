const mongoose = require('mongoose');

const runSchema = new mongoose.Schema({
  wasSuccessful: { type: Boolean, required: true },
  map: { type: String, required: true },
  gold: { type: Number, required: true },
  exp: { type: Number, required: true },
  shadowStone: { type: Number, required: true },
  duration: { type: Number, required: true },
  items: { type: Array, required: true },
  createdAt: { type: Number, required: true }
});

module.exports = mongoose.model('Run', runSchema);
