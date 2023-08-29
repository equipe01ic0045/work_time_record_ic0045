import { MigrationInterface, QueryRunner } from "typeorm"

export class Config1693227080503 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query('create extension if not exists "uuid-ossp"');
        } catch (error) {
            console.trace(error);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query('drop extension if exists "uuid-ossp"');
        } catch (error) {
            console.trace(error);
        }
    }

}
