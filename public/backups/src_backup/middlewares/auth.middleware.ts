import { AuthService } from '../services/auth.service';
import { userService } from '../services/user.service';
import { Controller } from '../utils/core';

declare global {
  interface Cookie {
    user: {
      id: string;
      username: string;
      isAdmin: boolean;
      role: string;
    };
  }
  namespace Elysia {
    interface Context {
      user: {
        id: string;
        username: string;
        email: string;
        isAdmin: boolean;
        role: string;
        [key: string]: any;
      };
    }
  }
}

// Auth middleware plugin - adds user to context if authenticated
export const authMiddleware = async ({ cookie }: any) => {
  // Check if auth cookie exists
  if (!cookie?.auth?.value) {
    return { user: null };
  }

  // Verify token
  const tokenPayload = AuthService.verifyToken(cookie.auth.value);
  if (!tokenPayload) {
    return { user: null };
  }

  // Get user from database
  try {
    const user = await userService.findById(tokenPayload.id);
    return { user };
  } catch (error) {
    return { user: null };
  }
};

export const Guard =
  (roles: string[] = []) =>
  ({ set, user, render }: any) => {
    if (!user) {
      set.status = 401;
      return render('pages/error.hbs', { message: 'Unauthorized' });
    }

    if (roles.length && !roles.includes(user?.role)) {
      set.status = 403;
      return render('pages/error.hbs', { message: 'Forbidden' });
    }

    return {};
  };
