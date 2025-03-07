import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';

function RecipeList({ 
  recipes, 
  onRecipeClick, 
  currentPage, 
  setCurrentPage, 
  totalRecipes, 
  recipesPerPage 
}) {
  const totalPages = Math.ceil(totalRecipes / recipesPerPage);

  return (
    <div>
      <Droppable droppableId="recipes">
        {(provided) => (
          <div 
            className="recipe-grid" 
            ref={provided.innerRef} 
            {...provided.droppableProps}
          >
            {recipes.map((recipe, index) => (
              <Draggable 
                key={recipe._id} 
                draggableId={recipe._id} 
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="recipe-card"
                    onClick={() => onRecipeClick(recipe)}
                  >
                    <img src={recipe.image} alt={recipe.name} />
                    <div className="recipe-card-content">
                      <h3>{recipe.name}</h3>
                      <div className="recipe-info">
                        <span>{recipe.cuisine}</span>
                        <span>{recipe.difficulty}</span>
                        <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins</span>
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;