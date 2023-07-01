const express = require("express");
const router = express.Router();
const teachersController = require("../../controllers/teachersController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router.route("/deleted").get(verifyRoles(ROLES_LIST.Admin), teachersController.deletedTeachers);
router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), teachersController.getAllTeachers)
  .post(verifyRoles(ROLES_LIST.Admin), teachersController.createNewTeacher);

router
  .route("/group")
  .post(verifyRoles(ROLES_LIST.Headmaster), teachersController.getGroup);

router
  .route("/:id")
  .get(teachersController.getTeacher)
  .put(verifyRoles(ROLES_LIST.Admin), teachersController.deleteTeacher);

  router.route("/active/:id").put(verifyRoles(ROLES_LIST.Admin), teachersController.activeTeacher);


module.exports = router;
