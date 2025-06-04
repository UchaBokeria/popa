import { Repository } from 'typeorm';
import { AppDataSource } from '../utils/database/database';
import { UserEntity } from '../../entities/user.entity';
import { CreateUserDto, UserResponseDto } from '../../app/landing/dtos/user.dto';
import { plainToInstance } from 'class-transformer';
import jwt from 'jsonwebtoken';
import type { Secret, JwtPayload as JwtPayloadBase, SignOptions, Jwt } from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';

// Define a default secret that will be used if environment variable is not set
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_change_in_production';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1d';

// Define JWT payload type
interface JwtPayload extends JwtPayloadBase {
    id: string;
    username: string;
    isAdmin: boolean;
}

export abstract class AuthService {
    private static get userRepository(): Repository<UserEntity> {
        return AppDataSource.getRepository(UserEntity);
    }

    private static async findByUsername(username: string): Promise<UserEntity | null> {
        return this.userRepository.findOne({ where: { username } });
    }

    private static async findByEmail(email: string): Promise<UserEntity | null> {
        return this.userRepository.findOne({ where: { email } });
    }

    static async register(userData: CreateUserDto): Promise<UserResponseDto> {
        // Check if user already exists
        const existingByUsername = await this.findByUsername(userData.username);
        if (existingByUsername) {
            throw new Error('Username already taken');
        }

        const existingByEmail = await this.findByEmail(userData.email);
        if (existingByEmail) {
            throw new Error('Email already registered');
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await hash(userData.password, saltRounds);

        // Create and save user
        const newUser = this.userRepository.create({
            ...userData,
            password: hashedPassword,
        });

        const savedUser = await this.userRepository.save(newUser);
        return plainToInstance(UserResponseDto, savedUser);
    }

    static async login(usernameOrEmail: string, password: string): Promise<{ token: string; user: UserResponseDto } | null> {
        // Find user by username or email
        let user = await this.findByUsername(usernameOrEmail);
        if (!user) {
            user = await this.findByEmail(usernameOrEmail);
        }

        if (!user) {
            return null;
        }

        // Check password
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            return null;
        }

        // Generate JWT token
        const token = this.generateToken(user);

        return {
            token,
            user: plainToInstance(UserResponseDto, user),
        };
    }

    static generateToken(user: UserEntity): string {
        const payload = {
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin,
        };

        // Use the correct typing for JWT sign
        const secret: Secret = JWT_SECRET;
        const options: SignOptions = {
            expiresIn: JWT_EXPIRATION as jwt.SignOptions['expiresIn'],
        };

        return jwt.sign(payload, secret, options);
    }

    static verifyToken(token: string): JwtPayload | null {
        try {
            const secret: Secret = JWT_SECRET;
            return jwt.verify(token, secret) as JwtPayload;
        } catch (error) {
            return null;
        }
    }
}
