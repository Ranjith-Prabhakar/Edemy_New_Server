"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudStorage = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { S3Client, PutObjectCommand, GetObjectCommand,
// eslint-disable-next-line @typescript-eslint/no-var-requires
 } = require("@aws-sdk/client-s3");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3Client = new S3Client({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    },
});
class CloudStorage {
    async addFileToCloud(fileName, contentType, userId, folderName) {
        try {
            const command = new PutObjectCommand({
                // Bucket: "bucket.edemy",
                Bucket: process.env.S3_BOCKET_NAME,
                Key: `uploads/user-uploads/${userId}/${folderName}/${fileName}`,
                ContentType: contentType,
            });
            const url = await getSignedUrl(s3Client, command);
            return url;
        }
        catch (error) {
            throw error;
        }
    }
    async getVideoPresignedUrl(courseName) {
        try {
            const command = new GetObjectCommand({
                Bucket: process.env.S3_BOCKET_NAME,
                Key: `${process.env.S3_COURSE_CONTENT_LOCATION}${courseName}`,
            });
            const url = await getSignedUrl(s3Client, command);
            if (url) {
                return { status: 200, message: "video has been fetched", data: url };
            }
            else {
                throw new Error("video not found");
            }
        }
        catch (error) {
            throw error;
        }
    }
}
exports.CloudStorage = CloudStorage;
//   async getVideoPresignedUrl(
//     courseName: string
//   ): Promise<void | ICloudStorageResponse> {
//     try {
//       const command = new GetObjectCommand({
//         Bucket: process.env.S3_BOCKET_NAME,
//         Key: `${process.env.S3_COURSE_CONTENT_LOCATION}${courseName}`,
//       });
//       const url = await getSignedUrl(s3Client, command);
//       if (url) {
//         return { status: 200, message: "video has been fetched", data: url };
//       } else {
//         throw new Error("video not found");
//       }
//     } catch (error) {
//       throw error;
//     }
//   }
// }
//# sourceMappingURL=cloudStorage.js.map