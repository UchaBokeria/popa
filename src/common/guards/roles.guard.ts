import type { CanActivate, GuardContext } from './guard.interface';
import { ForbiddenException } from '../exceptions/forbidden.exception';
import { ROLES_KEY } from '../utils/decorators/roles.decorator';

/**
 * Guard that checks if the user has the required roles
 */
export class RolesGuard implements CanActivate {
    // The class whose roles we're checking
    constructor(
        private readonly handlerClass: any,
        private readonly handlerMethod: string
    ) {}

    /**
     * Verify the user has the required roles
     */
    canActivate(context: GuardContext): boolean {
        // Get the required roles from metadata
        const requiredRoles = Reflect.getMetadata(ROLES_KEY, this.handlerClass, this.handlerMethod) || [];

        if (!requiredRoles.length) {
            return true; // No role requirements
        }

        // Get the user from the auth guard
        const user = context.store.user;

        if (!user) {
            throw new ForbiddenException('User is not authenticated');
        }

        const hasRole = requiredRoles.some((role: string) => user.role === role);

        if (!hasRole) {
            throw new ForbiddenException('Insufficient permissions');
        }

        return true;
    }
}
