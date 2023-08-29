import { MigrationInterface, QueryRunner, Table } from "typeorm"

/**
 * TABLE project {
    ProjectID uuid [primary key, not null]
    ProjectName string [not null]
    CreatedAT timestamp [default: `now()`]
    UpdateAt timestamp [default: `now()`]
 }
 */
export class Projects1693260668979 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.createTable(
                new Table({
                    name: "projects",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true,
                            isNullable: false,
                            generationStrategy: "uuid",
                            default: "uuid_generate_v4()"
                        },
                        {
                            name: "name",
                            type: "varchar",
                            isNullable: false,
                        },
                        {
                            name: "created_at",
                            type: "timestamp",
                            default: "now()"
                        },
                        {
                            name: "updated_at",
                            type: "timestamp",
                            default: "now()"
                        }
                    ]
                }),
            )
        } catch (error) {
            console.trace(error);
        }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.dropTable("projects");
        } catch (error) {
            console.trace(error);
        }
    }

}
