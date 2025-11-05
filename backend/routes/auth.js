// routes/auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Successful authentication
router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        profileImage: req.user.profileImage,
        userType: req.user.userType
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Not authenticated"
    });
  }
});

// Failed authentication
router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: "Login failed - Please try again"
  });
});

// Logout route
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie('connect.sid');
      res.json({ success: true, message: "Logged out successfully" });
    });
  });
});

// Google Auth routes
router.get('/google', 
  passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })
);

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}/login?error=auth_failed`,
    failureMessage: true
  }),
  (req, res) => {
    // Successful authentication
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);

module.exports = router;