import Handlebars from 'handlebars';

/**
 * Register common helpers
 */
export default function registerCommonHelpers(): void {
  // Pluralize helper
  Handlebars.registerHelper('pluralize', (count: number, singular: string, plural: string) =>
    count === 1 ? singular : plural
  );

  // Truncate helper
  Handlebars.registerHelper('truncate', (str: string, length: number) => {
    if (!str) return '';
    if (str.length <= length) return str;
    return str.substring(0, length) + '...';
  });

  // Format currency helper
  Handlebars.registerHelper('currency', (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  );
}
