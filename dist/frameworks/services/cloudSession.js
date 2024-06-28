"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudSession = void 0;
const index_1 = require("../../index");
class CloudSession {
    // **********************************************************************************************
    async createUserSession(id, user) {
        const result = await index_1.redis.set(id, JSON.stringify(user));
        return result;
    }
    // **********************************************************************************************
    async clearUserSession(id) {
        const result = await index_1.redis.del(id);
        return result;
    }
    // **********************************************************************************************
    async getUser(id) {
        const user = await index_1.redis.get(id);
        if (!user) {
            return { status: 400, success: false, message: "session has expired" };
        }
        else {
            return user;
        }
    }
}
exports.CloudSession = CloudSession;
//# sourceMappingURL=cloudSession.js.map