import { Injectable } from '@/utils/di';

@Injectable()
export class ExampleService {
  private items: string[] = ['Item 1', 'Item 2', 'Item 3'];

  constructor() {
    console.log('ExampleService initialized');
  }

  getItems(): string[] {
    return this.items;
  }

  addItem(item: string): string[] {
    this.items.push(item);
    return this.items;
  }

  getItemById(id: number): string | undefined {
    return this.items[id];
  }
}
