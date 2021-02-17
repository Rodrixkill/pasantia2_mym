"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trabajador_controller_1 = require("../controllers/trabajador.controller");
const router = express_1.Router();
router.route('/')
    .get(trabajador_controller_1.getTrabajadores)
    .post(trabajador_controller_1.createTrabajador);
router.route('/:id')
    .get(trabajador_controller_1.getTrabajador)
    .delete(trabajador_controller_1.deleteTrabajador)
    .put(trabajador_controller_1.updateTrabajador);
router.route('/empresa/:empresa')
    .get(trabajador_controller_1.getTrabajadorByEmpresa);
router.route('/empresa/:empresa/gestion/:gestion')
    .get(trabajador_controller_1.getTrabajadorByEmpresa);
exports.default = router;
