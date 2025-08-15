/*
https://docs.nestjs.com/providers#services
*/
import { v2 as cloudinary } from 'cloudinary';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  getInstance() {
    return cloudinary;
  }

  async uploadFile(filePath: string, options?: any): Promise<any> {
    return cloudinary.uploader.upload(filePath, options);
  }

  async deleteFile(publicId: string, options?: any): Promise<any> {
    return cloudinary.uploader.destroy(publicId, options);
  }

  getUrl(publicId: string, options?: any): string {
    return cloudinary.url(publicId, options);
  }
}
