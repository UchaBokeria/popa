import { Elysia } from 'elysia';
import { UserEntity } from '../../entities/user.entity';

declare module 'elysia' {
    interface Cookie {
        user: {
            id: string;
            username: string;
            isAdmin: boolean;
        };
    }

    interface Context {
        user: {
            id: string;
            username: string;
            email: string;
            isAdmin: boolean;
            [key: string]: any;
        };
        render: (templatePath: string, data?: Record<string, unknown>, options?: { layout?: string; alpine?: boolean }) => string;
    }
}
