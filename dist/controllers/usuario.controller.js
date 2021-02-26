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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsuarioByEmpresa = exports.newPassword = exports.updateUsuario = exports.deleteUsuario = exports.getUsuario = exports.createUsuario = exports.getUsuarios = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// DB
const database_1 = require("../database");
function getUsuarios(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield database_1.connect();
            const posts = yield conn.query('SELECT * FROM usuario');
            return res.json(posts[0]);
        }
        catch (e) {
            console.log(e);
            return res.json(e);
        }
    });
}
exports.getUsuarios = getUsuarios;
function createUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let newUsuario = req.body;
        try {
            newUsuario.contrasena = yield encrypt(newUsuario.contrasena);
            const conn = yield database_1.connect();
            const results = yield conn.query('INSERT INTO usuario SET ? ', [newUsuario]);
            res.json({
                message: results
            });
        }
        catch (e) {
            return res.json(e);
        }
    });
}
exports.createUsuario = createUsuario;
function getUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const conn = yield database_1.connect();
            const posts = yield conn.query('SELECT * FROM usuario WHERE ci = ?', [id]);
            res.json(posts[0]);
        }
        catch (e) {
            console.log(e);
            return res.json(e);
        }
    });
}
exports.getUsuario = getUsuario;
function deleteUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const conn = yield database_1.connect();
            const results = yield conn.query('DELETE FROM usuario WHERE ci = ?', [id]);
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
exports.deleteUsuario = deleteUsuario;
function updateUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const updateUsuario = req.body;
        try {
            const conn = yield database_1.connect();
            const results = yield conn.query('UPDATE usuario set ? WHERE ci = ?', [updateUsuario, id]);
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
exports.updateUsuario = updateUsuario;
function newPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = req.body.user;
        let newContrasena = req.body.contrasena;
        try {
            newContrasena = yield encrypt(newContrasena);
            const conn = yield database_1.connect();
            const results = yield conn.query('UPDATE usuario set ? WHERE ci = ?', [newContrasena, user]);
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
exports.newPassword = newPassword;
function getUsuarioByEmpresa(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const empresa = req.params.empresa;
        try {
            const conn = yield database_1.connect();
            const posts = yield conn.query('SELECT * FROM usuario WHERE empresa = ?', [empresa]);
            res.json(posts[0]);
        }
        catch (e) {
            console.log(e);
            return res.json(e);
        }
    });
}
exports.getUsuarioByEmpresa = getUsuarioByEmpresa;
function encrypt(pass) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcryptjs_1.default.genSalt(10);
        return yield bcryptjs_1.default.hash(pass, salt);
    });
}
