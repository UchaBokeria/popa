import { Module } from 'elysia-nest';
import { ProfileController } from './profile.controller';

@Module({
    prefix: '/profile',
    children: [
        ProfileController,
    ],
})
export class ProfileModule {}