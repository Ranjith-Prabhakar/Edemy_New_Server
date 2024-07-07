import { ICloudStorageResponse } from "../../useCasese/interface/request_And_Response/cloudStorageResponse";
import { ICloudStorage } from "../../useCasese/interface/services/cloudStorage";
import dotenv from "dotenv";
dotenv.config();

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
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

export class CloudStorage implements ICloudStorage {
  async addFileToCloud(
    fileName: string,
    contentType: string,
    userId: string,
    folderName: string
  ): Promise<string | void> {
   
    try {
      const command = new PutObjectCommand({
        // Bucket: "bucket.edemy",
        Bucket: process.env.S3_BOCKET_NAME,
        Key: `uploads/user-uploads/${userId}/${folderName}/${fileName}`,
        ContentType: contentType,
      });
      const url = await getSignedUrl(s3Client, command);
      
      return url;
    } catch (error) {
      throw error;
    }
  }

  async getVideoPresignedUrl(
    courseName: string
  ): Promise<void | ICloudStorageResponse> {
    try {
      const command = new GetObjectCommand({
        Bucket: process.env.S3_BOCKET_NAME,
        Key: `${process.env.S3_COURSE_CONTENT_LOCATION}${courseName}`,
      });

      const url = await getSignedUrl(s3Client, command);
      if (url) {
        return { status: 200, message: "video has been fetched", data: url };
      } else {
        throw new Error("video not found");
      }
    } catch (error) {
      throw error;
    }
  }
}

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
