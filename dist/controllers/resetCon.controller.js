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
exports.sendMail = exports.changePassword = exports.forgotPassword = void 0;
const database_1 = require("../database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_simple_1 = __importDefault(require("jwt-simple"));
var nodemailer = require("nodemailer");
var secret = 'm&ma111f3pp5394b64d91232';
function forgotPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var email = req.body.email;
        if (email) {
            try {
                const conn = yield database_1.connect();
                const results = yield conn.query('SELECT * FROM usuario WHERE correo_electronico = ?', email);
                if (results[0].length > 0) {
                    const now = Date.now();
                    // En cuanto expira el link
                    const oneHourInMs = 30 * 60 * 1000;
                    const expires = now + oneHourInMs;
                    let token = results[0][0].email + "separarT" + expires;
                    let secretToken = yield jwt_simple_1.default.encode(token, secret);
                    return res.status(200).json({ token: secretToken });
                }
                else {
                    return res.json('No existe el email');
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            return res.json('Ingresa el email');
        }
    });
}
exports.forgotPassword = forgotPassword;
function changePassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var contrasena = req.body.contrasena;
        var token = req.params.token;
        console.log(contrasena);
        if (contrasena) {
            try {
                contrasena = yield encrypt(contrasena);
                const now = Date.now();
                const conn = yield database_1.connect();
                var decoded = jwt_simple_1.default.decode(token, secret);
                console.log(decoded);
                let obtained = decoded.split("separarT");
                console.log(obtained[1]);
                console.log(now);
                if (obtained[1] > now) {
                    const results = yield conn.query('SELECT * FROM usuario WHERE correo_electronico = ?', obtained[0]);
                    if (results[0].length > 0) {
                        const resultsUpdate = yield conn.query('UPDATE usuario set contrasena = ? WHERE correo_electronico = ?', [contrasena, obtained[0]]);
                        return res.json({
                            message: resultsUpdate
                        });
                    }
                    else {
                        return res.json('No autorizado');
                    }
                }
                else {
                    return res.json('Tiempo expirado');
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            return res.json('Ingresa nueva contrasena');
        }
    });
}
exports.changePassword = changePassword;
function sendMail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        var email = req.body.email;
        var link = req.body.link;
        var texto = "Si desea cambiar la contraseña de su cuenta haga click en el siguiente link: \ " +
            " " + link;
        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            post: 465,
            secure: false,
            auth: {
                user: "aisonotificacion@gmail.com",
                pass: "wgzwtywtuwdnnnhs",
            }
        });
        var mailOptions = {
            from: "Remitente",
            to: email,
            subject: "Recuperar contraseña",
            text: texto
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).send(error.message);
            }
            else {
                console.log("Email enviado");
                res.status(200).jsonp(req.body);
            }
        });
    });
}
exports.sendMail = sendMail;
function encrypt(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcryptjs_1.default.genSalt(10);
        return yield bcryptjs_1.default.hash(token, salt);
    });
}
