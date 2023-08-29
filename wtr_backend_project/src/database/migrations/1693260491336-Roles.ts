import { MigrationInterface, QueryRunner, Table } from "typeorm"
/**
 *  }

 TABLE role {
    RoleID uuid [primary key, not null]
    RoleName string [not null]
}
 */
export class Roles1693260491336 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.createTable(
                new Table({
                    name: "roles",
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
                        }
                    ]
                })
            );
        } catch (error) {
            console.trace(error);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.dropTable("role");
        } catch (error) {
            console.trace(error);
        }
    }
}
