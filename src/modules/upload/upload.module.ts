/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { CloudinaryModule } from '../coundinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  controllers: [UploadController],
  providers: [],
})
export class UploadModule {}
