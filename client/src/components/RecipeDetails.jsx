import React from 'react';

function RecipeDetails({ recipe, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal recipe-details" onClick={e => e.stopPropagation()}>
        <img src={recipe.image} alt={recipe.name} />
        <h2>{recipe.name}</h2>

        <div className="recipe-details-info">
          <div>
            <strong>Cuisine:</strong> {recipe.cuisine}
          </div>
          <div>
            <strong>Difficulty:</strong> {recipe.difficulty}
          </div>
          <div>
            <strong>Prep Time:</strong> {recipe.prepTimeMinutes} mins
          </div>
          <div>
            <strong>Cook Time:</strong> {recipe.cookTimeMinutes} mins
          </div>
          <div>
            <strong>Servings:</strong> {recipe.servings}
          </div>
        </div>

        <div className="recipe-details-section">
          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="recipe-details-section">
          <h3>Instructions</h3>
          <ol>
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>

        <button className="button primary-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default RecipeDetails;