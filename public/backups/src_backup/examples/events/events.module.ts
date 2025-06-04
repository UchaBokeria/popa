import { Module } from '@/utils/core';
import { EventsDemoController } from './events.controller';
import { UserService } from './user.service';
import { OrderService } from './order.service';
import { NotificationService } from './notification.service';
import { AnalyticsService } from './analytics.service';

@Module({
  controllers: [EventsDemoController],
  providers: [UserService, OrderService, NotificationService, AnalyticsService],
})
export class EventsModule {}
