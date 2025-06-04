# popa

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.10. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

# Popa Application

## Decorator-Based Controller Pattern

We've implemented a NestJS-inspired decorator pattern for controllers. Here's how to use it:

### Creating a Controller

```typescript
import { Controller, Get, Post } from '@/utils/core';

@Controller('/users')
export class UserController {
  @Get('/')
  async getUsers({ set, render }) {
    set.headers['Content-Type'] = 'text/html';
    return render('users/index.hbs', { users: [] });
  }

  @Post('/')
  async createUser({ body }) {
    // Handle user creation
    return { success: true };
  }

  @Get('/:id')
  async getUser({ params }) {
    return { id: params.id };
  }
}
```

### Module System

We've added a NestJS-inspired module system for grouping controllers and applying middlewares:

```typescript
import { Module } from '@/utils/core';
import { UserController } from './user.controller';
import { AuthController } from './auth.controller';
import { loggerMiddleware } from './middlewares/logger.middleware';

@Module({
  prefix: '/api/v1', // Optional prefix for all controllers in this module
  middlewares: [loggerMiddleware], // Optional middlewares to apply
  controllers: [UserController, AuthController] // Required controllers to include
})
export class AppModule {}
```

### Using Modules in main.ts

```typescript
import { Elysia } from 'elysia';
import { Factory } from '@/utils/core';
import { AppModule } from './modules/app.module';

const app = new Elysia()
  .use(Factory(AppModule));

app.listen(3000);
```

### Module Decorator Options

- `prefix` (optional): A string prefix applied to all routes in the module
- `middlewares` (optional): An array of middleware functions to apply
- `controllers` (required): An array of controller classes to include in the module

### Available Decorators

- `@Controller(prefix: string)` - Defines a controller with a route prefix
- `@Get(path: string)` - Defines a GET endpoint
- `@Post(path: string)` - Defines a POST endpoint
- `@Put(path: string)` - Defines a PUT endpoint
- `@Delete(path: string)` - Defines a DELETE endpoint
- `@Patch(path: string)` - Defines a PATCH endpoint
- `@Module(options)` - Groups controllers and applies middlewares

### Benefits

1. **Cleaner structure** - Class-based controllers organize related endpoints
2. **TypeScript support** - Better typing with class methods
3. **Improved organization** - Decorators make the code more readable and maintainable
4. **NestJS-like approach** - Familiar pattern for developers coming from NestJS
5. **Modular architecture** - Group related controllers and apply middleware in modules

# NestJS-Inspired Features for Elysia Framework

This project implements a set of advanced features inspired by NestJS for an Elysia-based web framework, creating a robust, modular structure for building scalable applications.

## Core Features

### 1. Interceptors
- Request/response interception with `@UseInterceptors` and `@UseResponseInterceptors` decorators
- Transform or modify incoming requests and outgoing responses
- Apply interceptors at controller or method level

### 2. Exception Filters
- Centralized exception handling with `@UseFilters` decorator
- Custom exception classes (HttpException, BadRequestException, etc.)
- Consistent error response format

### 3. Pipes
- Parameter transformation with `@UsePipes` decorator
- Included pipes: ValidationPipe, ParseIntPipe, etc.
- Easy to create custom pipes implementing the `PipeTransform` interface

### 4. Guards
- Route protection with `@UseGuards` decorator
- Built-in authorization with `@Roles` decorator
- Configurable guard behavior based on context

### 5. Lifecycle Hooks
- Component lifecycle management
- Supported hooks: OnModuleInit, OnApplicationBootstrap, etc.
- Graceful application shutdown with BeforeApplicationShutdown, OnApplicationShutdown

### 6. Event Emitters
- Event-based communication between components
- Decorators for event handling: `@EventSubscriber`, `@OnEvent`
- Support for one-time event handlers

### 7. Task Scheduler
- Cron-style scheduled tasks with `@Cron` decorator
- Interval-based recurring tasks with `@Interval` decorator
- One-time delayed execution with `@Timeout` and `@ScheduleAt` decorators
- Programmatic task scheduling and cancellation

## Architecture

```
src/
├── utils/                # Core utilities
├── interceptors/         # Interceptor interfaces and base implementations
├── exceptions/           # Exception classes and filters
├── pipes/                # Data transformation and validation pipes
├── guards/               # Authorization and protection guards
├── interfaces/           # Lifecycle and other interfaces
├── events/               # Event emitter system
├── scheduler/            # Task scheduling system
└── examples/             # Example implementations
    ├── features/         # Basic feature examples
    ├── todos/            # Todo application example
    ├── protected/        # Guard usage examples
    ├── lifecycle/        # Lifecycle hook examples
    ├── events/           # Event emitter examples
    └── scheduler/        # Task scheduling examples
```

## Example Usage

### Creating a Module

```typescript
@Module({
  imports: [OtherModule],
  controllers: [ExampleController],
  providers: [ExampleService],
  middlewares: [loggerMiddleware],
})
export class ExampleModule {}
```

### Creating a Controller

```typescript
@Controller('/example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}
  
  @Get('/items')
  @UseGuards(AuthGuard)
  @UseInterceptors(LoggingInterceptor)
  getItems() {
    return this.exampleService.getItems();
  }
  
  @Post('/items')
  @UsePipes(ValidationPipe)
  createItem(@Body() createItemDto: CreateItemDto) {
    return this.exampleService.createItem(createItemDto);
  }
}
```

### Event-based Communication

```typescript
@Injectable()
@EventSubscriber()
export class NotificationService {
  @OnEvent('user.created')
  handleUserCreated(payload: { user: User }) {
    console.log(`New user created: ${payload.user.name}`);
    // Send welcome email
  }
}
```

### Scheduled Tasks

```typescript
@Injectable()
export class TasksService {
  @Cron(CronExpressions.EVERY_HOUR)
  runHourlyTask() {
    console.log('Running hourly task');
    // Process data or perform periodic cleanup
  }
  
  @Interval(30000)
  runEvery30Seconds() {
    console.log('Running every 30 seconds');
    // Update cache or fetch external data
  }
}
```

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Visit http://localhost:3000/swagger for API documentation

## Documentation

- [Interceptors & Pipes](./src/INTERCEPTORS_PIPES_EXCEPTIONS.md)
- [Lifecycle Hooks](./src/LIFECYCLE_HOOKS.md)
- [Event Emitter System](./src/EVENT_EMITTER.md)
- [Task Scheduler System](./src/scheduler/SCHEDULER.md)
