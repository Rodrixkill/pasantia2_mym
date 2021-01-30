"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeSession = void 0;
const jwt_simple_1 = require("jwt-simple");
function encodeSession(secretKey, partialSession) {
    // Always use HS512 to sign the token
    const algorithm = "HS512";
    // Determine when the token should expire
    const issued = Date.now();
    const fifteenMinutesInMs = 24 * 60 * 60 * 1000;
    const expires = issued + fifteenMinutesInMs;
    const session = Object.assign(Object.assign({}, partialSession), { issued: issued, expires: expires });
    return {
        token: jwt_simple_1.encode(session, secretKey, algorithm),
        issued: issued,
        expires: expires
    };
}
exports.encodeSession = encodeSession;
