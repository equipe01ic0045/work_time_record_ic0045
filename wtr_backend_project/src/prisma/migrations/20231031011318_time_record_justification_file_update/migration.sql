/*
  Warnings:

  - You are about to drop the column `absense_document_id` on the `time_record_justification` table. All the data in the column will be lost.
  - You are about to drop the column `updated_check_in_timestamp` on the `time_record_justification` table. All the data in the column will be lost.
  - You are about to drop the column `updated_check_out_timestamp` on the `time_record_justification` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[time_record_justification_id]` on the table `absense_document` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[time_record_id,id]` on the table `time_record_justification` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `justification_type` to the `time_record_justification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `time_record_justification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_record_id` to the `time_record_justification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `time_record_justification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JustificationType" AS ENUM ('CHECKIN', 'CHECKOUT');

-- AlterEnum
ALTER TYPE "TimeRecordJustificationStatus" ADD VALUE 'CANCELLED';

-- DropForeignKey
ALTER TABLE "absense_document" DROP CONSTRAINT "absense_document_time_record_justification_id_fkey";

-- DropIndex
DROP INDEX "time_record_justification_absense_document_id_key";

-- AlterTable
ALTER TABLE "time_record_justification" DROP COLUMN "absense_document_id",
DROP COLUMN "updated_check_in_timestamp",
DROP COLUMN "updated_check_out_timestamp",
ADD COLUMN     "justification_type" "JustificationType" NOT NULL,
ADD COLUMN     "status" "TimeRecordJustificationStatus" NOT NULL,
ADD COLUMN     "time_record_id" INTEGER NOT NULL,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "absense_document_time_record_justification_id_key" ON "absense_document"("time_record_justification_id");

-- CreateIndex
CREATE UNIQUE INDEX "time_record_justification_time_record_id_id_key" ON "time_record_justification"("time_record_id", "id");

-- AddForeignKey
ALTER TABLE "absense_document" ADD CONSTRAINT "absense_document_time_record_justification_id_fkey" FOREIGN KEY ("time_record_justification_id") REFERENCES "time_record_justification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_record_justification" ADD CONSTRAINT "time_record_justification_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_record_justification" ADD CONSTRAINT "time_record_justification_time_record_id_fkey" FOREIGN KEY ("time_record_id") REFERENCES "time_record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
