import { Controller, Get, Post, Body } from '@/utils/core';
import { DatabaseService } from './database.service';
import type { OnModuleInit, OnApplicationBootstrap } from '@/interfaces/lifecycle.interface';

/**
 * Controller demonstrating lifecycle hooks
 */
@Controller('/lifecycle')
export class LifecycleController implements OnModuleInit, OnApplicationBootstrap {
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * Called when the module is initialized
   */
  async onModuleInit() {
    console.log('LifecycleController: onModuleInit - Controller initializing...');
    // Register initial data or setup routes logic
    console.log('LifecycleController: Controller initialized');
  }

  /**
   * Called after all modules are initialized
   */
  async onApplicationBootstrap() {
    console.log('LifecycleController: onApplicationBootstrap - Setting up initial data...');

    // Initialize with some data after database is connected
    try {
      this.databaseService.save('appStart', new Date().toISOString());
      this.databaseService.save('config', {
        environment: 'development',
        version: '1.0.0',
      });
      console.log('LifecycleController: Initial data set up');
    } catch (error) {
      console.error('LifecycleController: Error setting up initial data', error);
    }
  }

  /**
   * Get the database status
   */
  @Get('/status')
  getStatus() {
    return {
      success: true,
      connected: this.databaseService.isConnectionActive(),
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Get data by key
   */
  @Get('/data/:key')
  getData({ params }: { params: { key: string } }) {
    try {
      const data = this.databaseService.get(params.key);

      if (data === undefined) {
        return {
          success: false,
          message: `No data found for key: ${params.key}`,
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Save data by key
   */
  @Post('/data')
  saveData({ body }: { body: { key: string; value: any } }) {
    try {
      this.databaseService.save(body.key, body.value);

      return {
        success: true,
        message: `Data saved for key: ${body.key}`,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
