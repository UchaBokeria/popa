import { Injectable } from '@/utils/core';
import { Cron, Interval, Timeout, ScheduleAt, CronExpressions, getScheduler } from '@/scheduler';
import { OnModuleInit } from '@/interfaces/lifecycle.interface';
import { getEventEmitter } from '@/events/event-emitter.container';

/**
 * Example tasks constants
 */
export enum TaskEvents {
  TASK_EXECUTED = 'task.executed',
  TASK_FAILED = 'task.failed',
  TASK_CANCELED = 'task.canceled',
}

/**
 * Service demonstrating various scheduling patterns
 */
@Injectable()
export class TasksService implements OnModuleInit {
  /**
   * Task names
   */
  private readonly taskNames = {
    dynamicCronTask: 'dynamicCron',
    dynamicIntervalTask: 'dynamicInterval',
    dynamicTimeoutTask: 'dynamicTimeout',
    eventTriggeredTask: 'eventTriggered',
  };

  /**
   * Task success counter
   */
  private tasksExecuted = 0;

  /**
   * Initialize service when module is ready
   */
  async onModuleInit() {
    console.log('[TasksService] Initializing scheduled tasks');

    // Set up dynamic tasks
    this.setupDynamicTasks();

    // Set up event-triggered tasks
    this.setupEventTriggeredTasks();
  }

  /**
   * Run every 10 seconds with a named cron job
   */
  @Cron(CronExpressions.EVERY_10_SECONDS, { name: 'every10Seconds' })
  async handleCron() {
    this.tasksExecuted++;
    console.log(
      `[TasksService] Cron task executed at ${new Date().toISOString()} - ` +
        `Tasks executed: ${this.tasksExecuted}`
    );

    // Emit task executed event
    await getEventEmitter().emit(TaskEvents.TASK_EXECUTED, {
      taskType: 'cron',
      taskName: 'every10Seconds',
      executedAt: new Date(),
    });
  }

  /**
   * Run every 30 seconds using milliseconds
   */
  @Interval(30000, { name: 'every30Seconds' })
  async handleInterval() {
    this.tasksExecuted++;
    console.log(
      `[TasksService] Interval task executed at ${new Date().toISOString()} - ` +
        `Tasks executed: ${this.tasksExecuted}`
    );

    // Emit task executed event
    await getEventEmitter().emit(TaskEvents.TASK_EXECUTED, {
      taskType: 'interval',
      taskName: 'every30Seconds',
      executedAt: new Date(),
    });
  }

  /**
   * Run once 5 seconds after application startup
   */
  @Timeout(5000, { name: 'after5Seconds' })
  async handleOneTimeTask() {
    this.tasksExecuted++;
    console.log(
      `[TasksService] One-time task executed at ${new Date().toISOString()} - ` +
        `Tasks executed: ${this.tasksExecuted}`
    );

    // Emit task executed event
    await getEventEmitter().emit(TaskEvents.TASK_EXECUTED, {
      taskType: 'timeout',
      taskName: 'after5Seconds',
      executedAt: new Date(),
    });
  }

  /**
   * Run at a specific date (1 minute from now)
   */
  @ScheduleAt(new Date(Date.now() + 60000), { name: 'specificDate' })
  async handleScheduledDate() {
    this.tasksExecuted++;
    console.log(
      `[TasksService] Date-scheduled task executed at ${new Date().toISOString()} - ` +
        `Tasks executed: ${this.tasksExecuted}`
    );

    // Emit task executed event
    await getEventEmitter().emit(TaskEvents.TASK_EXECUTED, {
      taskType: 'date',
      taskName: 'specificDate',
      executedAt: new Date(),
    });
  }

  /**
   * Get task statistics
   */
  getTaskStats() {
    return {
      tasksExecuted: this.tasksExecuted,
      activeTasks: getScheduler()
        .getTasks()
        .map((task) => ({
          id: task.id,
          name: task.name,
        })),
    };
  }

  /**
   * Set up dynamic tasks using the programmatic API
   */
  private setupDynamicTasks() {
    const scheduler = getScheduler();

    // Schedule a dynamic cron task (every minute)
    scheduler.scheduleCron(
      CronExpressions.EVERY_MINUTE,
      async () => {
        this.tasksExecuted++;
        console.log(`[TasksService] Dynamic cron task executed at ${new Date().toISOString()}`);

        await getEventEmitter().emit(TaskEvents.TASK_EXECUTED, {
          taskType: 'cron',
          taskName: this.taskNames.dynamicCronTask,
          executedAt: new Date(),
        });
      },
      { name: this.taskNames.dynamicCronTask }
    );

    // Schedule a dynamic interval task (every 45 seconds)
    const intervalTask = scheduler.scheduleInterval(
      45000,
      async () => {
        this.tasksExecuted++;
        console.log(`[TasksService] Dynamic interval task executed at ${new Date().toISOString()}`);

        await getEventEmitter().emit(TaskEvents.TASK_EXECUTED, {
          taskType: 'interval',
          taskName: this.taskNames.dynamicIntervalTask,
          executedAt: new Date(),
        });
      },
      { name: this.taskNames.dynamicIntervalTask }
    );

    // Schedule a dynamic timeout task (after 15 seconds)
    scheduler.scheduleTimeout(
      15000,
      async () => {
        this.tasksExecuted++;
        console.log(`[TasksService] Dynamic timeout task executed at ${new Date().toISOString()}`);

        await getEventEmitter().emit(TaskEvents.TASK_EXECUTED, {
          taskType: 'timeout',
          taskName: this.taskNames.dynamicTimeoutTask,
          executedAt: new Date(),
        });

        // Cancel the interval task after this runs
        intervalTask.cancel();
        console.log(`[TasksService] Canceled task: ${intervalTask.name}`);

        await getEventEmitter().emit(TaskEvents.TASK_CANCELED, {
          taskType: 'interval',
          taskName: intervalTask.name,
          canceledAt: new Date(),
        });
      },
      { name: this.taskNames.dynamicTimeoutTask }
    );
  }

  /**
   * Set up event-triggered tasks
   */
  private setupEventTriggeredTasks() {
    const eventEmitter = getEventEmitter();
    const scheduler = getScheduler();

    // When a task fails, schedule a retry after 5 seconds
    eventEmitter.on(TaskEvents.TASK_FAILED, (payload: { taskName: string }) => {
      console.log(`[TasksService] Task ${payload.taskName} failed, scheduling retry`);

      scheduler.scheduleTimeout(
        5000,
        async () => {
          this.tasksExecuted++;
          console.log(
            `[TasksService] Retry for task ${payload.taskName} at ${new Date().toISOString()}`
          );

          await getEventEmitter().emit(TaskEvents.TASK_EXECUTED, {
            taskType: 'retry',
            taskName: `${payload.taskName}-retry`,
            executedAt: new Date(),
          });
        },
        { name: `${payload.taskName}-retry` }
      );
    });
  }

  /**
   * Simulate a task failure (used for demos)
   */
  simulateTaskFailure(taskName: string) {
    console.log(`[TasksService] Simulating failure for task: ${taskName}`);

    getEventEmitter().emit(TaskEvents.TASK_FAILED, {
      taskName,
      failedAt: new Date(),
    });

    return { success: true, message: `Simulated failure for task: ${taskName}` };
  }
}
