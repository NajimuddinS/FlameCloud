import React, { useState } from 'react';

function RecipeDetails({ recipe, onClose, onUpdateRecipe }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState({ ...recipe });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRecipe({
      ...editedRecipe,
      [name]: value,
    });
  };

  const handleArrayChange = (e, index, field) => {
    const newArray = [...editedRecipe[field]];
    newArray[index] = e.target.value;
    setEditedRecipe({
      ...editedRecipe,
      [field]: newArray,
    });
  };

  const handleSave = async () => {
    await onUpdateRecipe(editedRecipe);
    setIsEditing(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal recipe-details" onClick={e => e.stopPropagation()}>
        {isEditing ? (
          <>
            <input
              type="text"
              name="name"
              value={editedRecipe.name}
              onChange={handleInputChange}
            />
            {/* Add other input fields for editing */}
            <button className="button primary-button" onClick={handleSave}>
              Save
            </button>
            <button className="button secondary-button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <img src={recipe.image} alt={recipe.name} />
            <h2>{recipe.name}</h2>
            {/* Display recipe details */}
            <button className="button primary-button" onClick={onClose}>
              Close
            </button>
            <button className="button edit-button" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default RecipeDetails;