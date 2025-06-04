import { Module } from '@/utils/core';
import { SchedulerDemoController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskAnalyticsService } from './task-analytics.service';

@Module({
  controllers: [SchedulerDemoController],
  providers: [TasksService, TaskAnalyticsService],
})
export class SchedulerModule {}
