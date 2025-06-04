import { HttpException, BadRequestException, UnauthorizedException, ForbiddenException, NotFoundException, InternalServerErrorException } from 'elysia-nest';
import type { PipeTransform, PipeMetadata } from './pipe.interface';

/**
 * Parse integer pipe that converts string values to integers
 */
export class ParseIntPipe implements PipeTransform<string, number> {
    /**
     * Transform a string value to an integer
     */
    transform(value: string, metadata?: PipeMetadata): number {
        const propertyName = metadata?.propertyName || 'value';

        const isNumeric = ['string', 'number'].includes(typeof value) && !isNaN(Number(value)) && isFinite(Number(value));

        if (!isNumeric) {
            throw new BadRequestException(`Validation failed: ${propertyName} must be a number`);
        }

        return parseInt(value, 10);
    }
}
