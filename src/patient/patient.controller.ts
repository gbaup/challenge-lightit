import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  create(@Body() createPatientDto: CreatePatientDto, @UploadedFile() photo) {
    return this.patientService.create(createPatientDto, photo);
  }

  @Get()
  findAll() {
    return this.patientService.findAll();
  }
}
