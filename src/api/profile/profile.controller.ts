import { Get } from "elysia-nest";
import { ProfileService } from "./profile.service";

export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get('/')
    async getProfile() {
        return this.profileService.getProfile();
    }
}   