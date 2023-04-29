const router = require('express').Router();
const { BlogPost, User } = require('../models');
const withAuth = require('../utils/auth');

// CRUD routes

// HOMEPAGE
router.get('/', async (req, res) => {
    try {
      // Get all users
      const userData = await User.findAll();
  
      // Serialize data so the template can read it
      const users = userData.map((user) => user.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        users, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  