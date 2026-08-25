const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
// const path = require("path");
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
    // res.status(200).send("Contacts page");
    const contacts = await Contact.find();
    res.render("index",{contacts:contacts});
    // const users = [
    //     {name: "John", email: "john@aaa.bbb", phone:"123456789"},
    //     {name: "Jane", email: "jane@aaa.bbb", phone:"67891234"},
    // ];
    // res.render("getAll",{heading: "User List", users: users});
    // const filePath = path.join(__dirname,"../assets","getAll.html");
    // res.sendFile(filePath);
    // res.status(200).send("<h1 style='color:green'>Contacts Page</h1>")
});
const addContactForm = (req,res)=>{
    res.render("add");
};

//@desc Create new contact
//@route POST /contacts
const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const{ name, email, phone } = req.body; 
    if(!name || !email || !phone){
        return res.status(400).send("Name, email, and phone are required");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
    });
    // res.status(201).send("Create Contacts");
    res.redirect("/contacts")
});

//@desc Get contact
//@route GET /contacts:id
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        return res.status(404).send("해당 연락처를 찾을 수 없습니다");
    }
    res.render("update", { contact: contact });
});
//@desc Update contact
//@route PUT /contacts:id
const updateContact = asyncHandler(async (req, res) => {
    // res.status(200).send(`Update Contact for ID ${req.params.id}`);
    const id = req.params.id;
    const {name, email, phone} = req.body;
    // const contact = await Contact.findById(id);
    // console.log(contact);
    // if(!contact){
    //     res.status(404);
    //     throw new Error("Contact not found");
    // }
    // contact.name = name;
    // contact.email = email;
    // contact.phone = phone;

    // contact.save();
    // res.status(200).json(contact)
    const updatedContact = await Contact.findByIdAndUpdate(
        id,
        {name,email,phone},
        {new:true}
    );
    res.redirect("/contacts");
});

//@desc Delete contact
// @desc Delete contact
// @route DELETE /contacts/:id
const deleteContact = asyncHandler(async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.redirect("/contacts");
});
module.exports = { getAllContacts, createContact, getContact, updateContact,deleteContact, addContactForm, };

