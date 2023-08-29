import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export class ForeignKeysRelationships1693265787149 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {

            await queryRunner.createForeignKey("time_records", new TableForeignKey({
                name: "FKTimeRecord",
                referencedTableName: "documents",
                referencedColumnNames: ["id"],
                columnNames: ["document_id"],
            }))
        } catch (error) {
            console.trace(error);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.dropForeignKey("time_records", "FKTimeRecord")
        } catch(error) {
            console.trace(error)
        }
    }

}
