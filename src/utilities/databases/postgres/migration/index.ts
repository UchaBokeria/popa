#!/usr/bin/env bun
import 'reflect-metadata';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';
import { AppDataSource } from '../database';

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../../../..');

async function runCommand() {
    const args = process.argv.slice(2);
    const command = args[0];

    if (!command) {
        console.error('Please provide a command: generate | run | revert');
        process.exit(1);
    }

    try {
        switch (command) {
            case 'generate':
                await generateMigration(args[1] || 'Migration');
                break;

            case 'run':
                await runMigration();
                break;

            case 'revert':
                await revertMigration();
                break;

            default:
                console.error('Unknown command. Use "generate", "run", or "revert"');
                process.exit(1);
        }
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

async function generateMigration(name: string) {
    try {
        const migrationsDir = path.join(rootDir, 'src', 'utils', 'database', 'migration', 'migrations');

        // Create migrations directory if it doesn't exist
        await execAsync(`mkdir -p ${migrationsDir}`);

        // Initialize the data source to check for schema changes
        await AppDataSource.initialize();
        console.log('Database connection initialized for migration generation');

        // Generate the migration file
        const timestamp = new Date().getTime();
        const migrationName = `${timestamp}-${name}`;

        const entityMetadatas = AppDataSource.entityMetadatas;

        // Generate migration based on the current database schema
        await AppDataSource.driver.createSchemaBuilder().log();

        const sqlStatements = await AppDataSource.driver.createSchemaBuilder().build();

        // Create a TypeORM migration file template
        const migrationContent = `import { MigrationInterface, QueryRunner } from "typeorm";

export class ${name}${timestamp} implements MigrationInterface {
    name = '${name}${timestamp}';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Auto-generated migration from entity changes
        // Add your custom logic here if needed
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revert changes made in the up method
        // Add your custom logic here if needed
    }
}
`;

        const migrationFilePath = path.join(migrationsDir, `${migrationName}.ts`);
        await execAsync(`echo '${migrationContent.replace(/'/g, "'\\''")}' > ${migrationFilePath}`);

        console.log(`Migration file generated at: ${migrationFilePath}`);
        console.log('Warning: This is a template migration file. You need to fill in the up/down methods manually.');

        // Close connection
        await AppDataSource.destroy();

        console.log(`Migration "${name}" has been generated in ${migrationsDir}`);
    } catch (error) {
        console.error('Failed to generate migration:', error);
        throw error;
    }
}

async function runMigration() {
    try {
        // Initialize the database connection
        await AppDataSource.initialize();
        console.log('Database connection initialized');

        // Run migrations
        const migrations = await AppDataSource.runMigrations();
        console.log(`Successfully ran ${migrations.length} migrations`);

        // Log names of migrations that were executed
        if (migrations.length > 0) {
            console.log('Executed migrations:');
            migrations.forEach((migration) => {
                console.log(`- ${migration.name}`);
            });
        } else {
            console.log('No pending migrations to run.');
        }

        // Close the connection
        await AppDataSource.destroy();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error running migrations:', error);
        throw error;
    }
}

async function revertMigration() {
    try {
        // Initialize the database connection
        await AppDataSource.initialize();
        console.log('Database connection initialized');

        // Revert most recent migration
        await AppDataSource.undoLastMigration();
        console.log('Successfully reverted the last migration');

        // Close the connection
        await AppDataSource.destroy();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error reverting migration:', error);
        throw error;
    }
}

runCommand();
