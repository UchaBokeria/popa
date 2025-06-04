import { BadRequestException } from '@/exceptions/bad-request.exception';
import type { PipeTransform, PipeMetadata } from './pipe.interface';

/**
 * Class validator interface to allow for different validation libraries
 */
export interface ClassValidator {
  validate(object: any): Promise<ValidationError[]> | ValidationError[];
}

/**
 * Validation error interface
 */
export interface ValidationError {
  property: string;
  constraints?: Record<string, string>;
  children?: ValidationError[];
}

/**
 * Validation pipe that validates input against a class schema
 */
export class ValidationPipe implements PipeTransform {
  /**
   * Class type to validate against
   */
  private readonly targetType: any;

  /**
   * Create a new validation pipe
   *
   * @param targetType The class type to validate against
   */
  constructor(targetType: any) {
    this.targetType = targetType;
  }

  /**
   * Transform and validate the input
   */
  async transform(value: any, metadata?: PipeMetadata): Promise<any> {
    // Skip validation if value is null or undefined
    if (value === null || value === undefined) {
      return value;
    }

    // Create an instance of the target class
    const object = Object.assign(new this.targetType(), value);

    // Use validation library to validate the object
    // This is just a placeholder. You would use a real validator library here.
    const errors = await this.validate(object);

    if (errors.length > 0) {
      const message = this.formatErrors(errors);
      throw new BadRequestException(message, { errors });
    }

    return object;
  }

  /**
   * Validate the object
   * This is a placeholder. In a real implementation, you would use a validation library.
   */
  private async validate(object: any): Promise<ValidationError[]> {
    // Placeholder for validation logic
    // In a real app, you might use a library like class-validator
    return [];
  }

  /**
   * Format validation errors into a readable string
   */
  private formatErrors(errors: ValidationError[]): string {
    const messages = errors.map((error) => {
      if (!error.constraints) return `Validation failed for ${error.property}`;

      return Object.values(error.constraints).join(', ');
    });

    return `Validation failed: ${messages.join('; ')}`;
  }
}
