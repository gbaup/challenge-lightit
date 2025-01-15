import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { MailService } from '../mail/mail.service';

@Injectable()
export class PatientService {
  constructor(
    private readonly mailService: MailService,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const patient = this.patientRepository.create(createPatientDto);
    try {
      await this.patientRepository.save(patient);
      await this.mailService.sendConfirmationEmail(
        createPatientDto.email,
        'Welcome to our platform!',
        'You have successfully registered.',
      );
      return patient;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    return this.patientRepository.find();
  }

  private handleExceptions(error: any) {
    if (error.errno === 1062) {
      throw new BadRequestException(`Email already exists`);
    }
    throw new InternalServerErrorException(error);
  }
}
