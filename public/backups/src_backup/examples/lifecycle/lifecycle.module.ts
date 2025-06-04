import { Module } from '@/utils/core';
import { LifecycleController } from './lifecycle.controller';
import { DatabaseService } from './database.service';
import type {
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
} from '@/interfaces/lifecycle.interface';

/**
 * Module that demonstrates lifecycle hooks
 */
@Module({
  controllers: [LifecycleController],
  providers: [DatabaseService],
})
export class LifecycleModule implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy {
  /**
   * Called when the module is initialized
   */
  async onModuleInit() {
    console.log('LifecycleModule: onModuleInit - Module initializing...');
    // This runs before controllers and providers
    console.log('LifecycleModule: Module initialized');
  }

  /**
   * Called after all modules are initialized
   */
  async onApplicationBootstrap() {
    console.log('LifecycleModule: onApplicationBootstrap - Module bootstrapping...');
    // This runs after all modules, controllers, and providers are initialized
    console.log('LifecycleModule: Module bootstrapped');
  }

  /**
   * Called when the module is being destroyed
   */
  async onModuleDestroy() {
    console.log('LifecycleModule: onModuleDestroy - Module destroying...');
    // This runs when the module is being destroyed
    console.log('LifecycleModule: Module destroyed');
  }
}
