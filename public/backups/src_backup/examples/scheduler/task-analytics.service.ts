import { Injectable } from '@/utils/core';
import { EventSubscriber, OnEvent } from '@/events/event.decorators';
import { TaskEvents } from './tasks.service';
import { Interval } from '@/scheduler';

/**
 * Task analytics record
 */
interface TaskAnalytics {
  tasksExecuted: number;
  tasksExecutedByType: Record<string, number>;
  tasksFailed: number;
  tasksCanceled: number;
  lastExecutedTask: {
    taskName: string;
    taskType: string;
    timestamp: Date;
  } | null;
  lastFailedTask: {
    taskName: string;
    timestamp: Date;
  } | null;
}

/**
 * Service for tracking task metrics
 */
@Injectable()
@EventSubscriber()
export class TaskAnalyticsService {
  /**
   * Analytics data
   */
  private readonly analytics: TaskAnalytics = {
    tasksExecuted: 0,
    tasksExecutedByType: {},
    tasksFailed: 0,
    tasksCanceled: 0,
    lastExecutedTask: null,
    lastFailedTask: null,
  };

  /**
   * Handle task executed events
   */
  @OnEvent(TaskEvents.TASK_EXECUTED)
  handleTaskExecuted(payload: {
    taskType: string;
    taskName: string;
    executedAt: Date;
  }): void {
    this.analytics.tasksExecuted++;

    // Track by type
    const currentCount = this.analytics.tasksExecutedByType[payload.taskType] || 0;
    this.analytics.tasksExecutedByType[payload.taskType] = currentCount + 1;

    // Track last executed
    this.analytics.lastExecutedTask = {
      taskName: payload.taskName,
      taskType: payload.taskType,
      timestamp: payload.executedAt,
    };

    console.log(`[TaskAnalytics] Tracked executed task: ${payload.taskName} (${payload.taskType})`);
  }

  /**
   * Handle task failed events
   */
  @OnEvent(TaskEvents.TASK_FAILED)
  handleTaskFailed(payload: {
    taskName: string;
    failedAt: Date;
  }): void {
    this.analytics.tasksFailed++;

    // Track last failed
    this.analytics.lastFailedTask = {
      taskName: payload.taskName,
      timestamp: payload.failedAt,
    };

    console.log(`[TaskAnalytics] Tracked failed task: ${payload.taskName}`);
  }

  /**
   * Handle task canceled events
   */
  @OnEvent(TaskEvents.TASK_CANCELED)
  handleTaskCanceled(): void {
    this.analytics.tasksCanceled++;
    console.log(`[TaskAnalytics] Tracked canceled task`);
  }

  /**
   * Run analytics report every minute
   */
  @Interval(60000, { name: 'analytics-report' })
  generateAnalyticsReport(): void {
    console.log('=== Task Analytics Report ===');
    console.log(`Total tasks executed: ${this.analytics.tasksExecuted}`);
    console.log('Tasks by type:');

    Object.entries(this.analytics.tasksExecutedByType).forEach(([type, count]) => {
      console.log(`  - ${type}: ${count}`);
    });

    console.log(`Tasks failed: ${this.analytics.tasksFailed}`);
    console.log(`Tasks canceled: ${this.analytics.tasksCanceled}`);

    if (this.analytics.lastExecutedTask) {
      console.log(
        `Last executed: ${this.analytics.lastExecutedTask.taskName} ` +
          `at ${this.analytics.lastExecutedTask.timestamp.toISOString()}`
      );
    }

    console.log('============================');
  }

  /**
   * Get analytics data
   */
  getAnalytics(): TaskAnalytics {
    return { ...this.analytics };
  }
}
