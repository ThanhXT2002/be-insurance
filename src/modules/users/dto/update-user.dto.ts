import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// Loại bỏ một số trường nhạy cảm khỏi update
export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password', 'emailVerified'] as const)
) {}
