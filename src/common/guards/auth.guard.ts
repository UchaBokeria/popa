// import type { CanActivate, GuardContext } from './guard.interface';
// import { UnauthorizedException } from '../exceptions/unauthorized.exception';

// /**
//  * Authentication guard that checks for an auth token
//  */
// export class AuthGuard implements CanActivate {
//     /**
//      * Verify the request is authenticated
//      */
//     canActivate(context: GuardContext): boolean {
//         const authHeader = context.request.headers.get('authorization');

//         if (!authHeader) {
//             throw new UnauthorizedException('Missing authentication token');
//         }

//         // This is a simplified example
//         // In a real app, you would validate the token
//         const [type, token] = authHeader.split(' ');

//         if (type !== 'Bearer' || !token) {
//             throw new UnauthorizedException('Invalid authentication token');
//         }

//         // Store user information for use in the handler
//         context.store.user = { id: 1, role: 'user' };

//         return true;
//     }
// }
