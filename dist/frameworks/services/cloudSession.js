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
exports.CloudSession = void 0;
const index_1 = require("../../index");
class CloudSession {
    // **********************************************************************************************
    createUserSession(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield index_1.redis.set(id, JSON.stringify(user));
            return result;
        });
    }
    // **********************************************************************************************
    clearUserSession(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield index_1.redis.del(id);
            return result;
        });
    }
    // **********************************************************************************************
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield index_1.redis.get(id);
            if (!user) {
                return { status: 400, success: false, message: "session has expired" };
            }
            else {
                return user;
            }
        });
    }
}
exports.CloudSession = CloudSession;
//# sourceMappingURL=cloudSession.js.map