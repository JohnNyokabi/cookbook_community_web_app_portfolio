const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');


router.post('/', async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).send(recipe);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).send(recipes);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).send('Recipe not found');
    }
    res.status(200).send(recipe);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log('Expected data for update: ',req.body);
    if (!recipe) {
      return res.status(404).send('Recipe not found');
    }
    res.status(200).send(recipe);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).send('Recipe not found');
    }
    res.status(200).send(recipe);
  } catch (error) {
    res.status(500).send(error);
  }
});

// route to toggle for liking a recipe
router.post('/user/favorite/:id', async (req, res) => {
  const userId = req.user._id;
  const recipeId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    if (!user.favorites.includes(recipeId)) {
      user.favorites.push(recipeId);
    }

    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// route to toggle for unliking a recipe
router.post('/user/unfavorite/:id', async (req, res) => {
  const userId = req.user._id;
  const recipeId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    if (user.favorites.includes(recipeId)) {
      user.favorites = user.favorites.filter((favorite) => favorite.toString() !== recipeId);
    }

    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});
//route for posting a comment/review
router.post('/comment/:id', async (req, res) => {
  const recipeId = req.params.id;

  try {
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).send('Recipe not found');
    }

    const newComment = {
      text: req.body.text,
      author: req.user.username,
    };

    recipe.comments.push(newComment);
    await recipe.save();
    res.status(201).send(newComment);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
