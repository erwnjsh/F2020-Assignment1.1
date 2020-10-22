let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//CREATE A REFERENCE TO THE MODEL
let Contact = require('../models/contact');

module.exports.displayContactList = (req, res, next) => {
    Contact.find((err, ContactList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(ContactList);
            res.render('contacts/list', {title: 'Contact List', ContactList: ContactList, displayName: req.user ? req.user.displayName : ''});
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('contacts/add', {title: 'Add Contact', displayName: req.user ? req.user.displayName : ''});
}

module.exports.processAddPage = (req, res, next) => {
    let newContact = Contact({
        "Contact_Name": req.body.contactName,
        "Contact_Number": req.body.contactNumber,
        "Contact_Email": req.body.contactEmail
    });

    Contact.create(newContact, (err, Contact) => {
        if (err) 
        {
            console.log(err);
            res.end();
        } 
        else 
        {
            //REFRESH THE CONTACT LIST
            res.redirect('/contact-list');
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Contact.findById(id, (err, contactToEdit) => {
        if (err) 
        {
            console.log(err);
            res.end();
        }
        else 
        {
            //SHOW THE EDIT VIEW
            res.render('contacts/edit', {title: 'Edit Contact', contact: contactToEdit, displayName: req.user ? req.user.displayName : ''})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedContact = Contact({
        "_id": id,
        "Contact_Name": req.body.contactName,
        "Contact_Number": req.body.contactNumber,
        "Contact_Email": req.body.contactEmail
    });

    Contact.updateOne({_id: id}, updatedContact, (err) => {
        if (err) 
        {
            console.log(err);
            res.end();    
        } 
        else 
        {
            //REFRESH CONTACT LIST
            res.redirect('/contact-list');    
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Contact.remove({_id: id}, (err) => {
        if (err) 
        {
            console.log(err);
            res.end();    
        } 
        else 
        {
            //REFRESH CONTACT LIST
            res.redirect('/contact-list');    
        }
    });
}