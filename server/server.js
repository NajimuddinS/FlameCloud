const express=require('express');
const app=express();
const dotenv=require('dotenv');
const cors=require('cors')
const recipeRoutes = require('./routes/recipe.route.js');
const logger = require('./middleware/logger.middleware.js');

const connectDB=require('./config/db.js')
dotenv.config();
const port=process.env.PORT

// Middleware
app.use(express.json());
app.use(logger); 

// Routes
app.use('/api/recipes', recipeRoutes);


app.listen(port, () => {
    console.log(`Server running on ${port}`);
    connectDB()
  });