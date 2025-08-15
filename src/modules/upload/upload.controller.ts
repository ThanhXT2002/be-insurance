import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createCloudinaryStorage } from '../../common/shared/cloudinary-storage.factory';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: createCloudinaryStorage('xtbh-insurance/images') }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      url: file.path,
      public_id: file.filename,
      originalname: file.originalname,
    };
  }
}
