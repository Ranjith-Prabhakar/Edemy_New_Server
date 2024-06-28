import { UserController } from "../../../../controllers/userController";
import { AdminController } from "../../../../controllers/adminController";
import { CoursesController } from "../../../../controllers/coursesController";
import { ChatController } from "../../../../controllers/chatController";
declare const userController: UserController;
declare const adminController: AdminController;
declare const courseController: CoursesController;
declare const chatController: ChatController;
export { userController, adminController, courseController, chatController };
