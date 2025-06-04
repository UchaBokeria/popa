import { Module } from 'elysia-nest';
import { HealthModule } from './health/health.module';

@Module({
    prefix: '/api',
    children: [HealthModule],
})
export class ApiModule {}
