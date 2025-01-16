import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { MailService } from '../mail/mail.service';
import { ImagesService } from '../images/images.service';

@Module({
  controllers: [PatientController],
  providers: [PatientService, MailService, ImagesService],
  imports: [TypeOrmModule.forFeature([Patient])],
})
export class PatientModule {}
