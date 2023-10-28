/*
  Warnings:

  - You are about to drop the column `absense_document_id` on the `time_record_justification` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "absense_document" DROP CONSTRAINT "absense_document_time_record_justification_id_fkey";

-- DropIndex
DROP INDEX "time_record_justification_absense_document_id_key";

-- AlterTable
ALTER TABLE "time_record_justification" DROP COLUMN "absense_document_id";

-- AddForeignKey
ALTER TABLE "absense_document" ADD CONSTRAINT "absense_document_time_record_justification_id_fkey" FOREIGN KEY ("time_record_justification_id") REFERENCES "time_record_justification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
