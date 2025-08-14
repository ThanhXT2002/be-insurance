import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUsersDto } from './dto/query-users.dto';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const data: Prisma.UserCreateInput = { ...createUserDto };

      // Hash password nếu có
      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }

      // Convert dateOfBirth string to Date
      if (createUserDto.dateOfBirth) {
        data.dateOfBirth = new Date(createUserDto.dateOfBirth);
      }

      return await this.prisma.user.create({
        data,
        select: {
          id: true,
          email: true,
          emailVerified: true,
          facebookId: true,
          googleId: true,
          firebaseUid: true,
          appleId: true,
          role: true,
          avatar: true,
          fullName: true,
          phone: true,
          province: true,
          district: true,
          ward: true,
          address: true,
          dateOfBirth: true,
          isActive: true,
          isLocked: true,
          lockReason: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          // Loại bỏ password, refreshToken, otpSecret khỏi response
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const field = error.meta?.target as string[];
          throw new ConflictException(`${field?.[0] || 'Field'} already exists`);
        }
      }
      throw error;
    }
  }

  async findAll(query: QueryUsersDto = {}) {
    const {
      page = 1,
      limit = 10,
      search,
      role,
      status,
      isActive,
      isLocked,
      province,
      district,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = query;

    const skip = (page - 1) * limit;
    const take = Math.min(limit, 100); // Giới hạn tối đa 100 records

    // Build where clause
    const where: Prisma.UserWhereInput = {};

    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { fullName: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
      ];
    }

    if (role) where.role = role;
    if (status) where.status = status;
    if (isActive !== undefined) where.isActive = isActive;
    if (isLocked !== undefined) where.isLocked = isLocked;
    if (province) where.province = { contains: province, mode: 'insensitive' };
    if (district) where.district = { contains: district, mode: 'insensitive' };

    // Build orderBy
    const orderBy: Prisma.UserOrderByWithRelationInput = {};
    orderBy[sortBy] = sortOrder;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take,
        orderBy,
        select: {
          id: true,
          email: true,
          emailVerified: true,
          role: true,
          avatar: true,
          fullName: true,
          phone: true,
          province: true,
          district: true,
          ward: true,
          address: true,
          dateOfBirth: true,
          isActive: true,
          isLocked: true,
          lockReason: true,
          status: true,
          lastLogin: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        emailVerified: true,
        facebookId: true,
        googleId: true,
        firebaseUid: true,
        appleId: true,
        role: true,
        avatar: true,
        fullName: true,
        phone: true,
        province: true,
        district: true,
        ward: true,
        address: true,
        dateOfBirth: true,
        isActive: true,
        isLocked: true,
        lockReason: true,
        status: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const data: Prisma.UserUpdateInput = { ...updateUserDto };

      // Convert dateOfBirth string to Date
      if (updateUserDto.dateOfBirth) {
        data.dateOfBirth = new Date(updateUserDto.dateOfBirth);
      }

      return await this.prisma.user.update({
        where: { id },
        data,
        select: {
          id: true,
          email: true,
          emailVerified: true,
          facebookId: true,
          googleId: true,
          firebaseUid: true,
          appleId: true,
          role: true,
          avatar: true,
          fullName: true,
          phone: true,
          province: true,
          district: true,
          ward: true,
          address: true,
          dateOfBirth: true,
          isActive: true,
          isLocked: true,
          lockReason: true,
          status: true,
          lastLogin: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        if (error.code === 'P2002') {
          const field = error.meta?.target as string[];
          throw new ConflictException(`${field?.[0] || 'Field'} already exists`);
        }
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.user.delete({
        where: { id },
        select: {
          id: true,
          email: true,
          fullName: true,
          status: true,
        },
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

  // Soft delete - chuyển status thành DELETED
  async softDelete(id: number) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: { 
          status: 'DELETED' as any,
          isActive: false 
        },
        select: {
          id: true,
          email: true,
          fullName: true,
          status: true,
          isActive: true,
        },
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

  // Lock/Unlock user
  async lockUser(id: number, reason?: string) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: { 
          isLocked: true,
          lockReason: reason || 'Locked by admin'
        },
        select: {
          id: true,
          email: true,
          fullName: true,
          isLocked: true,
          lockReason: true,
        },
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

  async unlockUser(id: number) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: { 
          isLocked: false,
          lockReason: null 
        },
        select: {
          id: true,
          email: true,
          fullName: true,
          isLocked: true,
          lockReason: true,
        },
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

  // Verify email
  async verifyEmail(id: number) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: { emailVerified: true },
        select: {
          id: true,
          email: true,
          emailVerified: true,
        },
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

  // Update last login
  async updateLastLogin(id: number): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { lastLogin: new Date() },
    });
  }

  // Find by email
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // Find by social login
  async findBySocialLogin(provider: string, socialId: string): Promise<User | null> {
    const where: Prisma.UserWhereInput = {};
    
    switch (provider) {
      case 'facebook':
        where.facebookId = socialId;
        break;
      case 'google':
        where.googleId = socialId;
        break;
      case 'firebase':
        where.firebaseUid = socialId;
        break;
      case 'apple':
        where.appleId = socialId;
        break;
      default:
        throw new BadRequestException('Invalid social provider');
    }

    return this.prisma.user.findFirst({ where });
  }

  // Get user statistics
  async getUserStats() {
    const [totalUsers, activeUsers, recentUsers, lockedUsers] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { isActive: true } }),
      this.prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
          },
        },
      }),
      this.prisma.user.count({ where: { isLocked: true } }),
    ]);

    return {
      totalUsers,
      activeUsers,
      recentUsers,
      lockedUsers,
    };
  }
}
