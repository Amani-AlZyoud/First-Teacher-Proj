const express = require('express');
const router = express.Router();
const lessonsController = require('../../controllers/lessonsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Teacher), lessonsController.getUserLessons)
    .post(verifyRoles(ROLES_LIST.Teacher), lessonsController.setLesson)

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Teacher),lessonsController.getLesson)


module.exports = router;