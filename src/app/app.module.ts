import { Module } from "elysia-nest";
import { AppController } from "./app.controller";

@Module({
    prefix: '/',
    controllers: [AppController],
})
export class AppModule {}
