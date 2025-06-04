import { Elysia } from 'elysia';
import { join } from 'path';

/**
 * Sets up the static file routes for serving assets
 * @returns Elysia instance with static file routes configured
 */
export const Statics = () => {
    // Define public directory path
    const publicDir = join(process.cwd(), 'public');

    return (
        new Elysia()
            // Serve CSS files
            .get('/styles/*', ({ request }) => {
                const fileName = request.url.split('/styles/')[1];
                if (fileName) {
                    return new Response(Bun.file(join(publicDir, 'styles', fileName)));
                }
                return new Response('Not found', { status: 404 });
            })
            // Serve image files
            .get('/images/*', ({ request }) => {
                const fileName = request.url.split('/images/')[1];
                if (fileName) {
                    return new Response(Bun.file(join(publicDir, 'images', fileName)));
                }
                return new Response('Not found', { status: 404 });
            })
            // Serve npm packages
            .get('/node_modules/*', ({ request }) => {
                const urlPath = request.url.split('/node_modules/')[1];
                if (urlPath) {
                    const [packageName, ...rest] = urlPath.split('/');
                    if (packageName) {
                        const filePath = join(process.cwd(), 'node_modules', packageName, ...rest);
                        return new Response(Bun.file(filePath));
                    }
                }
                return new Response('Not found', { status: 404 });
            })
            // Serve favicon
            .get('/favicon.ico', () => new Response(Bun.file(join(publicDir, 'favicon.ico'))))
    );
};
