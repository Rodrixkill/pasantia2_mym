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
exports.indexWelcome = void 0;
const webToken_1 = require("../jwt-simple/webToken");
const database_1 = require("../database");
const SECRET_KEY_HERE = "m&m-enterprise";
function indexWelcome(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var username = req.body.username;
        var password = req.body.password;
        if (username && password) {
            try {
                const conn = yield database_1.connect();
                const results = yield conn.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password]);
                if (results[0].length > 0) {
                    const session = webToken_1.encodeSession(SECRET_KEY_HERE, {
                        id: 2,
                        username: username
                    });
                    return res.status(201).json(session);
                }
                else {
                    return res.json('Username and password incorrect');
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            return res.json('Complete username and password');
        }
    });
}
exports.indexWelcome = indexWelcome;
