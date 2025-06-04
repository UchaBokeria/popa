import Handlebars from 'handlebars';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, readdirSync } from 'fs';
import { Elysia } from 'elysia';
import { render } from './render';
import { errors } from './errors';

// Get directory paths
const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..', '..', '..');
const viewsDir = join(rootDir, 'src', 'views');
const helpersDir = join(viewsDir, 'helpers');
const componentsDir = join(viewsDir, 'components');

/**
 * Creates and returns the Elysia render plugin
 * - Registers all helpers from the helpers directory
 * - Registers all partials from the components directory
 * - Decorates Elysia with a render function
 *
 * @returns Elysia instance with render decorator
 */
export function Handlebar() {
    // Register helpers
    loadHelpers();

    // Register partials
    registerPartials();

    // Create and return the renderPlugin
    return new Elysia().use(errors).decorate('render', (templatePath: string, data?: Record<string, unknown>, options = {}) => {
        const renderFn = render(templatePath, options);
        return renderFn({ data }).data;
    });
}

/**
 * Load all helpers from the helpers directory
 * This automatically loads all .ts files in the helpers directory
 */
function loadHelpers(): void {
    try {
        // Get all .ts files in the helpers directory
        const helperFiles = readdirSync(helpersDir).filter((file) => file.endsWith('.ts'));

        // Register built-in helpers
        registerBuiltInHelpers();

        // Import and register each helper module
        for (const file of helperFiles) {
            try {
                // Skip index.ts
                if (file === 'index.ts') continue;

                // Use dynamic import for the helper file
                import(join(helpersDir, file))
                    .then((module) => {
                        if (module.default && typeof module.default === 'function') {
                            module.default();
                        }
                    })
                    .catch((err) => console.error(`Error loading helper ${file}:`, err));
            } catch (err) {
                console.error(`Error loading helper ${file}:`, err);
            }
        }
    } catch (error) {
        console.error('Error loading helpers:', error);
    }
}

/**
 * Register built-in helpers
 */
function registerBuiltInHelpers(): void {
    // JSON helper
    Handlebars.registerHelper('json', (context) => JSON.stringify(context));

    // Equality helper
    Handlebars.registerHelper('eq', (a, b) => a === b);

    // Format date helper
    Handlebars.registerHelper('formatDate', (date) => new Date(date).toLocaleDateString());

    // First letter helper
    Handlebars.registerHelper('firstLetter', (str) => (str ? str.charAt(0).toUpperCase() : ''));

    // Current year helper
    Handlebars.registerHelper('currentYear', () => new Date().getFullYear());
}

/**
 * Register all partials from the components directory
 */
function registerPartials(): void {
    try {
        // Get all .hbs files in the components directory
        const partialFiles = readdirSync(componentsDir).filter((file) => file.endsWith('.partial.hbs'));

        // Register each partial
        for (const file of partialFiles) {
            try {
                const partialName = file.replace('.partial.hbs', '');
                const partialPath = join(componentsDir, file);
                const partialContent = readFileSync(partialPath, 'utf8');

                Handlebars.registerPartial(`components/${partialName}`, partialContent);
            } catch (err) {
                console.error(`Error registering partial ${file}:`, err);
            }
        }
    } catch (error) {
        console.error('Error registering partials:', error);
    }
}
