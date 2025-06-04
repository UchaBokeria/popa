import { DataSource } from 'typeorm';
import { UserEntity } from '../../../entities/user.entity';
import { PurchaseEntity } from '../../../entities/purchase.entity';
import dotenv from 'dotenv';
import Elysia from 'elysia';

// Load environment variables
dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'pubg_uc_store',
    synchronize: process.env.NODE_ENV === 'development',
    // logging: process.env.NODE_ENV === 'development',
    entities: [UserEntity, PurchaseEntity],
    subscribers: [],
    migrations: ['src/utils/database/migration/migrations/*.ts'],
    migrationsRun: false,
});

export const Postgres = async () => {
    try {
        await AppDataSource.initialize();
        console.log('📚  Postgres database connection has been initialized successfully');
    } catch (error) {
        console.error('Error during database initialization:', error);
        process.exit(1);
        throw error;
    }

    return new Elysia();
};

export const runMigrations = async () => {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        await AppDataSource.runMigrations();
        console.log('Migrations applied successfully');
    } catch (error) {
        console.error('Error running migrations:', error);
        throw error;
    }
};
