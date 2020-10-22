let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//CREATE USER MODEL INSTANCE
let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'Home', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('about', { title: 'About', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('projects', { title: 'Projects', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('services', { title: 'Services', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('contact', { title: 'Contact', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayLoginPage = (req, res, next) => {
    // CHECK IF THE USER IS ALREADY LOGGED IN 
    if(!req.user)
    {
        res.render('auth/login',
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName: ''
        });
    }
    else
    {
        res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', 
    (err, user, info) => {
        //CHECKS TO SEE IF THERE IS A SERVER ERROR
        if(err)
        {
            return next(err);
        }
        //IS THERE A USER ERROR?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            //ANOTHER SERVER ERROR?
            if(err)
            {
                return next(err);
            }

            res.redirect('/contact-list');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) =>{
    if(!req.user)
    {
        res.render('auth/register', 
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName: ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

/*
    BEGIN SECTION: TO DISPLAY AND PROCESS TEMPORARY REGISTER PAGE
*/
// module.exports.processRegisterPage = (req, res, next) => {
//     // instanciate a user object 
//     let newUser = new User({
//         username: req.body.username,
//         //password: req.body.password ONLY IF PASSWORD IS IN PLAINTEXT
//         email: req.body.email,
//         displayName: req.body.displayName
//     });

//     //console.log(newUser + " " + req.body.password);

//     User.register(newUser, req.body.password, (err) => {
//         if(err)
//         {
//             //console.log(err);
//             console.log("Error: Inserting New User");
//             if(err.name == "UserExistsError")
//             {
//                 req.flash(
//                     'registerMessage',
//                     'Registration Error: User Already Exists!'
//                 );
//                 console.log('Error: User Already Exists!')
//             }
//             return res.render('auth/register', {
//                 title: 'Register',
//                 messages: req.flash('registerMessage'),
//                 displayName: req.user ? req.user.displayName : ''
//             });
//         }
//         else
//         {
//            // if no error exists, then registration is successful
           
//            //redirect the user and authenticate them
//             /* TODO - Getting ready to convert to API
//             res.json({success: true, msg: 'User registered successfully!'});
//             */

//            return passport.authenticate('local')(req, res, () => {
//                res.redirect('/contact-list');
//            });
//         }
//     });
// }
/*
    END SECTION: TO DISPLAY AND PROCESS TEMPORARY REGISTER PAGE
*/

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}