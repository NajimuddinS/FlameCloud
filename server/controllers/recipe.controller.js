const axios = require('axios');
const Recipe = require('../models/recipe.model.js');


// Get all recipes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new recipe
const addRecipe = async (req, res) => {
  const recipe = new Recipe(req.body);
  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a recipe
const updateRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getAllRecipes, addRecipe, updateRecipe };