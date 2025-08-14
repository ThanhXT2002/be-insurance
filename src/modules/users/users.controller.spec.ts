import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUsersDto } from './dto/query-users.dto';
import { UserRole, UserStatus } from '@prisma/client';
describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    fullName: 'Test User',
    role: UserRole.USER,
    status: UserStatus.ACTIVE,
    isActive: true,
    isLocked: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    softDelete: jest.fn(),
    lockUser: jest.fn(),
    unlockUser: jest.fn(),
    verifyEmail: jest.fn(),
    getUserStats: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        fullName: 'Test User',
        password: 'password123',
      };

      mockUsersService.create.mockResolvedValue(mockUser);

      const result = await controller.create(createUserDto);

      expect(service.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return paginated users', async () => {
      const query: QueryUsersDto = { page: 1, limit: 10 };
      const mockResponse = {
        data: [mockUser],
        meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
      };

      mockUsersService.findAll.mockResolvedValue(mockResponse);

      const result = await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      mockUsersService.findOne.mockResolvedValue(mockUser);

      const result = await controller.findOne(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = { fullName: 'Updated User' };
      const updatedUser = { ...mockUser, fullName: 'Updated User' };

      mockUsersService.update.mockResolvedValue(updatedUser);

      const result = await controller.update(1, updateUserDto);

      expect(service.update).toHaveBeenCalledWith(1, updateUserDto);
      expect(result).toEqual(updatedUser);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      mockUsersService.remove.mockResolvedValue(mockUser);

      const result = await controller.remove(1);

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUser);
    });
  });

  describe('softDelete', () => {
    it('should soft delete a user', async () => {
      const deletedUser = { ...mockUser, status: UserStatus.DELETED };
      mockUsersService.softDelete.mockResolvedValue(deletedUser);

      const result = await controller.softDelete(1);

      expect(service.softDelete).toHaveBeenCalledWith(1);
      expect(result).toEqual(deletedUser);
    });
  });

  describe('lockUser', () => {
    it('should lock a user', async () => {
      const reason = 'Suspicious activity';
      const lockedUser = { ...mockUser, isLocked: true, lockReason: reason };
      mockUsersService.lockUser.mockResolvedValue(lockedUser);

      const result = await controller.lockUser(1, reason);

      expect(service.lockUser).toHaveBeenCalledWith(1, reason);
      expect(result).toEqual(lockedUser);
    });
  });

  describe('unlockUser', () => {
    it('should unlock a user', async () => {
      const unlockedUser = { ...mockUser, isLocked: false, lockReason: null };
      mockUsersService.unlockUser.mockResolvedValue(unlockedUser);

      const result = await controller.unlockUser(1);

      expect(service.unlockUser).toHaveBeenCalledWith(1);
      expect(result).toEqual(unlockedUser);
    });
  });

  describe('verifyEmail', () => {
    it('should verify user email', async () => {
      const verifiedUser = { ...mockUser, emailVerified: true };
      mockUsersService.verifyEmail.mockResolvedValue(verifiedUser);

      const result = await controller.verifyEmail(1);

      expect(service.verifyEmail).toHaveBeenCalledWith(1);
      expect(result).toEqual(verifiedUser);
    });
  });

  describe('getStats', () => {
    it('should return user statistics', async () => {
      const stats = {
        totalUsers: 100,
        activeUsers: 90,
        recentUsers: 10,
        lockedUsers: 5,
      };
      mockUsersService.getUserStats.mockResolvedValue(stats);

      const result = await controller.getStats();

      expect(service.getUserStats).toHaveBeenCalled();
      expect(result).toEqual(stats);
    });
  });
});
