import React, { useState } from 'react';

function RecipeForm({ onSubmit, onClose }) {
  const [recipe, setRecipe] = useState({
    name: '',
    cuisine: '',
    difficulty: 'Easy',
    prepTimeMinutes: '',
    cookTimeMinutes: '',
    servings: '',
    ingredients: '',
    instructions: '',
    image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedRecipe = {
      ...recipe,
      ingredients: recipe.ingredients.split('\n'),
      instructions: recipe.instructions.split('\n'),
      prepTimeMinutes: parseInt(recipe.prepTimeMinutes),
      cookTimeMinutes: parseInt(recipe.cookTimeMinutes),
      servings: parseInt(recipe.servings)
    };
    onSubmit(formattedRecipe);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>Add New Recipe</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Recipe Name</label>
            <input
              type="text"
              name="name"
              value={recipe.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Cuisine</label>
            <input
              type="text"
              name="cuisine"
              value={recipe.cuisine}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Difficulty</label>
            <select name="difficulty" value={recipe.difficulty} onChange={handleChange}>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <div className="form-group">
            <label>Prep Time (minutes)</label>
            <input
              type="number"
              name="prepTimeMinutes"
              value={recipe.prepTimeMinutes}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Cook Time (minutes)</label>
            <input
              type="number"
              name="cookTimeMinutes"
              value={recipe.cookTimeMinutes}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Servings</label>
            <input
              type="number"
              name="servings"
              value={recipe.servings}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Ingredients (one per line)</label>
            <textarea
              name="ingredients"
              value={recipe.ingredients}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label>Instructions (one per line)</label>
            <textarea
              name="instructions"
              value={recipe.instructions}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input
              type="url"
              name="image"
              value={recipe.image}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button type="button" className="button secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="button primary-button">
              Add Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecipeForm;