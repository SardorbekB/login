const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');

router.get('/', async(req, res) => {
    res.render('login');
});

router.post('/', async(req, res) => {
    const {error} = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    let user = await User.findOne({email: req.body.email});
    if(!user) {
        return res.status(400).send('email yoki parol xato');
    }

    let isPassword = await bcrypt.compare(req.body.password, user.password);

    if(!isPassword) {
        return res.status(400).send('email yoki parol xato');
    }
    res.redirect("news");
});

function validate(user) {
    const schema = Joi.object({
        email: Joi.string().required().min(5).max(255).email(),
        password: Joi.string().required().min(8).max(1024)
    });
    const result = schema.validate(user);
    return result;
}


module.exports = router;