# GitHub Copilot Instructions for NestJS Project

## 🎯 **Project Context**

You are working on a **NestJS v11.0.1** backend project for an insurance system (`be-insurance`). Always generate code that follows modern NestJS patterns and best practices.

---

## 📋 **Code Generation Rules**

### **1. Version Requirements**
- **NestJS**: v11.0.1+ (MANDATORY)
- **TypeScript**: v5.7.3+
- **Node.js**: v18+ recommended
- **Database**: PostgreSQL with Prisma ORM

### **2. Import Patterns** ✅
```typescript
// ✅ ALWAYS use these imports
import { Injectable, Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';
```

### **3. Controller Pattern** ✅
```typescript
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
```

### **4. Service Pattern** ✅
```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prisma.user.create({
        data: createUserDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email already exists');
        }
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
      }
      throw error;
    }
  }
}
```

### **5. DTO Pattern** ✅
```typescript
import { IsEmail, IsString, IsOptional, MinLength, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEnum(['USER', 'ADMIN'])
  role?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
```

### **6. Module Pattern** ✅
```typescript
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```

---

## 🚫 **DON'T Generate These Patterns**

### ❌ **Deprecated Imports**
```typescript
// ❌ DON'T use old patterns
import { HttpModule } from '@nestjs/common'; // Wrong!
import { TypeOrmModule } from '@nestjs/typeorm'; // Not using TypeORM
```

### ❌ **Missing Error Handling**
```typescript
// ❌ DON'T generate without error handling
async findOne(id: number) {
  return this.prisma.user.findUnique({ where: { id } }); // Missing null check!
}
```

### ❌ **Non-async Database Operations**
```typescript
// ❌ DON'T generate sync operations
findAll() {
  return this.users; // Should be async with Prisma!
}
```

---

## 🔧 **Specific for Insurance Project**

### **Common Entity Types**
- **Users**: Customers, agents, admins
- **Policies**: Insurance policies
- **Claims**: Insurance claims
- **Payments**: Premium payments
- **Documents**: Policy documents, claims documents

### **Business Logic Patterns**
```typescript
// Insurance-specific validation
export class CreatePolicyDto {
  @IsString()
  policyNumber: string;

  @IsEnum(['LIFE', 'HEALTH', 'AUTO', 'HOME'])
  type: PolicyType;

  @IsNumber()
  @Min(0)
  premiumAmount: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsInt()
  customerId: number;
}
```

---

## 📁 **File Structure Guidelines**

When generating new modules, follow this structure:
```
src/
  [module-name]/
    ├── dto/
    │   ├── create-[entity].dto.ts
    │   └── update-[entity].dto.ts
    ├── entities/
    │   └── [entity].entity.ts  (if needed)
    ├── [module].controller.ts
    ├── [module].service.ts
    ├── [module].module.ts
    ├── [module].controller.spec.ts
    └── [module].service.spec.ts
```

---

## 🧪 **Testing Patterns**

### **Service Test Template**
```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more specific tests...
});
```

---

## 🛡️ **Security Patterns**

### **Always Include Validation**
```typescript
// ✅ ALWAYS use validation pipes
@Post()
async create(@Body() createDto: CreateDto) {
  // Validation is handled by class-validator decorators
}
```

### **Authentication Guard**
```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  // Protected endpoints
}
```

---

## 📚 **Environment Integration**

Always use ConfigService for environment variables:
```typescript
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SomeService {
  constructor(private configService: ConfigService) {}

  getConfig() {
    return this.configService.get<string>('DATABASE_URL');
  }
}
```

---

## ⚡ **Performance Guidelines**

### **Use Select for Large Objects**
```typescript
// ✅ Good - select only needed fields
async findUsers() {
  return this.prisma.user.findMany({
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    },
  });
}
```

### **Use Pagination**
```typescript
async findAll(page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit;
  
  return this.prisma.user.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' },
  });
}
```

---

## 🔍 **Code Review Checklist**

Before suggesting code, ensure:
- [ ] ✅ Using NestJS v11.0.1+ patterns
- [ ] ✅ Proper error handling with HTTP exceptions
- [ ] ✅ Validation decorators on DTOs
- [ ] ✅ Async/await for database operations
- [ ] ✅ TypeScript strict types
- [ ] ✅ Proper imports from @nestjs packages
- [ ] ✅ Following project file structure
- [ ] ✅ Including basic tests

---

**Remember**: Generate production-ready, type-safe, and well-tested code that follows NestJS v11 best practices and insurance domain requirements.
