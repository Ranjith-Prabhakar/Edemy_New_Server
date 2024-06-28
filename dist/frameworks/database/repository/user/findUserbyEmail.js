"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fidUserByEmail = void 0;
const fidUserByEmail = async (email, userModels) => {
    try {
        const existingUser = await userModels
            .findOne({ email })
            .select("+password");
        return existingUser;
    }
    catch (error) {
        throw error;
    }
};
exports.fidUserByEmail = fidUserByEmail;
//# sourceMappingURL=findUserbyEmail.js.map