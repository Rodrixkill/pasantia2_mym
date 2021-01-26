"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireJwtMiddleware = void 0;
const decodeToken_1 = require("./decodeToken");
const expiredToken_1 = require("./expiredToken");
const webToken_1 = require("./webToken");
const SECRET_KEY_HERE = "m&m-enterprise";
/**
 * Express middleware, checks for a valid JSON Web Token and returns 401 Unauthorized if one isn't found.
 */
function requireJwtMiddleware(request, response, next) {
    const unauthorized = (message) => response.status(401).json({
        ok: false,
        status: 401,
        message: message
    });
    const requestHeader = "X-JWT-Token";
    const responseHeader = "X-Renewed-JWT-Token";
    const header = request.header(requestHeader);
    if (!header) {
        unauthorized(`Required ${requestHeader} header not found.`);
        return;
    }
    const decodedSession = decodeToken_1.decodeSession(SECRET_KEY_HERE, header);
    if (decodedSession.type === "integrity-error" || decodedSession.type === "invalid-token") {
        unauthorized(`Failed to decode or validate authorization token. Reason: ${decodedSession.type}.`);
        return;
    }
    const expiration = expiredToken_1.checkExpirationStatus(decodedSession.session);
    if (expiration === "expired") {
        unauthorized(`Authorization token has expired. Please create a new authorization token.`);
        return;
    }
    let session;
    if (expiration === "grace") {
        // Automatically renew the session and send it back with the response
        const { token, expires, issued } = webToken_1.encodeSession(SECRET_KEY_HERE, decodedSession.session);
        session = Object.assign(Object.assign({}, decodedSession.session), { expires: expires, issued: issued });
        response.setHeader(responseHeader, token);
    }
    else {
        session = decodedSession.session;
    }
    // Set the session on response.locals object for routes to access
    response.locals = Object.assign(Object.assign({}, response.locals), { session: session });
    // Request has a valid or renewed session. Call next to continue to the authenticated route handler
    next();
}
exports.requireJwtMiddleware = requireJwtMiddleware;
