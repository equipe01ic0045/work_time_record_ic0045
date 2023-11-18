/*
  Warnings:

  - You are about to drop the column `colaborator_id` on the `time_record_justification` table. All the data in the column will be lost.
  - You are about to drop the column `manager_message` on the `time_record_justification` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `time_record_justification` table. All the data in the column will be lost.
  - You are about to drop the column `updated_location` on the `time_record_justification` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `time_record_justification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "time_record_justification" DROP CONSTRAINT "time_record_justification_colaborator_id_fkey";

-- DropForeignKey
ALTER TABLE "time_record_justification" DROP CONSTRAINT "time_record_justification_project_id_fkey";

-- DropIndex
DROP INDEX "time_record_justification_justification_id_time_record_id_key";

-- DropIndex
DROP INDEX "time_record_justification_reviewer_id_key";

-- AlterTable
ALTER TABLE "time_record_justification" DROP COLUMN "colaborator_id",
DROP COLUMN "manager_message",
DROP COLUMN "timestamp",
DROP COLUMN "updated_location",
ADD COLUMN     "reviewer_message" TEXT,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "time_record_justification" ADD CONSTRAINT "time_record_justification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
