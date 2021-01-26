"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeSession = void 0;
const jwt_simple_1 = require("jwt-simple");
function decodeSession(secretKey, sessionToken) {
    // Always use HS512 to decode the token
    const algorithm = "HS512";
    let result;
    try {
        result = jwt_simple_1.decode(sessionToken, secretKey, false, algorithm);
    }
    catch (_e) {
        const e = _e;
        if (e.message === "No token supplied" || e.message === "Not enough or too many segments") {
            return {
                type: "invalid-token"
            };
        }
        if (e.message === "Signature verification failed" || e.message === "Algorithm not supported") {
            return {
                type: "integrity-error"
            };
        }
        // Handle json parse errors, thrown when the payload is nonsense
        if (e.message.indexOf("Unexpected token") === 0) {
            return {
                type: "invalid-token"
            };
        }
        throw e;
    }
    return {
        type: "valid",
        session: result
    };
}
exports.decodeSession = decodeSession;
