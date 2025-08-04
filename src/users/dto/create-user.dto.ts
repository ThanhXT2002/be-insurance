import { 
  IsEmail, 
  IsString, 
  IsOptional, 
  MinLength, 
  IsEnum, 
  IsBoolean, 
  IsDateString,
  IsPhoneNumber,
  MaxLength 
} from 'class-validator';
import { Transform } from 'class-transformer';
import { UserRole, UserStatus } from '@prisma/client';

export class CreateUserDto {
  @IsOptional()
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase())
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password?: string;

  @IsOptional()
  @IsBoolean()
  emailVerified?: boolean;

  // Social login IDs
  @IsOptional()
  @IsString()
  facebookId?: string;

  @IsOptional()
  @IsString()
  googleId?: string;

  @IsOptional()
  @IsString()
  firebaseUid?: string;

  @IsOptional()
  @IsString()
  appleId?: string;

  // Phân quyền
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  // Thông tin cá nhân
  @IsOptional()
  @IsString()
  @MaxLength(255)
  avatar?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  fullName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  province?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  district?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  ward?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  // Trạng thái tài khoản
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isLocked?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  lockReason?: string;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;
}
