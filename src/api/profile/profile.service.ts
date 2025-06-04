import { Injectable } from 'elysia-nest';

@Injectable()
export class ProfileService {
    constructor() {}

    async getProfile() {
        return 'Hello World';
    }
}