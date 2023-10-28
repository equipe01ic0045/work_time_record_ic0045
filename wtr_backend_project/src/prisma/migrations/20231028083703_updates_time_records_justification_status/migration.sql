/*
  Warnings:

  - Added the required column `status` to the `time_record_justification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "TimeRecordJustificationStatus" ADD VALUE 'CANCELLED';

-- AlterTable
ALTER TABLE "time_record_justification" ADD COLUMN     "status" "TimeRecordJustificationStatus" NOT NULL;
