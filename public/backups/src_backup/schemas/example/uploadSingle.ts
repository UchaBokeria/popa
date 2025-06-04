import type { EndpointSchema } from '@/types/schema';
import { FileUploadDto } from '@/dtos/upload.dto';

export const uploadSingle: EndpointSchema = {
  summary: 'Upload a single file with metadata',
  description: 'Upload a single file with title and optional description metadata',
  request: FileUploadDto,
  requestBodyDescription: 'File to upload with metadata (must be multipart/form-data)',
  requestExample: {
    title: 'My Document',
    description: 'An important document for review',
  },
  fieldExamples: {
    title: { value: 'My Document', summary: 'Document title' },
    description: { value: 'An important document for review', summary: 'Document description' },
    file: { value: 'file.pdf', summary: 'File to upload' },
  },
  formData: true,
  fileUpload: true,
  contentType: 'multipart/form-data',
  responses: {
    '200': {
      description: 'File uploaded successfully',
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              description: { type: 'string' },
              fileName: { type: 'string' },
              fileType: { type: 'string' },
              fileSize: { type: 'number' },
            },
          },
        },
      },
      example: {
        success: true,
        message: 'File uploaded successfully',
        data: {
          title: 'My Document',
          description: 'An important document for review',
          fileName: 'document.pdf',
          fileType: 'application/pdf',
          fileSize: 1024567,
        },
      },
    },
    '400': {
      description: 'No file uploaded or invalid metadata',
      example: { success: false, message: 'No file uploaded' },
    },
  },
};
