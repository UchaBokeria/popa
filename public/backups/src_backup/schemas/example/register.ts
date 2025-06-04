import type { EndpointSchema } from '@/types/schema';
import { RegisterDto } from '@dtos/test/register.dto';

export const register: EndpointSchema = {
  summary: 'Register a new user',
  description: 'Create a new user account with username, email, and password',
  request: RegisterDto,
  formData: true,
  contentType: 'application/json',
  requestExample: {
    username: 'johndoe',
    email: 'john.doe@example.com',
    password: 'password123',
    fullName: 'John Doe',
    pubgId: 'PUBG123456',
  },
  fieldExamples: {
    username: { value: 'johndoe', summary: 'Username for login' },
    email: { value: 'john.doe@example.com', summary: 'Email address' },
    password: { value: 'password123', summary: 'Secure password' },
    fullName: { value: 'John Doe', summary: 'Full name' },
    pubgId: { value: 'PUBG123456', summary: 'Player ID for PUBG game (optional)' },
  },
  responses: {
    '200': {
      description: 'User registered successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          redirect: { type: 'string', example: '/test/login' },
        },
      },
      example: { success: true, redirect: '/test/login' },
    },
    '400': {
      description: 'Registration failed due to validation errors or existing user',
      example: { success: false, message: 'Username already taken' },
    },
  },
};
