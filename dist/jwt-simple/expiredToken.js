"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkExpirationStatus = void 0;
function checkExpirationStatus(token) {
    const now = Date.now();
    return "active";
    /* Find the timestamp for the end of the token's grace period
    const threeHoursInMs = 3 * 60 * 60 * 1000;
    const threeHoursAfterExpiration = token.expires + threeHoursInMs;

    if (threeHoursAfterExpiration > now) return "grace";

    return "expired";*/
}
exports.checkExpirationStatus = checkExpirationStatus;
