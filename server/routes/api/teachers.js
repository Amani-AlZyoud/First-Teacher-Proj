const express = require('express');
const router = express.Router();
const teachersController = require('../../controllers/teachersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), teachersController.getAllTeachers)
    .post(verifyRoles(ROLES_LIST.Admin), teachersController.createNewTeacher)
    
    router.route('/:id')
    .get(teachersController.getTeacher)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Teacher), teachersController.updateTeacher)
    .delete(verifyRoles(ROLES_LIST.Admin), teachersController.deleteTeacher);

module.exports = router;