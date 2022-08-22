const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const registerValidation = require('../validation/contractorRegister');

const Client = require('../models/client');
const Contractor = require('../models/contractor');
const User = require('../models/user');

router.post('/client/register', (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        
        if(user) {

            return res.status(400).json({email: 'Email already exists'});

        } else {
            
            const newUser = new User({
                    email: req.body.email,
                    password: req.body.password,
                    role: 'CLIENT',
            });

            bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser
                        .save()
                        .then(user => console.log(user))
                        .catch(err => console.log(err))
                    })
            })
            
            const newClient = new Client({
                user: newUser._id,
                name: req.body.name,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
            });
            newClient
            .save()
            .then(user => {res.json(user)})
                    
        }
    })
});

router.post('/contractor/register', (req, res) => {

    const { errors, isValid } = registerValidation(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        
        if(user) {

            return res.status(400).json({email: 'Email already exists'});
        
        } else {

            const newUser = new User({
                email: req.body.email,
                password: req.body.password,
                role: 'CONTRACTOR',
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user => console.log(user))
                    .catch(err => console.log(err))

                })
            })
            
            const newContractor = new Contractor({
                user: newUser._id,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                gender: req.body.gender,
                birthday: req.body.birthday,
                country: req.body.country,
            });

            newContractor
            .save()
            .then(user => {res.json(user)})
            .catch(err => console.log(err))
        }
    })

})

router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);
    
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {

        if(!user) {
            return res.status(404).json({ emailnotfound: 'Email not Found' })
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch) {

                if(user.role === 'CLIENT') {

                    Client.findOne({ user: user._id }).then(client => {
                        
                        const payload = {
                            id: client._id,
                            role: user.role
                        }
            
                        jwt.sign(payload, process.env.SECRET, {
                            expiresIn: 31556926
                        }, (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer" + token
                            })
                        })
                    })

                } else {

                    Contractor.findOne({ user: user._id }).then(contractor => {
                        
                        const payload = {
                            id: contractor._id,
                            role: user.role
                        }
            
                        jwt.sign(payload, process.env.SECRET, {
                            expiresIn: 31556926
                        }, (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer" + token
                            })
                        })
                    })
                }
                
            } else {
                return res.status(400).json({ passwordincorrect: 'Password incorrect' });
            }
        })

    })

})

module.exports = router;