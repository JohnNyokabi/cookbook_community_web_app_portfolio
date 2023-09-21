const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: String,
  description: String,
  ingredients: [String],
  method: [String],
});

module.exports = mongoose.model('Recipe', recipeSchema);
