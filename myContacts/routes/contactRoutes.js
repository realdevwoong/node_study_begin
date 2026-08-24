const express = require("express");
const router = express.Router();
const {getAllContacts,
       createContact,
       getContact,
       updateContact,
       deleteContact,
       addContactForm,
} = require("../controllers/contactController");

router
  .route("/contacts")
  .get(getAllContacts)
  .post(createContact);

router.route("/contacts/add").get(addContactForm).post(createContact);

router
  .route("/contacts/:id")
  .get(getContact)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
