/*
  Warnings:

  - You are about to drop the column `time_record_justification_id` on the `absense_document` table. All the data in the column will be lost.
  - The primary key for the `time_record_justification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `approver_id` on the `time_record_justification` table. All the data in the column will be lost.
  - You are about to drop the column `time_record_justification_id` on the `time_record_justification` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[justification_id]` on the table `absense_document` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reviewer_id]` on the table `time_record_justification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[justification_id,reviewer_id]` on the table `time_record_justification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[justification_id,time_record_id]` on the table `time_record_justification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `justification_id` to the `absense_document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "absense_document" DROP CONSTRAINT "absense_document_time_record_justification_id_fkey";

-- DropForeignKey
ALTER TABLE "time_record_justification" DROP CONSTRAINT "time_record_justification_approver_id_fkey";

-- DropIndex
DROP INDEX "absense_document_time_record_justification_id_key";

-- DropIndex
DROP INDEX "time_record_justification_approver_id_key";

-- DropIndex
DROP INDEX "time_record_justification_time_record_justification_id_appr_key";

-- DropIndex
DROP INDEX "time_record_justification_time_record_justification_id_time_key";

-- AlterTable
ALTER TABLE "absense_document" DROP COLUMN "time_record_justification_id",
ADD COLUMN     "justification_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "time_record_justification" DROP CONSTRAINT "time_record_justification_pkey",
DROP COLUMN "approver_id",
DROP COLUMN "time_record_justification_id",
ADD COLUMN     "justification_id" SERIAL NOT NULL,
ADD COLUMN     "reviewer_id" INTEGER,
ADD CONSTRAINT "time_record_justification_pkey" PRIMARY KEY ("justification_id");

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "cpf" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "absense_document_justification_id_key" ON "absense_document"("justification_id");

-- CreateIndex
CREATE UNIQUE INDEX "time_record_justification_reviewer_id_key" ON "time_record_justification"("reviewer_id");

-- CreateIndex
CREATE UNIQUE INDEX "time_record_justification_justification_id_reviewer_id_key" ON "time_record_justification"("justification_id", "reviewer_id");

-- CreateIndex
CREATE UNIQUE INDEX "time_record_justification_justification_id_time_record_id_key" ON "time_record_justification"("justification_id", "time_record_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_cpf_key" ON "user"("cpf");

-- AddForeignKey
ALTER TABLE "absense_document" ADD CONSTRAINT "absense_document_justification_id_fkey" FOREIGN KEY ("justification_id") REFERENCES "time_record_justification"("justification_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_record_justification" ADD CONSTRAINT "time_record_justification_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
