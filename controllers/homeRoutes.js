const router = require('express').Router();
const { Blogpost, User } = require('../models');
const withAuth = require('../utils/auth');

// CRUD routes

// HOMEPAGE
// router.get('/', async (req, res) => {
//     try {
//       // Get all users
//       const userData = await User.findAll();
  
//       // Serialize data so the template can read it
//       const users = userData.map((user) => user.get({ plain: true }));
  
//       // Pass serialized data and session flag into template
//       res.render('homepage', { 
//         users, 
//         logged_in: req.session.logged_in 
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });


router.get('/', async (req, res) => {
  try {
      const blogpostData = await Blogpost.findAll({
          include: [
              {
                  model: User,
                  attributes: ['username'],
              },
          ],
      });

      const blogPosts = blogpostData.map((blogpost) => blogpost.get({ plain: true }));

      res.render('homepage', {
          blogPosts,
          logged_in: req.session.logged_in
      });
  } catch (err) {
      res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
  }

  res.render('signup');
});

module.exports = router;



  