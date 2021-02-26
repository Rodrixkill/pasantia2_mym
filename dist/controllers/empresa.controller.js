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
exports.updateEmpresa = exports.deleteEmpresa = exports.getEmpresa = exports.createEmpresa = exports.getEmpresas = void 0;
// DB
const database_1 = require("../database");
function getEmpresas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield database_1.connect();
            const posts = yield conn.query('SELECT * FROM empresa');
            return res.json(posts[0]);
        }
        catch (e) {
            console.log(e);
            return res.json(e);
        }
    });
}
exports.getEmpresas = getEmpresas;
function createEmpresa(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newEmpresa = req.body;
        try {
            const conn = yield database_1.connect();
            const results = yield conn.query('INSERT INTO empresa SET ? ', [newEmpresa]);
            res.json({
                message: results
            });
        }
        catch (e) {
            return res.json(e);
        }
    });
}
exports.createEmpresa = createEmpresa;
function getEmpresa(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const conn = yield database_1.connect();
            const posts = yield conn.query('SELECT * FROM empresa WHERE id = ?', [id]);
            res.json(posts[0]);
        }
        catch (e) {
            console.log(e);
            return res.json(e);
        }
    });
}
exports.getEmpresa = getEmpresa;
function deleteEmpresa(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const conn = yield database_1.connect();
            const results2 = yield conn.query('DELETE FROM gestion WHERE empresa = ?', [id]);
            const results3 = yield conn.query('DELETE FROM trabajador WHERE empresa = ?', [id]);
            const results4 = yield conn.query('DELETE FROM usuario WHERE empresa = ?', [id]);
            const results = yield conn.query('DELETE FROM empresa WHERE id = ?', [id]);
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
exports.deleteEmpresa = deleteEmpresa;
function updateEmpresa(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const updatePost = req.body;
        try {
            const conn = yield database_1.connect();
            const results = yield conn.query('UPDATE empresa set ? WHERE id = ?', [updatePost, id]);
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
exports.updateEmpresa = updateEmpresa;
