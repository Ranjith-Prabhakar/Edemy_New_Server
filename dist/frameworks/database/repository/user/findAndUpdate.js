"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAndUpdate = void 0;
const findAndUpdate = async (data, userModels) => {
    const id = data.userId;
    delete data.userId;
    delete data?.agreementId;
    const update = await userModels.findByIdAndUpdate(id, { role: "instructor" }, { new: true });
    if (!update) {
        return {
            status: 404,
            success: false,
            message: "User not found",
        };
    }
    else {
        return {
            status: 200,
            success: true,
            message: "user data updated",
        };
    }
};
exports.findAndUpdate = findAndUpdate;
//# sourceMappingURL=findAndUpdate.js.map