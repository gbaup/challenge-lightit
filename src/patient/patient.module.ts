import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { MailService } from '../mail/mail.service';

@Module({
  controllers: [PatientController],
  providers: [PatientService, MailService],
  imports: [TypeOrmModule.forFeature([Patient])],
})
export class PatientModule {}
