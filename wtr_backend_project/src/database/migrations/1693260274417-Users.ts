import { MigrationInterface, QueryRunner, Table } from "typeorm"
/**
 *  TABLE user {
    UserID uuid [primary key, not null]
    Username string
    Password string 
    Email string [unique]
    CreatedAT timestamp [default: `now()`]
    UpdateAt timestamp [default: `now()`]
 }
 */
export class Users1693260274417 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.createTable(
                new Table({
                    name: "users",
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
                            name: "username",
                            type: "varchar",
                            isNullable: false,
                        },
                        {
                            name: "password",
                            type: "varchar",
                            isNullable: false,
                        },
                        {
                            name: "email",
                            type: "varchar",
                            isNullable: false,
                            isUnique: true,
                        },
                        {
                            name: "created_at",
                            type: "timestamp",
                            default: "now()",
                            isNullable: false,
                        },
                        {
                            name: "updated_at",
                            type: "timestamp",
                            default: "now()",
                            isNullable: false,
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
            await queryRunner.dropTable("user")
        } catch (error) {
            console.trace(error);
        }
    }

}
