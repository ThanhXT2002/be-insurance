# Code Generation Guidelines for AI Assistants

## 🎯 **PRIMARY REQUIREMENTS**

### **ALWAYS CHECK FIRST**: [NESTJS_VERSION_INFO.md](./NESTJS_VERSION_INFO.md)
Before generating any NestJS code, **MANDATORY** to review the version-specific guidelines.

---

## 🔧 **Code Generation Rules**

### 1. **NestJS Version Compliance**
- ✅ **Use NestJS v11.0.1+ patterns**
- ✅ **TypeScript 5.7.3+ features**
- ✅ **Modern decorator syntax**
- ❌ **NO deprecated v10 or older patterns**

### 2. **File Structure Standards**

#### **Controllers**
```typescript
// ✅ CORRECT Template
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
```

#### **Services**
```typescript
// ✅ CORRECT Template
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  private users = []; // Replace with actual database

  create(createUserDto: CreateUserDto) {
    // Implementation
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    Object.assign(user, updateUserDto);
    return user;
  }

  remove(id: number) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.users.splice(index, 1)[0];
  }
}
```

#### **DTOs**
```typescript
// ✅ CORRECT Template
import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;
}
```

#### **Modules**
```typescript
// ✅ CORRECT Template
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // If needed by other modules
})
export class UsersModule {}
```

### 3. **Database Integration (Prisma)**

#### **Prisma Service**
```typescript
// ✅ CORRECT Template
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

#### **Service with Prisma**
```typescript
// ✅ CORRECT Template
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
```

### 4. **Error Handling**

```typescript
// ✅ CORRECT Template
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  // ... other methods

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
}
```

### 5. **Authentication & Authorization**

#### **JWT Guard**
```typescript
// ✅ CORRECT Template
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException();
    }
    
    try {
      const payload = await this.jwtService.verifyAsync(token);
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
```

---

## 🚨 **CRITICAL REMINDERS**

### **NEVER Generate These Patterns:**
- ❌ Old import paths from NestJS v10 or earlier
- ❌ Deprecated decorator patterns
- ❌ Non-TypeScript strict mode code
- ❌ Missing error handling
- ❌ Non-async database operations
- ❌ Missing validation decorators

### **ALWAYS Include:**
- ✅ Proper imports from @nestjs packages
- ✅ TypeScript types and interfaces
- ✅ Error handling with appropriate HTTP exceptions
- ✅ Validation decorators on DTOs
- ✅ Proper async/await patterns
- ✅ Modern ES6+ syntax

---

## 📋 **Checklist Before Code Generation**

- [ ] Reviewed NestJS v11 compatibility
- [ ] Used correct import paths
- [ ] Included proper error handling
- [ ] Added validation decorators
- [ ] Used TypeScript strict types
- [ ] Followed project structure standards
- [ ] Implemented async patterns correctly

---

**Remember**: Quality over speed. Generate correct, maintainable code that follows current best practices.
