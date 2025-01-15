import {Injectable} from '@nestjs/common';
import {CreatePatientDto} from './dto/create-patient.dto';
import {UpdatePatientDto} from './dto/update-patient.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Patient} from './entities/patient.entity';

@Injectable()
export class PatientService {
    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>
    ) {
    }

    async create(createPatientDto: CreatePatientDto) {
        const patient = this.patientRepository.create(createPatientDto);
        await this.patientRepository.save(patient);
        return patient;
    }

    async findAll() {
        console.log('service: findAll()');
        return this.patientRepository.find();
    }

}
