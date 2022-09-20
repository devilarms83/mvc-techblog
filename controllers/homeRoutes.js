const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ['id', 'post_title', 'content', 'date_created'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'post_comment', 'post_id', 'user_id', 'date_created'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    
    const posts = postData.map((post) => post.get({ plain: true }));

    // res.json(posts);
    res.render('homepage', { 
      projects, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'content', 'post_title', 'date_created'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'post_comment', 'post_id', 'user_id', 'date_created'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        {
          model: User,
          attributes: ['username'],
        },
    ],
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    const post = postData.get({ plain: true });
    
    // res.json(post);
    res.render('single-post', {
      post,
      logged_in: req.session.logged_in,
      username: req.session.username,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
