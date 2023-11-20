/*
  Warnings:

  - A unique constraint covering the columns `[time_record_id,justification_type]` on the table `time_record_justification` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "time_record_justification_time_record_id_status_key";

-- CreateIndex
CREATE UNIQUE INDEX "time_record_justification_time_record_id_justification_type_key" ON "time_record_justification"("time_record_id", "justification_type");
