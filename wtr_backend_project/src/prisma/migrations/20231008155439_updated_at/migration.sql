/*
  Warnings:

  - You are about to drop the column `open_check_in` on the `time_record` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "time_record" DROP COLUMN "open_check_in",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
