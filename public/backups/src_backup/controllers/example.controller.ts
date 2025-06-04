import { Controller, Get, Post, Body } from '@/utils/core';
import { ExampleService } from '@/services/example.service';

@Controller('/examples')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {
    console.log('ExampleController initialized with ExampleService');
  }

  @Get()
  getItems() {
    return {
      success: true,
      data: this.exampleService.getItems()
    };
  }

  @Get('/:id')
  getItem(@Body('id') id: number) {
    const item = this.exampleService.getItemById(id);
    
    if (!item) {
      return {
        success: false,
        message: `Item with ID ${id} not found`
      };
    }
    
    return {
      success: true,
      data: item
    };
  }

  @Post()
  addItem(@Body('item') item: string) {
    const items = this.exampleService.addItem(item);
    
    return {
      success: true,
      message: 'Item added successfully',
      data: items
    };
  }
} 