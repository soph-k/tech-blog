// Require Express
const router = require('express').Router();

//Require Models
const { Post, Comment, User } = require('../models');

// Routes
// Get all exisiting posts for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
    });

    // Serializes data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Passes serialized data and session flag into handlebar template
    res.render('viewPosts', { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Get a single post
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('singlePost', { post });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get login
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// get signup
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
