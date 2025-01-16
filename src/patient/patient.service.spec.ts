import { Test, TestingModule } from '@nestjs/testing';
import { PatientService } from './patient.service';
import { MailService } from '../mail/mail.service';
import { ImagesService } from '../images/images.service';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('PatientService', () => {
  let patientService: PatientService;
  let mailService: jest.Mocked<MailService>;
  let imagesService: jest.Mocked<ImagesService>;
  let patientRepository: jest.Mocked<Repository<Patient>>;

  beforeEach(async () => {
    const mockMailService = {
      sendConfirmationEmail: jest.fn(),
    };

    const mockImagesService = {
      uploadImageS3: jest.fn(),
    };

    const mockPatientRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientService,
        {
          provide: MailService,
          useValue: mockMailService,
        },
        {
          provide: ImagesService,
          useValue: mockImagesService,
        },
        {
          provide: getRepositoryToken(Patient),
          useValue: mockPatientRepository,
        },
      ],
    }).compile();

    patientService = module.get<PatientService>(PatientService);
    mailService = module.get(MailService);
    imagesService = module.get(ImagesService);
    patientRepository = module.get(getRepositoryToken(Patient));
  });

  it('should be defined', () => {
    expect(patientService).toBeDefined();
  });

  describe('create', () => {
    it('should create a patient and call all dependencies', async () => {
      const createPatientDto = {
        name: 'John Doe',
        email: 'example@example.com',
        address: '1234 Elm St',
        phone: '123-456-7890',
      } as any;
      const photoMock = { originalname: 'photo.jpg' };
      const savedPatient = { id: 1, ...createPatientDto };

      patientRepository.create.mockReturnValue(savedPatient);
      patientRepository.save.mockResolvedValue(savedPatient);
      imagesService.uploadImageS3.mockResolvedValue(
        'https://example.com/photo.jpg',
      );
      mailService.sendConfirmationEmail.mockResolvedValue(undefined);

      const result = await patientService.create(createPatientDto, photoMock);

      expect(patientRepository.create).toHaveBeenCalledWith(createPatientDto);
      expect(patientRepository.save).toHaveBeenCalledTimes(2);
      expect(imagesService.uploadImageS3).toHaveBeenCalledWith(
        photoMock,
        createPatientDto.email,
      );
      expect(mailService.sendConfirmationEmail).toHaveBeenCalledWith(
        createPatientDto.email,
        'Welcome to our platform!',
        'You have successfully registered.',
      );
      expect(result).toEqual({
        id: 1,
        ...createPatientDto,
        photo: 'https://example.com/photo.jpg',
      });
    });

    it('should handle duplicate email error', async () => {
      const createPatientDto = {
        name: 'John Doe',
        email: 'example@example.com',
        address: '1234 Elm St',
        phone: '123-456-7890',
      } as any;
      const error = { errno: 1062 };

      patientRepository.create.mockReturnValue(createPatientDto);
      patientRepository.save.mockRejectedValue(error);

      await expect(patientService.create(createPatientDto, {})).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should handle unknown errors', async () => {
      const createPatientDto = {
        name: 'John Doe',
        email: 'example@example.com',
        address: '1234 Elm St',
        phone: '123-456-7890',
      } as any;
      const error = { errno: 9999 };

      patientRepository.create.mockReturnValue(createPatientDto);
      patientRepository.save.mockRejectedValue(error);

      await expect(patientService.create(createPatientDto, {})).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('findAll', () => {
    it('should return all patients', async () => {
      const patients = [
        {
          id: '1',
          name: 'John Doe',
          email: 'example@example.com',
          address: '1234 Elm St',
          phone: '123-456-7890',
        },
      ];
      patientRepository.find.mockResolvedValue(patients);

      const result = await patientService.findAll();

      expect(result).toEqual(patients);
      expect(patientRepository.find).toHaveBeenCalledTimes(1);
    });
  });
});
