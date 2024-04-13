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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstructors = void 0;
const errorHandler_1 = __importDefault(require("../../middlewares/errorHandler"));
const getInstructors = (userRepository, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("inside getInstructors uuc-module");
        return yield userRepository.getUsers("instructor");
    }
    catch (error) {
        return next(new errorHandler_1.default(500, error.message));
    }
});
exports.getInstructors = getInstructors;
//# sourceMappingURL=getInstructors.js.map