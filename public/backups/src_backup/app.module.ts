import { Module } from '@/utils/core';
import { TestController } from '@/controllers/test.controller';
import { ExampleController } from '@/controllers/example.controller';
import { ExampleService } from '@/services/example.service';
import { loggerMiddleware } from '@/middlewares/logger.middleware';
import { FeatureModule } from '@/examples/features/feature.module';
import { TodoModule } from '@/examples/todos/todo.module';
import { ProtectedModule } from '@/examples/protected/protected.module';
import { LifecycleModule } from '@/examples/lifecycle/lifecycle.module';
import { EventsModule } from '@/examples/events/events.module';
import { SchedulerModule } from '@/examples/scheduler/scheduler.module';
import type { OnModuleInit, OnApplicationBootstrap } from '@/interfaces/lifecycle.interface';

/**
 * Main application module
 */
@Module({
  imports: [
    FeatureModule,
    TodoModule,
    ProtectedModule,
    LifecycleModule,
    EventsModule,
    SchedulerModule,
  ],
  controllers: [TestController, ExampleController],
  middlewares: [loggerMiddleware],
  providers: [ExampleService],
})
export class AppModule implements OnModuleInit, OnApplicationBootstrap {
  /**
   * Called when the module is initialized
   */
  async onModuleInit() {
    console.log('AppModule: onModuleInit - Root module initializing...');
    console.log('AppModule: Root module initialized');
  }

  /**
   * Called after all modules are initialized
   */
  async onApplicationBootstrap() {
    console.log('AppModule: onApplicationBootstrap - Application ready!');
    console.log('================================================');
    console.log('🚀 Application successfully started');
    console.log('================================================');
  }
}
