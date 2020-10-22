var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET about page. */
router.get('/about', indexController.displayAboutPage);

/* GET projects page. */
router.get('/projects', indexController.displayProjectsPage);

/* GET services page. */
router.get('/services', indexController.displayServicesPage);

/* GET contact page. */
router.get('/contact', indexController.displayContactPage);

/* GET Route for DISPLAYING Login Page */
router.get('/login', indexController.displayLoginPage);

/* POST Route for processing the Login Page */
router.post('/login', indexController.processLoginPage);



/* BEGIN SECTION: TEMPORARY REGISTRATION PAGE ROUTES */

/* GET Route for DISPLAYING Registration Page */
// router.get('/register', indexController.displayRegisterPage);

/* POST Route for PROCESSING Registration Page */
// router.post('/register', indexController.processRegisterPage);

/* END SECTION: TEMPORARY REGISTRATION PAGE ROUTES */



// /* GET to perform UserLogout */
router.get('/logout', indexController.performLogout);

module.exports = router;
