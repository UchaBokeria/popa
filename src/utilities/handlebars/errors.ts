import { Elysia } from 'elysia';
import { render } from '@/shared/utils/hbs/render';

/**
 * Handler for error pages
 */
export const errors = new Elysia().onError(({ code, error, set }) => {
    console.error(`Error [${code}]:`, error);
    set.headers['Content-Type'] = 'text/html';

    switch (code) {
        case 'NOT_FOUND':
            set.status = 404;
            return render('pages/404.hbs')().data;
        default:
            set.status = 500;
            return '<h1>Internal Server Error</h1>';
    }
});
