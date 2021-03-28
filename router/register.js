const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');

router.get('/', async(req, res) => {
    res.render('register');
});

router.post('/', async(req, res) => {
    const {error} = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({email: req.body.email});

    if(user) {
        return res.status(400).send('Bu foydalanuvchi bazada mavjud');
    }

    user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    });

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    await user.save()
        .then(() => {
            res.send('succesfull...');
        })
        .catch((err) => {
            res.send('xato yuz erdi...');
        });
});

function validate(user) {
    const schema = Joi.object({
        userName: Joi.string().required().min(3).max(30),
        email: Joi.string().required().min(5).max(255).email(),
        password: Joi.string().required().min(8).max(1024)
    });

    const result = schema.validate(user);

    return result;
}

module.exports = router;