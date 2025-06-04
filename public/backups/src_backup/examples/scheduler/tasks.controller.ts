import { Controller, Get, Post, Body } from '@/utils/core';
import { TasksService } from './tasks.service';
import { getScheduler } from '@/scheduler';

/**
 * Controller for demonstrating the scheduler system
 */
@Controller('/scheduler-demo')
export class SchedulerDemoController {
  constructor(private readonly tasksService: TasksService) {}
  
  /**
   * Get current task statistics
   */
  @Get('/stats')
  getTaskStats() {
    return {
      success: true,
      data: this.tasksService.getTaskStats()
    };
  }
  
  /**
   * Get active tasks
   */
  @Get('/tasks')
  getTasks() {
    const scheduler = getScheduler();
    const tasks = scheduler.getTasks().map(task => ({
      id: task.id,
      name: task.name,
      status: task.isCanceled() ? 'canceled' : 'active'
    }));
    
    return {
      success: true,
      data: {
        count: tasks.length,
        tasks
      }
    };
  }
  
  /**
   * Cancel a task by ID
   */
  @Post('/cancel')
  cancelTask(@Body() { taskId }: { taskId: string }) {
    const scheduler = getScheduler();
    const tasks = scheduler.getTasks();
    const task = tasks.find(t => t.id === taskId);
    
    if (!task) {
      return {
        success: false,
        message: `Task with ID ${taskId} not found`
      };
    }
    
    task.cancel();
    
    return {
      success: true,
      message: `Task ${task.name} (${task.id}) canceled successfully`
    };
  }
  
  /**
   * Cancel all tasks
   */
  @Post('/cancel-all')
  cancelAllTasks() {
    const scheduler = getScheduler();
    const taskCount = scheduler.getTasks().length;
    
    scheduler.cancelAllTasks();
    
    return {
      success: true,
      message: `All ${taskCount} tasks canceled successfully`
    };
  }
  
  /**
   * Simulate a task failure
   */
  @Post('/simulate-failure')
  simulateTaskFailure(@Body() { taskName }: { taskName: string }) {
    return this.tasksService.simulateTaskFailure(taskName);
  }
  
  /**
   * Create a one-time task
   */
  @Post('/create-task')
  createTask(@Body() { delayMs, name }: { delayMs: number; name?: string }) {
    const scheduler = getScheduler();
    
    const taskName = name || `ondemand-task-${Date.now()}`;
    
    const task = scheduler.scheduleTimeout(
      delayMs,
      () => console.log(`[SchedulerDemo] On-demand task ${taskName} executed at ${new Date().toISOString()}`),
      { name: taskName }
    );
    
    return {
      success: true,
      message: `Task ${taskName} created successfully`,
      data: {
        taskId: task.id,
        taskName: task.name,
        executionTime: new Date(Date.now() + delayMs).toISOString()
      }
    };
  }
} 