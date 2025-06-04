import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

// Template utilities
const layoutsDir = path.join(process.cwd(), 'src', 'views');
const templatesCache: Record<string, HandlebarsTemplateDelegate> = {};

/**
 * Gets a Handlebars template from the file system or cache
 * @param templatePath Path to the template file (relative to views directory)
 * @param useCache Whether to use the template cache
 * @returns Compiled Handlebars template
 */
export const getTemplate = (templatePath: string, useCache = true) => {
    if (useCache && templatesCache[templatePath]) {
        return templatesCache[templatePath];
    }

    const fullPath = path.join(layoutsDir, templatePath);
    const template = Handlebars.compile(fs.readFileSync(fullPath, 'utf-8'));
    templatesCache[templatePath] = template;
    return template;
};

/**
 * Options for the render function
 */
export interface RenderOptions {
    layout?: string;
    alpine?: boolean;
}

type RenderFunction = (data?: { data?: Record<string, unknown> }) => { data: string };

/**
 * Renders a template with the given data
 * @param templatePath Path to the template file (relative to views directory)
 * @param options Render options
 * @returns Function that renders the template with the given data
 */
export const render = (templatePath: string, options: RenderOptions = {}): RenderFunction => {
    const layout = options.layout || 'layouts/main.hbs';

    return ({ data }: { data?: Record<string, unknown> } = {}): { data: string } => {
        try {
            // If using Alpine.js, add x-data
            if (options.alpine && data) {
                data.alpineData = JSON.stringify(data);
            }

            let htmlContent: string;

            if (layout) {
                const layoutTemplate = getTemplate(layout);
                const contentTemplate = getTemplate(templatePath);
                const content = contentTemplate(data || {});
                htmlContent = layoutTemplate({ ...data, content });
            } else {
                const template = getTemplate(templatePath);
                htmlContent = template(data || {});
            }

            return { data: htmlContent };
        } catch (err) {
            console.error('Render error:', err);
            return { data: '<h1>Internal Server Error</h1>' };
        }
    };
};

// Extend Elysia context with render function
declare global {
    namespace Elysia {
        interface Context {
            render: (templatePath: string, data?: Record<string, unknown>, options?: RenderOptions) => string;
        }
    }
}
