"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resetCon_controller_1 = require("../controllers/resetCon.controller");
const router = express_1.Router();
router.route('/')
    .post(resetCon_controller_1.forgotPassword);
router.route('/change/:token')
    .post(resetCon_controller_1.changePassword);
router.route('/sendMail')
    .post(resetCon_controller_1.sendMail);
exports.default = router;
