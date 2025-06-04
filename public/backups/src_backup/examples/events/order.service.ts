import { Injectable } from '@/utils/core';
import { getEventEmitter } from '@/events/event-emitter.container';
import { AppEvents } from './events.constant';

/**
 * Order status enum
 */
export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

/**
 * Order entity
 */
export interface Order {
  id: number;
  userId: number;
  amount: number;
  status: OrderStatus;
  items: OrderItem[];
  createdAt: Date;
  updatedAt?: Date;
}

/**
 * Order item
 */
export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
}

/**
 * Input for creating an order
 */
export interface CreateOrderInput {
  userId: number;
  items: {
    productId: number;
    quantity: number;
    price: number;
  }[];
}

/**
 * Service for managing orders
 */
@Injectable()
export class OrderService {
  private readonly orders: Map<number, Order> = new Map();
  private orderId = 1;
  private orderItemId = 1;

  constructor() {
    // Set up event listeners for specific orders as they're created
    this.setupEventListeners();
  }

  /**
   * Set up event listeners for order flow
   */
  private setupEventListeners() {
    // This demonstrates manually setting up event listeners
    // (as opposed to using decorators)
    const eventEmitter = getEventEmitter();

    // Listen for any order being placed and log it
    eventEmitter.on(AppEvents.ORDER_PLACED, (payload: { order: Order }) => {
      console.log(
        `[OrderService] New order placed: #${payload.order.id} for user ${payload.order.userId} ` +
          `with ${payload.order.items.length} items totaling $${payload.order.amount}`
      );
    });
  }

  /**
   * Create a new order
   */
  async createOrder(input: CreateOrderInput): Promise<Order> {
    const id = this.orderId++;
    const now = new Date();

    // Create order items
    const items: OrderItem[] = input.items.map((item) => ({
      id: this.orderItemId++,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    // Calculate total amount
    const amount = items.reduce((total, item) => total + item.price * item.quantity, 0);

    const order: Order = {
      id,
      userId: input.userId,
      amount,
      status: OrderStatus.PENDING,
      items,
      createdAt: now,
    };

    this.orders.set(id, order);

    // Emit an event when an order is placed
    await getEventEmitter().emit(AppEvents.ORDER_PLACED, { order });

    // Set up one-time event listeners specific to this order
    this.setupOrderSpecificListeners(id);

    return order;
  }

  /**
   * Set up order-specific event listeners
   */
  private setupOrderSpecificListeners(orderId: number) {
    const eventEmitter = getEventEmitter();

    // When this specific order is paid, automatically move to shipped status
    // This is a one-time subscription that will be auto-removed after firing
    eventEmitter.once(AppEvents.ORDER_PAID, async (payload: { orderId: number }) => {
      if (payload.orderId === orderId) {
        console.log(`[OrderService] Order #${orderId} has been paid, preparing for shipment...`);

        // Wait a moment then ship the order
        setTimeout(async () => {
          await this.shipOrder(orderId);
        }, 2000);
      }
    });

    // When this specific order is shipped, mark as delivered after a delay
    // This is a one-time subscription that will be auto-removed after firing
    eventEmitter.once(AppEvents.ORDER_SHIPPED, async (payload: { orderId: number }) => {
      if (payload.orderId === orderId) {
        console.log(`[OrderService] Order #${orderId} has been shipped, will be delivered soon...`);

        // Wait a moment then complete the order
        setTimeout(async () => {
          await this.markAsDelivered(orderId);
        }, 3000);
      }
    });
  }

  /**
   * Mark an order as paid
   */
  async markAsPaid(id: number): Promise<Order> {
    const order = this.orders.get(id);

    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }

    // Update order status
    const updatedOrder: Order = {
      ...order,
      status: OrderStatus.PAID,
      updatedAt: new Date(),
    };

    this.orders.set(id, updatedOrder);

    // Emit an event when an order is paid
    await getEventEmitter().emit(AppEvents.ORDER_PAID, {
      orderId: id,
      order: updatedOrder,
    });

    return updatedOrder;
  }

  /**
   * Ship an order
   */
  async shipOrder(id: number): Promise<Order> {
    const order = this.orders.get(id);

    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }

    if (order.status !== OrderStatus.PAID) {
      throw new Error(`Order ${id} must be paid before shipping`);
    }

    // Update order status
    const updatedOrder: Order = {
      ...order,
      status: OrderStatus.SHIPPED,
      updatedAt: new Date(),
    };

    this.orders.set(id, updatedOrder);

    // Emit an event when an order is shipped
    await getEventEmitter().emit(AppEvents.ORDER_SHIPPED, {
      orderId: id,
      order: updatedOrder,
    });

    return updatedOrder;
  }

  /**
   * Mark an order as delivered
   */
  async markAsDelivered(id: number): Promise<Order> {
    const order = this.orders.get(id);

    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }

    if (order.status !== OrderStatus.SHIPPED) {
      throw new Error(`Order ${id} must be shipped before marking as delivered`);
    }

    // Update order status
    const updatedOrder: Order = {
      ...order,
      status: OrderStatus.DELIVERED,
      updatedAt: new Date(),
    };

    this.orders.set(id, updatedOrder);

    // Emit an event when an order is completed
    await getEventEmitter().emit(AppEvents.ORDER_COMPLETED, {
      orderId: id,
      order: updatedOrder,
    });

    return updatedOrder;
  }

  /**
   * Get an order by ID
   */
  getOrder(id: number): Order | undefined {
    return this.orders.get(id);
  }

  /**
   * Get all orders for a user
   */
  getUserOrders(userId: number): Order[] {
    return Array.from(this.orders.values())
      .filter((order) => order.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}
