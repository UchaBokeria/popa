import 'reflect-metadata';
import { Elysia } from 'elysia';
import { Handlebar } from '@utils/hbs';
import { AppModule } from './app.module';
import { Swagger } from '@/utils/swagger';
import { Statics } from '@/utils/statics';
import { Postgres } from '@utils/database/database';
import { initializeApp } from '@/utils/core';

// Initialize the app with lifecycle hooks
const bootstrap = async () => {
  const server = await initializeApp(new Elysia(), AppModule);

  // Start the server
  console.log(`🦊 Server is running at ${server.server?.hostname}:${server.server?.port}`);

  return server;
};

// Bootstrap the application
export const server = bootstrap();
