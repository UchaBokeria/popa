import { Injectable } from '@/utils/core';
import { EventSubscriber, OnEvent } from '@/events/event.decorators';
import { AppEvents } from './events.constant';
import { getEventEmitter } from '@/events/event-emitter.container';
import type { User } from './user.service';

/**
 * Notification model
 */
export interface Notification {
  id: number;
  userId: number;
  message: string;
  type: string;
  createdAt: Date;
  read: boolean;
}

/**
 * Service for handling notifications
 */
@Injectable()
@EventSubscriber()
export class NotificationService {
  private readonly notifications: Map<number, Notification> = new Map();
  private notificationId = 1;

  /**
   * Handle user creation events
   */
  @OnEvent(AppEvents.USER_CREATED)
  async handleUserCreated(payload: { user: User }): Promise<void> {
    const { user } = payload;

    await this.createNotification({
      userId: user.id,
      message: `Welcome to our platform, ${user.name}!`,
      type: 'welcome',
    });

    console.log(`[NotificationService] Sent welcome notification to user ${user.id}`);
  }

  /**
   * Handle user update events
   */
  @OnEvent(AppEvents.USER_UPDATED)
  async handleUserUpdated(payload: { user: User; changes: any }): Promise<void> {
    const { user, changes } = payload;

    const changedFields = Object.keys(changes).filter((key) => changes[key] !== undefined);

    if (changedFields.length > 0) {
      await this.createNotification({
        userId: user.id,
        message: `Your profile has been updated. Changed fields: ${changedFields.join(', ')}`,
        type: 'profile_update',
      });

      console.log(`[NotificationService] Sent profile update notification to user ${user.id}`);
    }
  }

  /**
   * Create a notification and emit an event
   */
  async createNotification(data: {
    userId: number;
    message: string;
    type: string;
  }): Promise<Notification> {
    const id = this.notificationId++;

    const notification: Notification = {
      id,
      userId: data.userId,
      message: data.message,
      type: data.type,
      createdAt: new Date(),
      read: false,
    };

    this.notifications.set(id, notification);

    // Emit notification sent event
    await getEventEmitter().emit(AppEvents.NOTIFICATION_SENT, { notification });

    return notification;
  }

  /**
   * Mark a notification as read
   */
  markAsRead(id: number): boolean {
    const notification = this.notifications.get(id);

    if (!notification) {
      return false;
    }

    notification.read = true;
    this.notifications.set(id, notification);

    return true;
  }

  /**
   * Get all notifications for a user
   */
  getUserNotifications(userId: number): Notification[] {
    return Array.from(this.notifications.values())
      .filter((notification) => notification.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  /**
   * Get unread count for a user
   */
  getUnreadCount(userId: number): number {
    return this.getUserNotifications(userId).filter((notification) => !notification.read).length;
  }
}
