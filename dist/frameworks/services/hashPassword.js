"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encrypt = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class Encrypt {
    constructor() { }
    async createHash(password) {
        const hashPassword = await bcryptjs_1.default.hash(password, 10);
        return hashPassword;
    }
    async comparePassword(password, hashPassword) {
        const passwordMatch = await bcryptjs_1.default.compare(password, hashPassword);
        return passwordMatch;
    }
}
exports.Encrypt = Encrypt;
//# sourceMappingURL=hashPassword.js.map