const express = require('express');
const router = express.Router();
const headmastersController = require('../../controllers/headmastersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), headmastersController.getAllHeadmasters)
    .post(verifyRoles(ROLES_LIST.Admin), headmastersController.createNewHeadmaster)
    
    router.route('/:id')
    .get(headmastersController.getHeadmaster)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Headmaster), headmastersController.updateHeadmaster)
    .delete(verifyRoles(ROLES_LIST.Admin), headmastersController.deleteHeadmaster);

module.exports = router;