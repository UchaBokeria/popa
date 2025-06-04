import { Injectable } from '@/utils/core';
import type {
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@/interfaces/lifecycle.interface';

/**
 * Example database service with lifecycle hooks
 */
@Injectable()
export class DatabaseService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  private isConnected = false;
  private readonly data: Map<string, any> = new Map();

  /**
   * Called when the module is initialized
   */
  async onModuleInit() {
    console.log('DatabaseService: onModuleInit - Initializing database connection...');
    // Initialize connection pool, configuration, etc.
    await this.delay(500); // Simulate async initialization
    console.log('DatabaseService: Database service initialized.');
  }

  /**
   * Called after all modules are initialized
   */
  async onApplicationBootstrap() {
    console.log('DatabaseService: onApplicationBootstrap - Connecting to database...');
    // Connect to the database after all modules are ready
    this.connect();
    await this.delay(1000); // Simulate connection delay
    console.log('DatabaseService: Connected to database.');
  }

  /**
   * Called when the module is being destroyed
   */
  async onModuleDestroy() {
    console.log('DatabaseService: onModuleDestroy - Cleaning up resources...');
    // Clean up resources specific to this module
    await this.delay(300); // Simulate cleanup
    console.log('DatabaseService: Resources cleaned up.');
  }

  /**
   * Called before the application shuts down
   */
  async beforeApplicationShutdown(signal?: string) {
    console.log(
      `DatabaseService: beforeApplicationShutdown - Preparing for shutdown (signal: ${signal})...`
    );
    // Prepare for shutdown, finish in-flight requests, etc.
    await this.delay(500); // Simulate preparation
    console.log('DatabaseService: Ready for shutdown.');
  }

  /**
   * Called during application shutdown
   */
  async onApplicationShutdown(signal?: string) {
    console.log(
      `DatabaseService: onApplicationShutdown - Closing database connection (signal: ${signal})...`
    );
    // Close database connection
    this.disconnect();
    await this.delay(800); // Simulate disconnection
    console.log('DatabaseService: Database connection closed.');
  }

  /**
   * Connect to the database
   */
  connect() {
    this.isConnected = true;
  }

  /**
   * Disconnect from the database
   */
  disconnect() {
    this.isConnected = false;
    this.data.clear();
  }

  /**
   * Get connection status
   */
  isConnectionActive(): boolean {
    return this.isConnected;
  }

  /**
   * Save data to the database
   */
  save(key: string, value: any): void {
    if (!this.isConnected) {
      throw new Error('Database not connected');
    }
    this.data.set(key, value);
  }

  /**
   * Get data from the database
   */
  get(key: string): any {
    if (!this.isConnected) {
      throw new Error('Database not connected');
    }
    return this.data.get(key);
  }

  /**
   * Helper to simulate async operations
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
