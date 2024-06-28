"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const createUser = async (newUser, userModels) => {
    try {
        const user = await userModels.create(newUser);
        await user.save();
        return user;
    }
    catch (error) {
        throw error;
    }
};
exports.createUser = createUser;
//# sourceMappingURL=createUser.js.map