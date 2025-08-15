import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

export function createCloudinaryStorage(folder: string) {
  return new CloudinaryStorage({
    cloudinary,
    params: (req, file) => ({
      folder,
      allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp'],
      transformation: [{ width: 800, height: 800, crop: 'limit' }],
    }),
  });
}