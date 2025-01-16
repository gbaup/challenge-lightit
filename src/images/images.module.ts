import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';

@Module({
  controllers: [],
  providers: [ImagesService],
})
export class ImagesModule {}
