import { IsRequiredString } from '../../common/decorators/is-required-string.decorator';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreatePatientDto {
  @IsRequiredString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsRequiredString()
  address: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}
