import { MigrationInterface, QueryRunner, Table } from "typeorm"
/**
 * 
 TABLE user_project_role {
    UserProjectRoleID uuid [primary key, not null]
    UserID uuid
    ProjectID uuid
    RoleID uuid
 }
 */
export class UserProjectRole1693260902740 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.createTable(
                new Table({
                    name: "user_project_role",
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
                            name: "user_id",
                            type: "uuid",
                            isNullable: false,
                        },
                        {
                            name: "project_id",
                            type: "uuid",
                            isNullable: false,
                        },
                        {
                            name: "role_id",
                            type: "uuid",
                            isNullable: false,
                        }
                    ],
                    foreignKeys: [
                        {
                            name: "FKUser",
                            referencedTableName: "users",
                            referencedColumnNames: ["id"],
                            columnNames: ["user_id"],   
                        },
                        {
                            name: "FKProject",
                            referencedTableName: "projects",
                            referencedColumnNames: ["id"],
                            columnNames: ["project_id"],
                        },
                        {
                            name: "FKRole",
                            referencedTableName: "roles",
                            referencedColumnNames: ["id"],
                            columnNames: ["role_id"],
                        }
                    ]
                })
            )
        } catch (error) {
            console.trace(error);
        }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.dropTable("user_project_role");
        } catch (error) {
            console.trace(error);
        }
    }

}
