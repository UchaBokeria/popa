import { Elysia } from 'elysia';

export const loggerMiddleware = (app: Elysia) =>
  app.onBeforeHandle(({ request }) => {
    console.log(`${request.method} ${request.url}`);
  });
