"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestManagement = void 0;
class RequestManagement {
    async logoutCleanUp(res) {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
    }
}
exports.RequestManagement = RequestManagement;
//# sourceMappingURL=requestManagement.js.map