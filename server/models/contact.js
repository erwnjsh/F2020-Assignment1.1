let mongoose = require('mongoose');

//CREATING CONTACT CLASS
let contactModel = mongoose.Schema({
    Contact_Name: String,
    Contact_Number: String,
    Contact_Email: String
},
{
    collection: "contacts"
});

module.exports = mongoose.model('Contact', contactModel);