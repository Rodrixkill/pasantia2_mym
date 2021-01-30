"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gestion_controller_1 = require("../controllers/gestion.controller");
const router = express_1.Router();
router.route('/')
    .get(gestion_controller_1.getGestiones)
    .delete(gestion_controller_1.deleteGestion)
    .put(gestion_controller_1.updateGestion)
    .post(gestion_controller_1.createGestion);
router.route('/single')
    .get(gestion_controller_1.getGestion);
exports.default = router;
