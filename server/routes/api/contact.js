const express = require("express");
const router = express.Router();
const ContactController = require("../../controllers/ContactController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const verifyJWT = require("../../middleware/verifyJWT");

router.route("/message").post(ContactController.AddMessage);
router
  .route("/messages")
  .get(verifyJWT, verifyRoles(ROLES_LIST.Admin), ContactController.getmessages);

router
  .route("/:id")
  .put(
    ContactController.replymessage
  );

module.exports = router;
