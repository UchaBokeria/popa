import { Module } from 'elysia-nest';
import { AuthModule } from '@app/auth/auth.module';

@Module({
    prefix: '/',
    children: [AuthModule],
})
export class AppModule {}
