const bodyParser = require("body-parser");

const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer');
const upload = multer({
  dest: '../front_end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const mongoose = require('mongoose');
// connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/recipes', {
  useNewUrlParser: true
});

// Create a scheme for recipes in library: title, author, recipe, image
const recipeSchema = new mongoose.Schema({
  title: String,
  author: String,
  liked: Boolean,
  recipe: String,
  path: String,
});

// Create a model for recipes in library
const Recipe = mongoose.model('Recipe', recipeSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Create a new recipe in the library
app.post('/api/recipes', async (req, res) => {
  const recipe = new Recipe({
    title: req.body.title,
    author: req.body.author,
    liked: req.body.liked,
    recipe: req.body.recipe,
    path: req.body.path,
  });
  try {
    await recipe.save();
    res.send(recipe);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the recipes in the library.
app.get('/api/recipes', async (req, res) => {
  try {
    let recipes = await Recipe.find();
    res.send(recipes);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Delete specific recipe from database
app.delete('/api/recipes/:id', async (req, res) => {
  try {
    await Recipe.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Edit Recipe
app.put('/api/recipes/:id', async (req, res) => {
  try {
    let recipe = await Recipe.findOne({
      _id: req.params.id
    });
    recipe.title = req.body.title;
    recipe.author = req.body.author;
    recipe.liked = req.body.liked;
    recipe.recipe = req.body.recipe;
    await recipe.save()
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
