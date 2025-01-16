import { BadRequestException, Injectable } from '@nestjs/common';
import {
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

@Injectable()
export class ImagesService {
  private s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadImageS3(file, userEmail): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file provided.');
    }

    const bucketName = process.env.AWS_BUCKET_NAME;
    const fileKey = `images/${Date.now()}-${userEmail}`;

    try {
      const uploadParams = {
        Bucket: bucketName,
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read' as ObjectCannedACL,
      };

      await this.s3.send(new PutObjectCommand(uploadParams));

      return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw new BadRequestException('File upload failed');
    }
  }
}
