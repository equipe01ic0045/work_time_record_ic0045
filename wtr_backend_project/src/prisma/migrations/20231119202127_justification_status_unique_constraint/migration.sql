/*
  Warnings:

  - A unique constraint covering the columns `[time_record_id,status]` on the table `time_record_justification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "time_record_justification_time_record_id_status_key" ON "time_record_justification"("time_record_id", "status");
