import { Controller, Get } from "elysia-nest";
import { App } from "./app";

@Controller('/')
export class AppController {
    @Get('/')
    async SSR(): Promise<any> {
        return new Response(await App(), { headers: { "Content-Type": "text/html" } })
    }
}
