import { Controller, Get, Post, Body, Params, Query, Form, File, ApiSchema } from '@/utils/core';
import { AuthService } from '@/services/auth.service';
import { CreateUserDto, LoginUserDto } from '@/dtos/user.dto';
import { ContactFormDto } from '@/dtos/form.dto';
import { FileUploadDto } from '@/dtos/upload.dto';
import { TestSchemas } from '@/schemas/test/index';

@Controller('/test')
export class TestController {
  @Post('/register')
  @ApiSchema(TestSchemas.register)
  async register(@Body() body: CreateUserDto, { set }: any) {
    try {
      // Register user
      await AuthService.register(body);
      return { success: true, redirect: '/test/login' };
    } catch (error) {
      set.status = 400;
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Registration failed'
      };
    }
  }

  @Post('/login')
  @ApiSchema(TestSchemas.login)
  async login(@Body() body: LoginUserDto, { set, cookie }: any) {
    try {
      // Login user using decorated and validated body
      const { usernameOrEmail, password } = body;
      const result = await AuthService.login(usernameOrEmail, password);
      
      if (!result) {
        set.status = 401;
        return { success: false, message: 'Invalid credentials' };
      }
      // Set JWT cookie
      if (cookie?.auth) {
        cookie.auth.set({
          value: result.token,
          httpOnly: true,
          path: '/',
          maxAge: 60 * 60 * 24 // 1 day
        });
      }

      return { success: true, redirect: '/' };
    } catch (error) {
      set.status = 400;
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Login failed'
      };
    }
  }

  @Get('/example/:id')
  @ApiSchema(TestSchemas.urlParamExample)
  async exampleWithParams(
    @Params('id') id: string,
    @Query() query: any,
    { set }: any
  ) {
    set.headers['Content-Type'] = 'application/json';
    return {
      success: true,
      data: {
        id,
        query
      }
    };
  }

  @Post('/example/:id')
  @ApiSchema(TestSchemas.allParamsExample)
  async exampleWithAllParams(
    @Body() body: any,
    @Params() params: any,
    @Params('id') id: string,
    @Query('filter') filter: string,
    @Query() fullQuery: any,
    { set }: any
  ) {
    set.headers['Content-Type'] = 'application/json';
    return {
      success: true,
      data: {
        id,
        params,
        filter,
        fullQuery,
        body,
      }
    };
  }

  @Post('/contact')
  @ApiSchema(TestSchemas.submitContact)
  async submitContactForm(
    @Form() form: ContactFormDto,
    { set }: any
  ) {
    // Here we would normally save the contact form data or send an email
    // For demo purposes, we'll just return the validated data
    return {
      success: true,
      message: `Thank you for your message, ${form.name}!`,
      data: form
    };
  }

  @Post('/upload/single')
  @ApiSchema(TestSchemas.uploadSingle)
  async uploadSingleFile(
    @File() file: any,
    @Form() data: FileUploadDto,
    { set }: any
  ) {
    if (!file) {
      set.status = 400;
      return {
        success: false,
        message: 'No file uploaded'
      };
    }

    // Here we would normally save the file
    // For demo purposes, we'll just return file info
    return {
      success: true,
      message: 'File uploaded successfully',
      data: {
        title: data.title,
        description: data.description,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size
      }
    };
  }

} 