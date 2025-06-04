import type { ApiResponseExample } from '@utils/decorators/swagger.decorator';

/**
 * Individual endpoint schema configuration.
 */
export interface EndpointSchema {
  /** Brief summary of the endpoint */
  summary: string;
  /** Detailed description of the endpoint */
  description?: string;
  /** DTO type for the request payload */
  request?: any;
  /** Example object for the request body */
  requestExample?: any;
  /** Multiple examples for the request body */
  requestExamples?: {
    [name: string]: { summary: string; value: any };
  };
  /** Description for the request body */
  requestBodyDescription?: string;
  /** Flag indicating if this is a form data submission */
  formData?: boolean;
  /** Flag indicating if this endpoint involves file uploads */
  fileUpload?: boolean;
  /** Explicit content type for the request */
  contentType?: string;
  /** Examples for individual fields in a form or parameters */
  fieldExamples?: {
    [fieldName: string]: { value: any; summary: string };
  };
  /** Response configurations for different HTTP status codes */
  responses: Record<string, ApiResponseExample>;
}

/**
 * Generic schema type for request definitions.
 */
export interface RequestSchema {
  /** Shared examples for requests and responses (optional) */
  examples?: Record<string, any>;
  /** Named schema entries for endpoints */
  [endpointName: string]: EndpointSchema | Record<string, any> | undefined;
}
