import { Injectable } from '@/utils/core';
import { getEventEmitter } from '@/events/event-emitter.container';
import { AppEvents } from './events.constant';

/**
 * User entity
 */
export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt?: Date;
}

/**
 * Input for creating a user
 */
export interface CreateUserInput {
  name: string;
  email: string;
}

/**
 * Input for updating a user
 */
export interface UpdateUserInput {
  name?: string;
  email?: string;
}

/**
 * Service for managing user data
 */
@Injectable()
export class UserService {
  private readonly users: Map<number, User> = new Map();
  private userId = 1;

  /**
   * Create a new user
   */
  async createUser(input: CreateUserInput): Promise<User> {
    const id = this.userId++;
    const now = new Date();

    const user: User = {
      id,
      name: input.name,
      email: input.email,
      createdAt: now,
    };

    this.users.set(id, user);

    // Emit an event when a user is created
    await getEventEmitter().emit(AppEvents.USER_CREATED, { user });

    return user;
  }

  /**
   * Update an existing user
   */
  async updateUser(id: number, input: UpdateUserInput): Promise<User> {
    const user = this.users.get(id);

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    const updatedUser: User = {
      ...user,
      ...(input.name ? { name: input.name } : {}),
      ...(input.email ? { email: input.email } : {}),
      updatedAt: new Date(),
    };

    this.users.set(id, updatedUser);

    // Emit an event when a user is updated
    await getEventEmitter().emit(AppEvents.USER_UPDATED, {
      user: updatedUser,
      changes: input,
    });

    return updatedUser;
  }

  /**
   * Delete a user by ID
   */
  async deleteUser(id: number): Promise<boolean> {
    const user = this.users.get(id);

    if (!user) {
      return false;
    }

    // Delete the user
    this.users.delete(id);

    // Emit an event when a user is deleted
    await getEventEmitter().emit(AppEvents.USER_DELETED, { user });

    return true;
  }

  /**
   * Get a user by ID
   */
  getUser(id: number): User | undefined {
    return this.users.get(id);
  }

  /**
   * Get all users
   */
  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }
}
