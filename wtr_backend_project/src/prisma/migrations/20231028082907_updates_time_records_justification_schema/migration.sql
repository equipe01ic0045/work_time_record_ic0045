/*
  Warnings:

  - You are about to drop the column `project_manager_id` on the `time_record_justification` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[absense_document_id]` on the table `time_record_justification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[approver_id]` on the table `time_record_justification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[approver_id,id]` on the table `time_record_justification` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `time_record_justification_id` to the `absense_document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_id` to the `time_record_justification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "time_record_justification" DROP CONSTRAINT "time_record_justification_absense_document_id_fkey";

-- DropForeignKey
ALTER TABLE "time_record_justification" DROP CONSTRAINT "time_record_justification_project_manager_id_fkey";

-- DropIndex
DROP INDEX "time_record_justification_colaborator_id_key";

-- DropIndex
DROP INDEX "time_record_justification_project_manager_id_key";

-- AlterTable
ALTER TABLE "absense_document" ADD COLUMN     "time_record_justification_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "time_record_justification" DROP COLUMN "project_manager_id",
ADD COLUMN     "approver_id" INTEGER,
ADD COLUMN     "project_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "time_record_justification_absense_document_id_key" ON "time_record_justification"("absense_document_id");

-- CreateIndex
CREATE UNIQUE INDEX "time_record_justification_approver_id_key" ON "time_record_justification"("approver_id");

-- CreateIndex
CREATE UNIQUE INDEX "time_record_justification_approver_id_id_key" ON "time_record_justification"("approver_id", "id");

-- AddForeignKey
ALTER TABLE "absense_document" ADD CONSTRAINT "absense_document_time_record_justification_id_fkey" FOREIGN KEY ("time_record_justification_id") REFERENCES "time_record_justification"("absense_document_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_record_justification" ADD CONSTRAINT "time_record_justification_approver_id_fkey" FOREIGN KEY ("approver_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
