const express = require('express');
const User = require('../models/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const router = express.Router();
const { registerUserSchema } = require('../validators/userValidator');
const validateRequest = require('../middleware/validateRequest');

router.post('/register',validateRequest(registerUserSchema),async(req,res)=>{
    try {
      // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({ ...req.body, password: hashedPassword });
    const savedUser = await newUser.save();
    res.json(savedUser);
    } catch (error) {
      next(err);
    }
})

router.post('/login',async(req,res)=>{
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          res.json({ message: 'Login successful', token });
        } else {
          res.status(400).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
      next(err);
    }
})

module.exports = router