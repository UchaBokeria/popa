import { Repository } from 'typeorm';
import { AppDataSource } from '../utils/database/database';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto, UserResponseDto } from '../dtos/user.dto';
import { plainToInstance } from 'class-transformer';

export abstract class userService {
  private static get userRepository(): Repository<UserEntity> {
    return AppDataSource.getRepository(UserEntity);
  }

  static async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();
    return plainToInstance(UserResponseDto, users);
  }

  static async findOne(id: string): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return null;
    return plainToInstance(UserResponseDto, user);
  }

  static async findByUsername(username: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  static async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  static async findById(id: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  static async update(id: string, userData: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }

    // If updating username, check if it's already taken
    if (userData.username && userData.username !== user.username) {
      const existingByUsername = await this.findByUsername(userData.username);
      if (existingByUsername) {
        throw new Error('Username already taken');
      }
    }

    // If updating email, check if it's already registered
    if (userData.email && userData.email !== user.email) {
      const existingByEmail = await this.findByEmail(userData.email);
      if (existingByEmail) {
        throw new Error('Email already registered');
      }
    }

    // If updating password, hash it
    if (userData.password) {
      // Password hashing is moved to AuthService
      throw new Error('Password updates should be handled through the AuthService');
    }

    // Update user
    await this.userRepository.update(id, userData);
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    return plainToInstance(UserResponseDto, updatedUser);
  }

  static async delete(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
}
