import {applyDecorators} from '@nestjs/common';
import {IsNotEmpty, IsString} from 'class-validator';

export function IsRequiredString() {
    return applyDecorators(IsString(), IsNotEmpty());
}
