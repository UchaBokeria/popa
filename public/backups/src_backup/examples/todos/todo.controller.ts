import { Controller, Get, Post, Put, Delete, Params, Body, UseInterceptors, UseResponseInterceptors, UseFilters, UsePipes } from '@/utils/core';
import { LoggingInterceptor } from '@/interceptors/logging.interceptor';
import { HttpExceptionFilter } from '@/exceptions/exceptions.filter';
import { ValidationPipe } from '@/pipes/validation.pipe';
import { ParseIntPipe } from '@/pipes/parse-int.pipe';
import { CreateTodoDto, GetTodoDto } from './todo.dto';
import { NotFoundException } from '@/exceptions/not-found.exception';
import { BadRequestException } from '@/exceptions/bad-request.exception';

// Todo type definition
interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

// In-memory todo storage for the example
const todos: Todo[] = [
  { id: 1, title: 'Learn interceptors', completed: false },
  { id: 2, title: 'Learn pipes', completed: false },
  { id: 3, title: 'Learn exception filters', completed: false },
];

/**
 * Controller for handling Todo operations
 * Using both controller-level and method-level interceptors and filters
 */
@Controller('/todos')
@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
export class TodoController {
  /**
   * Get all todos
   */
  @Get()
  async findAll() {
    return {
      success: true,
      data: todos,
    };
  }

  /**
   * Get todo by ID
   * Uses ParseIntPipe to ensure ID is a number
   */
  @Get(':id')
  async findOne(@Params('id', ParseIntPipe) id: number) {
    const todo = todos.find(t => t.id === id);
    
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    
    return {
      success: true,
      data: todo,
    };
  }

  /**
   * Create a new todo
   * Uses ValidationPipe to validate the input data
   */
  @Post()
  @UseResponseInterceptors(LoggingInterceptor)
  async create(@Body(new ValidationPipe(CreateTodoDto)) createTodoDto: CreateTodoDto) {
    if (!createTodoDto.title || createTodoDto.title.trim() === '') {
      throw new BadRequestException('Title is required');
    }
    
    const newTodo: Todo = {
      id: todos.length + 1,
      title: createTodoDto.title,
      description: createTodoDto.description,
      completed: createTodoDto.completed,
    };
    
    todos.push(newTodo);
    
    return {
      success: true,
      data: newTodo,
    };
  }

  /**
   * Update a todo by ID
   * Uses both ParseIntPipe and ValidationPipe
   */
  @Put(':id')
  async update(
    @Params('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe(CreateTodoDto)) updateTodoDto: CreateTodoDto
  ) {
    const todoIndex = todos.findIndex(t => t.id === id);
    
    if (todoIndex === -1) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    
    const updatedTodo: Todo = {
      ...todos[todoIndex],
      title: updateTodoDto.title,
      description: updateTodoDto.description,
      completed: updateTodoDto.completed,
    };
    
    todos[todoIndex] = updatedTodo;
    
    return {
      success: true,
      data: updatedTodo,
    };
  }

  /**
   * Delete a todo by ID
   */
  @Delete(':id')
  async remove(@Params('id', ParseIntPipe) id: number) {
    const todoIndex = todos.findIndex(t => t.id === id);
    
    if (todoIndex === -1) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    
    const deletedTodo = todos[todoIndex];
    todos.splice(todoIndex, 1);
    
    return {
      success: true,
      data: deletedTodo,
    };
  }
} 