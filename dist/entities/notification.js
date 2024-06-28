"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENotificationMsg = exports.ENotification = void 0;
var ENotification;
(function (ENotification) {
    ENotification["instructorRequests"] = "instructorRequests";
    ENotification["instructorRequestApproval"] = "instructorRequestApproval";
    ENotification["instructorRequestRejection"] = "instructorRequestRejection";
    ENotification["courseApprovalRequest"] = "courseApprovalRequest";
    ENotification["courseApprovalApprovance"] = "courseApprovalApprovance";
    ENotification["courseApprovalRejection"] = "courseApprovalRejection";
    ENotification["broadCasting"] = "broadCasting";
})(ENotification || (exports.ENotification = ENotification = {}));
var ENotificationMsg;
(function (ENotificationMsg) {
    ENotificationMsg["instructorRequests"] = "A Request from a user to be instructor has been registered";
    ENotificationMsg["instructorRequestApproval"] = "Request for being instructor has been approved";
    ENotificationMsg["instructorRequestRejection"] = "Request for being instructor has been rejected";
    ENotificationMsg["courseApprovalRequest"] = "A Request from a instructor for new course approval has been recorded";
    ENotificationMsg["courseApprovalApprovance"] = "Request for new course has been approved";
    ENotificationMsg["courseApprovalRejection"] = "Request for new course has been rejected";
    ENotificationMsg["courseApprovalApprovanceForAllUsers"] = "A new course has been added";
})(ENotificationMsg || (exports.ENotificationMsg = ENotificationMsg = {}));
//# sourceMappingURL=notification.js.map