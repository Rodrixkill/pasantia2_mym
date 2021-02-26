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
exports.getTrabajadorByGestion = exports.getTrabajadorByEmpresa = exports.updateTrabajador = exports.deleteTrabajador = exports.getTrabajador = exports.createTrabajador = exports.getTrabajadores = void 0;
// DB
const database_1 = require("../database");
function getTrabajadores(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const empresa = req.body.empresa;
        try {
            const conn = yield database_1.connect();
            //const posts = await conn.query('SELECT trabajador.ci,trabajador.empresa,trabajador.telefono,trabajador.representante_legal,trabajador.ci_representante_legal,trabajador.fecha_nacimiento,trabajador.primer_apellido,trabajador.segundo_apellido,trabajador.correo_electronico,trabajador.contrasena,trabajador.ano_activo FROM trabajador WHERE empresa = ?',[empresa]);
            const posts = yield conn.query('SELECT *  FROM trabajador');
            return res.json(posts[0]);
        }
        catch (e) {
            console.log(e);
            return res.json(e);
        }
    });
}
exports.getTrabajadores = getTrabajadores;
function createTrabajador(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newTrabajador = req.body;
        try {
            const conn = yield database_1.connect();
            const results = yield conn.query('INSERT INTO trabajador SET ? ', [newTrabajador]);
            res.json({
                message: results
            });
        }
        catch (e) {
            return res.json(e);
        }
    });
}
exports.createTrabajador = createTrabajador;
function getTrabajador(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const conn = yield database_1.connect();
            const posts = yield conn.query('SELECT *  FROM trabajador WHERE ci = ?', [id]);
            res.json(posts[0]);
        }
        catch (e) {
            console.log(e);
            return res.json(e);
        }
    });
}
exports.getTrabajador = getTrabajador;
function deleteTrabajador(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const conn = yield database_1.connect();
            const results2 = yield conn.query('DELETE FROM gestion WHERE ci = ?', [id]);
            const results = yield conn.query('DELETE FROM trabajador WHERE ci = ?', [id]);
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
exports.deleteTrabajador = deleteTrabajador;
function updateTrabajador(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const updateTrabajador = req.body;
        try {
            const conn = yield database_1.connect();
            const results = yield conn.query('UPDATE trabajador set ? WHERE ci = ?', [updateTrabajador, id]);
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
exports.updateTrabajador = updateTrabajador;
function getTrabajadorByEmpresa(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const empresa = req.params.empresa;
        try {
            const conn = yield database_1.connect();
            const posts = yield conn.query('SELECT * FROM trabajador WHERE empresa = ?', [empresa]);
            res.json(posts[0]);
        }
        catch (e) {
            console.log(e);
            return res.json(e);
        }
    });
}
exports.getTrabajadorByEmpresa = getTrabajadorByEmpresa;
function getTrabajadorByGestion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const empresa = req.params.empresa;
        const gestion = req.params.gestion;
        try {
            const conn = yield database_1.connect();
            const posts = yield conn.query('SELECT * FROM trabajador INNER JOIN gestion ON trabajador.ci = gestion.ci WHERE trabajador.empresa = ? AND ( trabajador.ano_activo = ? OR gestion.gestion = ?)', [empresa, gestion, gestion]);
            res.json(posts[0]);
        }
        catch (e) {
            console.log(e);
            return res.json(e);
        }
    });
}
exports.getTrabajadorByGestion = getTrabajadorByGestion;
