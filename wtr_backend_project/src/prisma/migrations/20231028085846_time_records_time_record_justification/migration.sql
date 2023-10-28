/*
  Warnings:

  - A unique constraint covering the columns `[time_record_id,id]` on the table `time_record_justification` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `time_record_id` to the `time_record_justification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "time_record_justification" ADD COLUMN     "time_record_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "time_record_justification_time_record_id_id_key" ON "time_record_justification"("time_record_id", "id");

-- AddForeignKey
ALTER TABLE "time_record_justification" ADD CONSTRAINT "time_record_justification_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_record_justification" ADD CONSTRAINT "time_record_justification_time_record_id_fkey" FOREIGN KEY ("time_record_id") REFERENCES "time_record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
