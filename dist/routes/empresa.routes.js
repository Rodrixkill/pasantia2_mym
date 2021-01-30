"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empresa_controller_1 = require("../controllers/empresa.controller");
const router = express_1.Router();
router.route('/')
    .get(empresa_controller_1.getEmpresas)
    .post(empresa_controller_1.createEmpresa);
router.route('/:id')
    .get(empresa_controller_1.getEmpresa)
    .delete(empresa_controller_1.deleteEmpresa)
    .put(empresa_controller_1.updateEmpresa);
exports.default = router;
