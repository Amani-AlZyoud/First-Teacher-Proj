const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/stat').get(verifyRoles(ROLES_LIST.Admin), usersController.statistics) 

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
    .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

router.route('/:id')
    .get(usersController.getUser)
    .post(usersController.updateUser);

router.route('/payment/:id').post(verifyRoles(ROLES_LIST.Headmaster), usersController.userPayment)   

module.exports = router;