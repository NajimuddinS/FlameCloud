const axios = require('axios');
const Recipe = require('../models/recipe.model.js');
const fetchAndStoreRecipes = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/recipes');
    const recipes = response.data.recipes;

    // Insert recipes into MongoDB
    await Recipe.insertMany(recipes);
    console.log('Recipes fetched and stored successfully');
  } catch (err) {
    console.error('Error fetching or storing recipes:', err);
  }
};

fetchAndStoreRecipes();

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