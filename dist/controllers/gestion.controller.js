"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGestion = exports.deleteGestion = exports.getGestion = exports.createGestion = exports.getGestiones = void 0;
// DB
const database_1 = require("../database");
function getGestiones(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const empresa = req.body.empresa;
        const gestion = req.body.gestion;
        try {
            const conn = yield database_1.connect();
            const posts = yield conn.query('SELECT * FROM gestion WHERE gestion = ? AND empresa = ?', [gestion, empresa]);
            return res.json(posts[0]);
        }
        catch (e) {
            console.log(e);
            return res.json(e);
        }
    });
}
exports.getGestiones = getGestiones;
function createGestion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newEmpresa = req.body;
        try {
            const conn = yield database_1.connect();
            const results = yield conn.query('INSERT INTO gestion SET ? ', [newEmpresa]);
            res.json({
                message: results
            });
        }
        catch (e) {
            return res.json(e);
        }
    });
}
exports.createGestion = createGestion;
function getGestion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const empresa = req.body.empresa;
        const gestion = req.body.gestion;
        const ci = req.body.ci;
        try {
            const conn = yield database_1.connect();
            const posts = yield conn.query('SELECT * FROM gestion WHERE ci = ? AND gestion = ? AND empresa = ?', [ci, gestion, empresa]);
            res.json(posts[0]);
        }
        catch (e) {
            console.log(e);
            return res.json(e);
        }
    });
}
exports.getGestion = getGestion;
function deleteGestion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const ci = req.body.ci;
        const gestion = req.body.gestion;
        try {
            const conn = yield database_1.connect();
            const results = yield conn.query('DELETE FROM gestion WHERE ci = ? AND gestion = ?', [ci, gestion]);
            res.json({
                message: results
            });
        }
        catch (e) {
            console.log(e);
            return res.json(e);
        }
    });
}
exports.deleteGestion = deleteGestion;
function updateGestion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateGestion = req.body;
        try {
            const conn = yield database_1.connect();
            const results = yield conn.query('UPDATE gestion set ? WHERE ci = ? AND gestion = ?', [updateGestion, updateGestion.ci, updateGestion.gestion]);
            res.json({
                message: results
            });
        }
        catch (e) {
            console.log(e);
            return res.json(e);
        }
    });
}
exports.updateGestion = updateGestion;
