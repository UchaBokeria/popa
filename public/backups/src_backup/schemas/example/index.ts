import type { RequestSchema } from '@/types/schema';
import { register } from './register';
import { login } from './login';
import { urlParamExample } from './urlParamExample';
import { allParamsExample } from './allParamsExample';
import { submitContact } from './submitContact';
import { uploadSingle } from './uploadSingle';

export const TestSchemas: RequestSchema = {
  register,
  login,
  urlParamExample,
  allParamsExample,
  submitContact,
  uploadSingle,
};
