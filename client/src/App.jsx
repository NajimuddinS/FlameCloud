import React, { useState, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import RecipeDetails from './components/RecipeDetails';
import Header from './components/Header';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 8;

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('https://flamecloud-9750.onrender.com/api/recipes');
      const data = await response.json();
      setRecipes(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setLoading(false);
    }
  };

  const handleAddRecipe = async (newRecipe) => {
    try {
      const response = await fetch('https://flamecloud-9750.onrender.com/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });
      const data = await response.json();
      setRecipes([...recipes, data]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  const handleSurpriseMe = () => {
    const randomIndex = Math.floor(Math.random() * recipes.length);
    setSelectedRecipe(recipes[randomIndex]);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside the list, do nothing

    // Reorder the recipes
    const updatedRecipes = Array.from(recipes);
    const [reorderedRecipe] = updatedRecipes.splice(result.source.index, 1);
    updatedRecipes.splice(result.destination.index, 0, reorderedRecipe);

    setRecipes(updatedRecipes);
  };

  const handleUpdateRecipe = async (updatedRecipe) => {
    try {
      const response = await fetch(`https://flamecloud-9750.onrender.com/api/recipes/${updatedRecipe._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecipe),
      });
      const data = await response.json();

      // Update the recipe in the state
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe._id === data._id ? data : recipe
        )
      );

      // Close the details modal or reset the selected recipe
      setSelectedRecipe(null);
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div>
        <Header 
          onAddRecipe={() => setShowForm(true)} 
          onSurpriseMe={handleSurpriseMe}
        />
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>Loading recipes...</div>
        ) : (
          <RecipeList 
            recipes={currentRecipes}
            onRecipeClick={setSelectedRecipe}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalRecipes={recipes.length}
            recipesPerPage={recipesPerPage}
          />
        )}

        {showForm && (
          <RecipeForm 
            onSubmit={handleAddRecipe}
            onClose={() => setShowForm(false)}
          />
        )}

        {selectedRecipe && (
          <RecipeDetails 
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
            onUpdateRecipe={handleUpdateRecipe}
          />
        )}
      </div>
    </DragDropContext>
  );
}

export default App;