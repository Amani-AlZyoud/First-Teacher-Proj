const express = require("express");
const router = express.Router();
const lessonsController = require("../../controllers/lessonsController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .post(verifyRoles(ROLES_LIST.Teacher), lessonsController.setLesson)

router
  .route("/:id")
  .get(verifyRoles(ROLES_LIST.Teacher), lessonsController.getLesson)
  .put(verifyRoles(ROLES_LIST.Teacher), lessonsController.updateLesson);

router
  .route("/userPlans/:id")
  .get(
    verifyRoles(ROLES_LIST.Teacher, ROLES_LIST.Headmaster),
    lessonsController.getUserLessons
  );

router
  .route("/create-pdf")
  .post(
    verifyRoles(ROLES_LIST.Teacher, ROLES_LIST.Headmaster),
    lessonsController.createPDFLesson
  );
router
  .route("/sign/:id")
  .put(verifyRoles(ROLES_LIST.Headmaster), lessonsController.signPlan)
  .get(verifyRoles(ROLES_LIST.Headmaster, ROLES_LIST.Teacher), lessonsController.SignedPlans);


module.exports = router;
