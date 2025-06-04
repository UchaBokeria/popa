import type { EndpointSchema } from '@/types/schema';
import { ContactFormDto } from '@/dtos/form.dto';

export const submitContact: EndpointSchema = {
  summary: 'Submit a contact form',
  description: 'Send a message with name, email, and optional subscription preference',
  request: ContactFormDto,
  requestBodyDescription: 'Contact form data with name, email, message and subscription preference',
  formData: true,
  contentType: 'application/x-www-form-urlencoded',
  requestExample: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    message: 'I have a question about your services.',
    subscribe: true,
  },
  fieldExamples: {
    name: { value: 'John Doe', summary: 'Full name' },
    email: { value: 'john.doe@example.com', summary: 'Email address' },
    message: { value: 'I have a question about your services.', summary: 'Message content' },
    subscribe: { value: true, summary: 'Subscribe to newsletter' },
  },
  responses: {
    '200': {
      description: 'Message sent successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              email: { type: 'string' },
              message: { type: 'string' },
              subscribe: { type: 'boolean' },
            },
          },
        },
      },
      example: {
        success: true,
        message: 'Thank you for your message, John Doe!',
        data: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          message: 'I have a question about your services.',
          subscribe: true,
        },
      },
    },
    '400': {
      description: 'Invalid form data',
      example: {
        success: false,
        message: 'Validation failed for form',
        errors: [
          {
            property: 'email',
            constraints: {
              isEmail: 'Email must be valid',
            },
          },
        ],
      },
    },
  },
};
