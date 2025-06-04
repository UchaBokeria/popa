import type { EndpointSchema } from '@/types/schema';
import { AllParamsDto } from '@dtos/test/allParamsExample.dto';

export const allParamsExample: EndpointSchema = {
  summary: 'Demonstrate all parameter types',
  description: 'Example using URL params, query params, body data, and file uploads',
  request: AllParamsDto,
  requestBodyDescription: 'Request body with product information',
  formData: true,
  contentType: 'application/json',
  requestExample: {
    name: 'Sample Product',
    description: 'This is a sample product description',
    price: 19.99,
    inStock: true,
  },
  fieldExamples: {
    id: { value: '12345', summary: 'Resource identifier' },
    filter: { value: 'active', summary: 'Filter records by status' },
    sort: { value: 'desc', summary: 'Sort direction (asc or desc)' },
    page: { value: 1, summary: 'Page number for pagination' },
    limit: { value: 10, summary: 'Number of records per page' },
    name: { value: 'Sample Product', summary: 'Product name' },
    description: { value: 'This is a sample product description', summary: 'Product description' },
    price: { value: 19.99, summary: 'Product price' },
    inStock: { value: true, summary: 'Whether the product is in stock' },
    file: { value: 'document.pdf', summary: 'File to upload' },
  },
  responses: {
    '200': {
      description: 'Successful response with all parameters',
      example: {
        success: true,
        data: {
          urlParams: { id: '12345' },
          queryParams: { filter: 'active', sort: 'desc' },
          bodyParams: {
            name: 'Sample Product',
            description: 'This is a sample product description',
            price: 19.99,
          },
          files: { fileName: 'document.pdf', contentType: 'application/pdf', size: 1024567 },
        },
      },
    },
    '400': {
      description: 'Invalid parameters',
      example: {
        success: false,
        message: 'Invalid parameters provided',
      },
    },
  },
};
