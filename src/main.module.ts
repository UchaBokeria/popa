import { Module } from 'elysia-nest';
import { AppModule } from '@app/app.module';
import { ApiModule } from './api/api.module';

@Module({ children: [AppModule, ApiModule] })
export class EntryModule {}
