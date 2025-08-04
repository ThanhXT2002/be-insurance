import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true, // Để dùng ở mọi nơi không cần import lại
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
