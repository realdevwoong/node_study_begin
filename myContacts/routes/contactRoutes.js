const express = require("express");
const router = express.Router();


// router.
// route("/")
// .get((req,res)=>{
//     res.status(200).send("Welcome");
//     })
// .post((req,res)=>{
//     console.log(req.body);
//     const{ name, email, phone } = req.body; 
//     if(!name || !email || !phone){
//         return res.status(400).send("Name, email, and phone are required");
//     }
//     res.status(201).send("Create Welcome");
//     });
router
  .route("/contacts")
  .get((req,res)=>{
    res.status(200).send("Contacts Page");
  })
  .post((req,res)=>{
    res.status(201).send("Create Contacts");
  });

router
  .route("/contacts/:id")
  .get((req,res)=>{
    res.status(200).send(`View Contact for ID ${req.params.id}`);
  })
  .put((req,res)=>{
    res.status(200).send(`Update Contact for ID ${req.params.id}`);
  })
  .delete((req,res)=>{
    res.status(200).send(`Delete Contact for ID ${req.params.id}`);
  });

module.exports = router;
