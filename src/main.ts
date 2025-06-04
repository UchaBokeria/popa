import 'reflect-metadata';
import { Bootstrap } from 'elysia-nest';
import { EntryModule } from '@src/main.module';

export const main = async () => {
    const entry = await Bootstrap(EntryModule);

    if (process.env.NODE_ENV === 'development') {
        //
        entry.get('/dev', () => 'stats');
    }

    return entry;
};
