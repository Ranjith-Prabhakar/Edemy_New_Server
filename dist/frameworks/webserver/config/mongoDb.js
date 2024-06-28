"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DB_String = process.env.DB || "";
const connectDB = async () => {
    try {
        await mongoose_1.default
            .connect(DB_String)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then((data) => console.log(`db connected on ${data.connection.host}`));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        console.log(error.message);
        setTimeout(connectDB, 5000);
    }
};
exports.default = connectDB;
//# sourceMappingURL=mongoDb.js.map