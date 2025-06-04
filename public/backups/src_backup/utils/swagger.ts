import swagger, { swagger as elysiaSwagger } from '@elysiajs/swagger';
import dotenv from 'dotenv';
import { AppModule } from '@/app.module';
import { extractRouteDocs } from './swagger/route-docs';
import Elysia from 'elysia';
dotenv.config();

const host = process.env.HOST || '0.0.0.0';
const port = Number(process.env.PORT || 3000);

/**
 * Configures and returns the Swagger UI plugin for API documentation
 * @returns Swagger plugin
 */
export const Swagger = () => {
  // Get all controllers from the app module
  const appModuleMetadata = Reflect.getMetadata('module:metadata', AppModule);
  const controllers = appModuleMetadata?.controllers || [];

  // Extract paths documentation from controllers
  const paths = extractRouteDocs(controllers);

  // Generate tags from controller names
  const tags = controllers.map((controller: any) => {
    const name = controller.name.replace(/Controller$/, '');
    return {
      name: name.charAt(0).toLowerCase() + name.slice(1),
      description: `${name} endpoints`,
    };
  });

  // Configure Swagger
  return elysiaSwagger({
    documentation: {
      info: {
        title: 'Popa API',
        version: '1.0.0',
        description: 'API for the Popa application',
      },
      tags,
      paths,
      servers: [
        { url: `http://${host}:${port}`, description: 'Local Development' },
        { url: `https://api.popa.com`, description: 'Production' },
      ],
    },
    path: '/swagger',
    exclude: ['/swagger'], // Exclude Swagger UI itself
    swaggerOptions: {
      operationsSorter: 'method',
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'list',
      filter: true,
      syntaxHighlight: {
        activate: true,
        theme: 'obsidian',
      },
      showExtensions: true,
      displayOperationId: true,
      defaultModelRendering: 'example',
      showCommonExtensions: true,
      tryItOutEnabled: true,
      deepLinking: true,
    },
  });
};
