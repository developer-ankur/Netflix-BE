const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/register',async(req,res)=>{
    try {
      const newUser = new User(req.body) 
      const user = newUser.save() 
      res.json(user)
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
})

router.post('/login',async(req,res)=>{
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && user.password === password) {
          res.json({ message: 'Login successful', user });
        } else {
          res.status(400).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Login failed'  });
    }
})

module.exports = router