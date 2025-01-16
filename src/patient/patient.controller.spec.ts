import { Test, TestingModule } from '@nestjs/testing';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Patient } from './entities/patient.entity';

describe('PatientController', () => {
  let patientController: PatientController;
  let patientService: jest.Mocked<PatientService>;

  beforeEach(async () => {
    const mockPatientService = {
      create: jest.fn(),
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [
        {
          provide: PatientService,
          useValue: mockPatientService,
        },
      ],
    }).compile();

    patientController = module.get<PatientController>(PatientController);
    patientService = module.get(PatientService);
  });

  it('should be defined', () => {
    expect(patientController).toBeDefined();
  });

  describe('create', () => {
    it('should call patientService.create with correct parameters', async () => {
      const createPatientDto: CreatePatientDto = {
        name: 'John Doe',
        email: 'example@example.com',
        address: '1234 Elm St',
        phone: '123-456-7890',
      };
      const photoMock = { originalname: 'photo.jpg' };

      await patientController.create(createPatientDto, photoMock);

      expect(patientService.create).toHaveBeenCalledWith(
        createPatientDto,
        photoMock,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of patients', async () => {
      const patients = [
        {
          id: '1',
          name: 'John Doe',
          email: 'example@example.com',
          address: '1234 Elm St',
          phone: '123-456-7890',
        },
      ];
      patientService.findAll.mockResolvedValue(patients);

      const result = await patientController.findAll();

      expect(result).toEqual(patients);
      expect(patientService.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
