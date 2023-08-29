import { MigrationInterface, QueryRunner, Table } from "typeorm"
/**
 * TABLE time_record {
    time_record_id uuid [primary key, not null]
    UserID uuid
    TimeRecordDay timestamp [default: `get_day()`]
    TimeRecordHour timestamp [default: `get_hour`]
    ProjectID uuid
    CheckInTimestamp timestamp
    CheckOutTimestamp timestamp
    documentID uuid
    Location string
    CreatedAT timestamp [default: `now()`]
    UpdateAt timestamp [default: `now()`]
}
 */
export class TimeRecords1693261623689 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.createTable(new Table({
                name: "time_records",
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
                        name: "time_record_day",
                        type: "timestamp",
                        default: "CURRENT_DATE"
                    },
                    {
                        name: "time_record_hour",
                        type: "timetz",
                        default: "CURRENT_TIME"
                    },
                    {
                        name: "project_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "checkin",
                        type: "timestamp",
                        isNullable: true,

                    },
                    {
                        name: "checkout",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "document_id",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "location",
                        type: "varchar",
                        isNullable: true,
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
                ],
                foreignKeys: [{
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
            ]
            }));
        } catch (error) {
            console.trace(error);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.dropTable("time_records");
        } catch (error) {
            console.trace(error);
        }
    }

}
