import React, { useState, useEffect } from 'react';
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

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  return (
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
        />
      )}
    </div>
  );
}

export default App;