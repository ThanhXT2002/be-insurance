# NestJS Version Information

## Current Project Version
- **NestJS Core**: v11.0.1
- **NestJS CLI**: v11.0.0
- **TypeScript**: v5.7.3
- **Node.js**: Recommended v18+ or v20+

## Important Notes for AI Code Generation

### 🔥 NestJS v11 Breaking Changes & New Features

#### 1. **Decorator Changes (v11)**
```typescript
// ✅ CORRECT (v11+)
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll() { }
  
  @Post()
  create(@Body() createUserDto: CreateUserDto) { }
}
```

#### 2. **Module Registration (v11)**
```typescript
// ✅ CORRECT (v11+)
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true, // New in v11
      expandVariables: true, // New in v11
    }),
  ],
})
export class AppModule {}
```

#### 3. **Dependency Injection (v11)**
```typescript
// ✅ CORRECT (v11+)
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject('CONFIG_OPTIONS') private config: ConfigOptions,
  ) {}
}
```

#### 4. **Guards & Interceptors (v11)**
```typescript
// ✅ CORRECT (v11+)
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) return true;
    
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
```

#### 5. **Exception Filters (v11)**
```typescript
// ✅ CORRECT (v11+)
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
```

#### 6. **Validation Pipes (v11)**
```typescript
// ✅ CORRECT (v11+)
import { ValidationPipe } from '@nestjs/common';

// In main.ts
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
}));
```

#### 7. **DTOs with class-validator (v11)**
```typescript
// ✅ CORRECT (v11+)
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
}
```

### 🚨 **DEPRECATED & REMOVED in v11**

#### ❌ **OLD/DEPRECATED**
```typescript
// ❌ DEPRECATED - Don't use these patterns
import { NestInterceptor } from '@nestjs/common'; // Old import path
```

#### ✅ **NEW/CORRECT**
```typescript
// ✅ CORRECT - Use these patterns
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
```

### 📦 **Required Dependencies for v11**

```json
{
  "dependencies": {
    "@nestjs/common": "^11.0.1",
    "@nestjs/core": "^11.0.1",
    "@nestjs/platform-express": "^11.0.1",
    "@nestjs/config": "^4.0.2",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^11.0.0",
    "@nestjs/schematics": "^11.0.0",
    "@nestjs/testing": "^11.0.1",
    "typescript": "^5.7.3"
  }
}
```

### 🎯 **Code Generation Guidelines**

1. **Always use v11 compatible imports**
2. **Use modern decorator syntax**
3. **Implement proper error handling**
4. **Use TypeScript strict mode**
5. **Follow NestJS v11 module patterns**
6. **Use proper dependency injection**

### 📚 **References**
- [NestJS v11 Documentation](https://docs.nestjs.com/)
- [Migration Guide](https://docs.nestjs.com/migration-guide)
- [Release Notes](https://github.com/nestjs/nest/releases)

---
**Last Updated**: January 2025
**Project**: be-insurance
**Maintainer**: Development Team
