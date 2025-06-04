import { Controller, Get, Post, Body } from '@/utils/core';
import { UserService } from './user.service';
import type { CreateUserInput, UpdateUserInput } from './user.service';
import { OrderService } from './order.service';
import type { CreateOrderInput } from './order.service';
import { NotificationService } from './notification.service';
import { AnalyticsService } from './analytics.service';

/**
 * Controller for demonstrating the event-based system
 */
@Controller('/events-demo')
export class EventsDemoController {
  constructor(
    private readonly userService: UserService,
    private readonly orderService: OrderService,
    private readonly notificationService: NotificationService,
    private readonly analyticsService: AnalyticsService
  ) {}
  
  /**
   * Get all metrics
   */
  @Get('/metrics')
  getMetrics() {
    return {
      success: true,
      data: this.analyticsService.getMetrics()
    };
  }
  
  /**
   * Run a demonstration scenario
   */
  @Post('/demo')
  async runDemo() {
    // Step 1: Create a user
    const user = await this.userService.createUser({
      name: 'John Doe',
      email: 'john.doe@example.com'
    });
    
    // Step 2: Update the user (triggers events)
    await this.userService.updateUser(user.id, {
      name: 'John Smith'
    });
    
    // Step 3: Create an order (triggers events)
    const order = await this.orderService.createOrder({
      userId: user.id,
      items: [
        { productId: 1, quantity: 2, price: 29.99 },
        { productId: 2, quantity: 1, price: 49.99 }
      ]
    });
    
    // Step 4: Mark the order as paid (triggers events)
    await this.orderService.markAsPaid(order.id);
    
    // Step 5: Get all notifications for the user
    const notifications = this.notificationService.getUserNotifications(user.id);
    
    return {
      success: true,
      message: 'Demo scenario executed successfully',
      data: {
        user,
        order,
        notifications,
        metrics: this.analyticsService.getMetrics()
      }
    };
  }
  
  /**
   * Create a new user
   */
  @Post('/users')
  async createUser(@Body() input: CreateUserInput) {
    const user = await this.userService.createUser(input);
    
    return {
      success: true,
      data: user
    };
  }
  
  /**
   * Update a user
   */
  @Post('/users/:id')
  async updateUser(
    @Body() { id, ...input }: UpdateUserInput & { id: number }
  ) {
    const user = await this.userService.updateUser(id, input);
    
    return {
      success: true,
      data: user
    };
  }
  
  /**
   * Create a new order
   */
  @Post('/orders')
  async createOrder(@Body() input: CreateOrderInput) {
    const order = await this.orderService.createOrder(input);
    
    return {
      success: true,
      data: order
    };
  }
  
  /**
   * Mark an order as paid
   */
  @Post('/orders/:id/pay')
  async payOrder(@Body() { id }: { id: number }) {
    const order = await this.orderService.markAsPaid(id);
    
    return {
      success: true,
      data: order
    };
  }
  
  /**
   * Get notifications for a user
   */
  @Get('/users/:id/notifications')
  getUserNotifications({ params }: { params: { id: string } }) {
    const userId = parseInt(params.id, 10);
    const notifications = this.notificationService.getUserNotifications(userId);
    
    return {
      success: true,
      data: notifications
    };
  }
} 