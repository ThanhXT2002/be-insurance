import { UploadModule } from './modules/upload/upload.module';
import { UploadController } from './modules/upload/upload.controller';
import { CloudinaryModule } from './modules/coundinary/cloudinary.module';
import { CloudinaryService } from './modules/coundinary/cloudinary.service';
import { CloudinaryController } from './modules/coundinary/cloudinary.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
        UploadModule, 
        CloudinaryModule,
        UsersModule,
        ConfigModule.forRoot({
          isGlobal: true, // Để dùng ở mọi nơi không cần import lại
        }),
  ],
  controllers: [
        UploadController, CloudinaryController, AppController],
  providers: [CloudinaryService, AppService],
})
export class AppModule {}
