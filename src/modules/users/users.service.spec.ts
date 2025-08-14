import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UserRole, UserStatus, Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

jest.mock('bcryptjs');

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    password: 'hashedPassword',
    fullName: 'Test User',
    role: UserRole.USER,
    status: UserStatus.ACTIVE,
    isActive: true,
    isLocked: false,
    emailVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaService = {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user with hashed password', async () => {
      const createUserDto = {
        email: 'test@example.com',
        password: 'password123',
        fullName: 'Test User',
      };

      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      mockPrismaService.user.create.mockResolvedValue(mockUser);

      const result = await service.create(createUserDto);

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          email: 'test@example.com',
          password: 'hashedPassword',
          fullName: 'Test User',
        }),
        select: expect.any(Object),
      });
      expect(result).toEqual(mockUser);
    });

    it('should handle duplicate email error', async () => {
      const createUserDto = {
        email: 'test@example.com',
        fullName: 'Test User',
      };

      const prismaError = new Prisma.PrismaClientKnownRequestError(
        'Unique constraint failed',
        {
          code: 'P2002',
          clientVersion: '4.0.0',
          meta: { target: ['email'] },
        }
      );

      mockPrismaService.user.create.mockRejectedValue(prismaError);

      await expect(service.create(createUserDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return paginated users', async () => {
      const query = { page: 1, limit: 10 };
      const users = [mockUser];
      const totalCount = 1;

      mockPrismaService.user.findMany.mockResolvedValue(users);
      mockPrismaService.user.count.mockResolvedValue(totalCount);

      const result = await service.findAll(query);

      expect(result).toEqual({
        data: users,
        meta: {
          total: totalCount,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      });
    });

    it('should filter users by search term', async () => {
      const query = { search: 'test', page: 1, limit: 10 };

      await service.findAll(query);

      expect(prisma.user.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { email: { contains: 'test', mode: 'insensitive' } },
            { fullName: { contains: 'test', mode: 'insensitive' } },
            { phone: { contains: 'test' } },
          ],
        },
        skip: 0,
        take: 10,
        orderBy: { createdAt: 'desc' },
        select: expect.any(Object),
      });
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.findOne(1);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        select: expect.any(Object),
      });
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException when user not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto = { fullName: 'Updated User' };
      const updatedUser = { ...mockUser, fullName: 'Updated User' };

      mockPrismaService.user.update.mockResolvedValue(updatedUser);

      const result = await service.update(1, updateUserDto);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateUserDto,
        select: expect.any(Object),
      });
      expect(result).toEqual(updatedUser);
    });

    it('should handle user not found error', async () => {
      const updateUserDto = { fullName: 'Updated User' };
      const prismaError = new Prisma.PrismaClientKnownRequestError(
        'Record not found',
        {
          code: 'P2025',
          clientVersion: '4.0.0',
        }
      );

      mockPrismaService.user.update.mockRejectedValue(prismaError);

      await expect(service.update(999, updateUserDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      mockPrismaService.user.delete.mockResolvedValue(mockUser);

      const result = await service.remove(1);

      expect(prisma.user.delete).toHaveBeenCalledWith({
        where: { id: 1 },
        select: expect.any(Object),
      });
      expect(result).toEqual(mockUser);
    });

    it('should handle user not found error', async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError(
        'Record not found',
        {
          code: 'P2025',
          clientVersion: '4.0.0',
        }
      );

      mockPrismaService.user.delete.mockRejectedValue(prismaError);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('lockUser', () => {
    it('should lock a user with reason', async () => {
      const reason = 'Suspicious activity';
      const lockedUser = { ...mockUser, isLocked: true, lockReason: reason };

      mockPrismaService.user.update.mockResolvedValue(lockedUser);

      const result = await service.lockUser(1, reason);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { isLocked: true, lockReason: reason },
        select: expect.any(Object),
      });
      expect(result).toEqual(lockedUser);
    });
  });

  describe('unlockUser', () => {
    it('should unlock a user', async () => {
      const unlockedUser = { ...mockUser, isLocked: false, lockReason: null };

      mockPrismaService.user.update.mockResolvedValue(unlockedUser);

      const result = await service.unlockUser(1);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { isLocked: false, lockReason: null },
        select: expect.any(Object),
      });
      expect(result).toEqual(unlockedUser);
    });
  });

  describe('verifyEmail', () => {
    it('should verify user email', async () => {
      const verifiedUser = { ...mockUser, emailVerified: true };

      mockPrismaService.user.update.mockResolvedValue(verifiedUser);

      const result = await service.verifyEmail(1);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { emailVerified: true },
        select: expect.any(Object),
      });
      expect(result).toEqual(verifiedUser);
    });
  });

  describe('findByEmail', () => {
    it('should find user by email', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.findByEmail('test@example.com');

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('findBySocialLogin', () => {
    it('should find user by Google ID', async () => {
      mockPrismaService.user.findFirst.mockResolvedValue(mockUser);

      const result = await service.findBySocialLogin('google', 'google123');

      expect(prisma.user.findFirst).toHaveBeenCalledWith({
        where: { googleId: 'google123' },
      });
      expect(result).toEqual(mockUser);
    });

    it('should find user by Facebook ID', async () => {
      mockPrismaService.user.findFirst.mockResolvedValue(mockUser);

      const result = await service.findBySocialLogin('facebook', 'facebook123');

      expect(prisma.user.findFirst).toHaveBeenCalledWith({
        where: { facebookId: 'facebook123' },
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('getUserStats', () => {
    it('should return user statistics', async () => {
      mockPrismaService.user.count
        .mockResolvedValueOnce(100) // totalUsers
        .mockResolvedValueOnce(90)  // activeUsers
        .mockResolvedValueOnce(10)  // recentUsers
        .mockResolvedValueOnce(5);  // lockedUsers

      const result = await service.getUserStats();

      expect(result).toEqual({
        totalUsers: 100,
        activeUsers: 90,
        recentUsers: 10,
        lockedUsers: 5,
      });
    });
  });
});
