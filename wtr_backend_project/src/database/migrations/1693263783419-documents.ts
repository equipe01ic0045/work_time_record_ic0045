import { MigrationInterface, QueryRunner, Table } from "typeorm"
/**
 * Table documents {
  documentID uuid
  documentFile string
  time_record_id uuid
    document_description string
}
 */
export class Documents1693263783419 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.createTable(new Table({
                name: "documents",
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
                        name: "document_file",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "time_record_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "document_description",
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
                ],
            }));

         
        } catch (error) {
            console.trace(error);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.dropTable("documents");
        } catch (error) {
            console.trace(error);
        }
    }

}
