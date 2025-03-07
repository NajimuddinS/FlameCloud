import React from 'react';

function Header({ onAddRecipe, onSurpriseMe }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Recipe Book</h1>
        <div>
          <button className="button primary-button" onClick={onAddRecipe}>
            Add Recipe
          </button>
          <button className="button secondary-button" onClick={onSurpriseMe}>
            Surprise Me
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;