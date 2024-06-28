"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRepository = void 0;
const notificationModel_1 = __importDefault(require("../models/notificationModel"));
class NotificationRepository {
    async addNotification(userId, key, value) {
        try {
            if (value) {
                // if the field to update is new course updates for every user
                const result = await notificationModel_1.default.findOneAndUpdate({ userId }, { $addToSet: { [key]: value } });
                if (result)
                    return true;
                else
                    false;
            }
            else {
                const result = await notificationModel_1.default.findOneAndUpdate({ userId }, { [key]: true }, { upsert: true, new: true });
                if (result)
                    return true;
                else
                    false;
            }
        }
        catch (error) {
            throw error;
        }
    }
    //
    async getNotifications(userId) {
        try {
            const result = await notificationModel_1.default.findOne({ userId });
            if (result) {
                return {
                    success: true,
                    message: "notifications has found",
                    data: result,
                };
            }
            else {
                return {
                    success: false,
                    message: "there is no notifications",
                };
            }
        }
        catch (error) {
            throw error;
        }
    }
    //
    async updateNotifications(notificationHead, userId) {
        try {
            const result = await notificationModel_1.default.updateOne({ userId: userId }, { $set: { [notificationHead]: false } });
            if (result) {
                return { success: true, message: "notification has been updated" };
            }
            else {
                return { success: false, message: "notification hasn`t been updated" };
            }
        }
        catch (error) {
            throw error;
        }
    }
}
exports.NotificationRepository = NotificationRepository;
//# sourceMappingURL=notificationRepository.js.map