import type { EndpointSchema } from '@/types/schema';
import { LoginDto } from '@dtos/test/login.dto';

export const login: EndpointSchema = {
  summary: 'Login to an existing account',
  description: 'Authenticate with username/email and password to get a JWT token',
  request: LoginDto,
  formData: true,
  contentType: 'application/json',
  requestExample: {
    usernameOrEmail: 'johndoe',
    password: 'password123',
  },
  fieldExamples: {
    usernameOrEmail: { value: 'johndoe', summary: 'Username or email address' },
    password: { value: 'password123', summary: 'Your password' },
  },
  responses: {
    '200': {
      description: 'Login successful',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          redirect: { type: 'string', example: '/' },
        },
      },
      example: { success: true, redirect: '/' },
    },
    '401': {
      description: 'Invalid credentials',
      example: { success: false, message: 'Invalid credentials' },
    },
  },
};
