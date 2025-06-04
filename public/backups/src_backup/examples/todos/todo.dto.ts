/**
 * Data Transfer Object for creating a new Todo
 */
export class CreateTodoDto {
  /**
   * Title of the todo
   */
  title!: string;

  /**
   * Description of the todo (optional)
   */
  description?: string;

  /**
   * Whether the todo is completed
   */
  completed = false;
}

/**
 * Data Transfer Object for getting a Todo by ID
 */
export class GetTodoDto {
  /**
   * ID of the todo
   */
  id!: number;
}
