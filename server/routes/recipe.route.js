const express = require('express');
const { getAllRecipes, addRecipe, updateRecipe } = require('../controllers/recipe.controller.js');

const router = express.Router();

// GET all recipes
router.get('/', getAllRecipes);

// POST a new recipe
router.post('/', addRecipe);

// PUT update a recipe
router.put('/:id', updateRecipe);

module.exports = router;