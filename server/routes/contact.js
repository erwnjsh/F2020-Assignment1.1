let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

//CONNECT TO CONTACT MODEL
let Contact = require('../models/contact');

//CONNECT TO CONTROLLER
let contactController = require('../controllers/contact');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next(); // a way to maintain a state as we move from to the next
}

/* GET ROUTE FOR THE CONTACTS LIST PAGE - READ OPERATION */
router.get('/', requireAuth, contactController.displayContactList);

/* GET ROUTE FOR THE CONTACTS LIST PAGE - READ OPERATION */
router.get('/', requireAuth, contactController.displayContactList);

/* GET ROUTE FOR DISPLAYING ADD PAGE - CREATE OPERATION */
router.get('/add', requireAuth, contactController.displayAddPage);

/* POST ROUTE FOR PROCESSING THE ADD PAGE - CREATE OPERATION */
router.post('/add', requireAuth, contactController.processAddPage);

/* GET ROUTE FOR DISPLAYING EDIT PAGE - UPDATE OPERATION */
router.get('/edit/:id', requireAuth, contactController.displayEditPage);

/* POST ROUTE FOR PROCESSING THE EDIT PAGE - UPDATE OPERATION */
router.post('/edit/:id', requireAuth, contactController.processEditPage);

/* GET ROUTE TO PERFORM CONTACT DELETION - DELETE OPERATION */
router.get('/delete/:id', requireAuth, contactController.performDelete);


module.exports = router;