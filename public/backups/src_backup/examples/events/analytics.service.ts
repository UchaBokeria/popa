import { Injectable } from '@/utils/core';
import { EventSubscriber, OnEvent } from '@/events/event.decorators';
import { AppEvents } from './events.constant';
import type { User } from './user.service';
import type { Order } from './order.service';
import type { Notification } from './notification.service';

/**
 * Metrics record type
 */
interface Metrics {
  usersCreated: number;
  usersUpdated: number;
  usersDeleted: number;
  ordersPlaced: number;
  ordersPaid: number;
  ordersShipped: number;
  ordersCompleted: number;
  notificationsSent: number;
  eventCounts: Record<string, number>;
  totalRevenue: number;
}

/**
 * Service for tracking analytics across the system
 */
@Injectable()
@EventSubscriber()
export class AnalyticsService {
  private readonly metrics: Metrics = {
    usersCreated: 0,
    usersUpdated: 0,
    usersDeleted: 0,
    ordersPlaced: 0,
    ordersPaid: 0,
    ordersShipped: 0,
    ordersCompleted: 0,
    notificationsSent: 0,
    eventCounts: {},
    totalRevenue: 0,
  };

  /**
   * Get current metrics
   */
  getMetrics(): Metrics {
    return { ...this.metrics };
  }

  /**
   * Track an event count
   */
  private trackEvent(event: string): void {
    if (!this.metrics.eventCounts[event]) {
      this.metrics.eventCounts[event] = 0;
    }

    this.metrics.eventCounts[event]++;
  }

  /* Event Handlers */

  @OnEvent(AppEvents.USER_CREATED)
  handleUserCreated(payload: { user: User }): void {
    this.metrics.usersCreated++;
    this.trackEvent(AppEvents.USER_CREATED);
    console.log(`[AnalyticsService] Tracked user creation for user ${payload.user.id}`);
  }

  @OnEvent(AppEvents.USER_UPDATED)
  handleUserUpdated(payload: { user: User }): void {
    this.metrics.usersUpdated++;
    this.trackEvent(AppEvents.USER_UPDATED);
    console.log(`[AnalyticsService] Tracked user update for user ${payload.user.id}`);
  }

  @OnEvent(AppEvents.USER_DELETED)
  handleUserDeleted(payload: { user: User }): void {
    this.metrics.usersDeleted++;
    this.trackEvent(AppEvents.USER_DELETED);
    console.log(`[AnalyticsService] Tracked user deletion for user ${payload.user.id}`);
  }

  @OnEvent(AppEvents.ORDER_PLACED)
  handleOrderPlaced(payload: { order: Order }): void {
    this.metrics.ordersPlaced++;
    this.trackEvent(AppEvents.ORDER_PLACED);
    console.log(`[AnalyticsService] Tracked new order ${payload.order.id}`);
  }

  @OnEvent(AppEvents.ORDER_PAID)
  handleOrderPaid(payload: { order: Order }): void {
    this.metrics.ordersPaid++;
    this.metrics.totalRevenue += payload.order.amount;
    this.trackEvent(AppEvents.ORDER_PAID);
    console.log(
      `[AnalyticsService] Tracked payment for order ${payload.order.id}, amount: $${payload.order.amount}`
    );
  }

  @OnEvent(AppEvents.ORDER_SHIPPED)
  handleOrderShipped(payload: { order: Order }): void {
    this.metrics.ordersShipped++;
    this.trackEvent(AppEvents.ORDER_SHIPPED);
    console.log(`[AnalyticsService] Tracked shipment for order ${payload.order.id}`);
  }

  @OnEvent(AppEvents.ORDER_COMPLETED)
  handleOrderCompleted(payload: { order: Order }): void {
    this.metrics.ordersCompleted++;
    this.trackEvent(AppEvents.ORDER_COMPLETED);
    console.log(`[AnalyticsService] Tracked completion for order ${payload.order.id}`);
  }

  @OnEvent(AppEvents.NOTIFICATION_SENT)
  handleNotificationSent(payload: { notification: Notification }): void {
    this.metrics.notificationsSent++;
    this.trackEvent(AppEvents.NOTIFICATION_SENT);
    console.log(
      `[AnalyticsService] Tracked notification ${payload.notification.id} sent to user ${payload.notification.userId}`
    );
  }
}
