import 'reflect-metadata';
import { Bootstrap } from 'elysia-nest';
import { Module } from 'elysia-nest';
import { ApiModule } from '@api/api.module';
import { AppModule } from './app/app.module';

@Module({ children: [ApiModule, AppModule] })
export class MainModule {}

export const main = async () => {
    const entry = await Bootstrap(MainModule);

    if (process.env.NODE_ENV === 'development') {
        entry.get('/dev', () => 'stats');
    }

    entry.routes.map(route => console.log(`${route.method} => ${route.path}`))
    return entry;
}
