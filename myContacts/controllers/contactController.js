const asyncHandler = require("express-async-handler");

// const getAllContacts = async(req, res) => {
//   try {
//     res.status(200).send("Contacts page")
//   }catch (error) {
//     res.send(error.message)
//   }
// };
//@desc Get all contacts
//@route GET /contacts

const getAllContacts = asyncHandler(async (req, res) => {
    res.status(200).send("Contacts page");
});

//@desc Create new contact
//@route POST /contacts
const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const{ name, email, phone } = req.body; 
    if(!name || !email || !phone){
        return res.status(400).send("Name, email, and phone are required");
    }
    res.status(201).send("Create Contacts");
});

//@desc Get contact
//@route GET /contacts:id
const getContact = asyncHandler(async (req, res) => {
    res.status(200).send(`View Contact for ID ${req.params.id}`);
});
//@desc Update contact
//@route PUT /contacts:id
const updateContact = asyncHandler(async (req, res) => {
    res.status(200).send(`Update Contact for ID ${req.params.id}`);
});

//@desc Delete contact
//@route DELETE /contacts:id
const deleteContact = asyncHandler(async (req, res) => {
    res.status(200).send(`Delete Contact for ID ${req.params.id}`);
});

module.exports = { getAllContacts, createContact, getContact, updateContact,deleteContact };

