import type { EndpointSchema } from '@/types/schema';

export const urlParamExample: EndpointSchema = {
  summary: 'Demonstrate URL path parameters',
  description: 'Example of using URL path parameters with validation',
  fieldExamples: {
    id: { value: '12345', summary: 'Resource identifier' },
  },
  responses: {
    '200': {
      description: 'Successful response with URL parameters',
      example: {
        success: true,
        data: {
          id: '12345',
        },
      },
    },
  },
};
