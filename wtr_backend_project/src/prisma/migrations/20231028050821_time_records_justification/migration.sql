/*
  Warnings:

  - The primary key for the `absense_document` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `absense_document_id` on the `absense_document` table. All the data in the column will be lost.
  - You are about to drop the column `time_record_id` on the `absense_document` table. All the data in the column will be lost.
  - The primary key for the `project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `project_id` on the `project` table. All the data in the column will be lost.
  - The primary key for the `time_record` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `time_record_id` on the `time_record` table. All the data in the column will be lost.
  - You are about to drop the column `user_message` on the `time_record` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `user` table. All the data in the column will be lost.
  - The primary key for the `user_project_role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_project_role_id` on the `user_project_role` table. All the data in the column will be lost.
  - Added the required column `file_name` to the `absense_document` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TimeRecordJustificationStatus" AS ENUM ('APPROVED', 'DENIED', 'PENDING');

-- DropForeignKey
ALTER TABLE "absense_document" DROP CONSTRAINT "absense_document_absense_document_id_fkey";

-- DropForeignKey
ALTER TABLE "time_record" DROP CONSTRAINT "time_record_project_id_fkey";

-- DropForeignKey
ALTER TABLE "time_record" DROP CONSTRAINT "time_record_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_project_role" DROP CONSTRAINT "user_project_role_project_id_fkey";

-- DropForeignKey
ALTER TABLE "user_project_role" DROP CONSTRAINT "user_project_role_user_id_fkey";

-- AlterTable
ALTER TABLE "absense_document" DROP CONSTRAINT "absense_document_pkey",
DROP COLUMN "absense_document_id",
DROP COLUMN "time_record_id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "file_name" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "absense_document_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "project" DROP CONSTRAINT "project_pkey",
DROP COLUMN "project_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "project_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "time_record" DROP CONSTRAINT "time_record_pkey",
DROP COLUMN "time_record_id",
DROP COLUMN "user_message",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "time_record_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user_project_role" DROP CONSTRAINT "user_project_role_pkey",
DROP COLUMN "user_project_role_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "user_project_role_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "time_record_justification" (
    "id" SERIAL NOT NULL,
    "colaborator_id" INTEGER NOT NULL,
    "project_manager_id" INTEGER NOT NULL,
    "absense_document_id" INTEGER NOT NULL,
    "user_message" TEXT,
    "updated_check_in_timestamp" TIMESTAMP(3),
    "updated_check_out_timestamp" TIMESTAMP(3),
    "updated_location" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "time_record_justification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "time_record_justification_colaborator_id_key" ON "time_record_justification"("colaborator_id");

-- CreateIndex
CREATE UNIQUE INDEX "time_record_justification_project_manager_id_key" ON "time_record_justification"("project_manager_id");

-- AddForeignKey
ALTER TABLE "user_project_role" ADD CONSTRAINT "user_project_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_project_role" ADD CONSTRAINT "user_project_role_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_record" ADD CONSTRAINT "time_record_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_record" ADD CONSTRAINT "time_record_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_record_justification" ADD CONSTRAINT "time_record_justification_colaborator_id_fkey" FOREIGN KEY ("colaborator_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_record_justification" ADD CONSTRAINT "time_record_justification_project_manager_id_fkey" FOREIGN KEY ("project_manager_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_record_justification" ADD CONSTRAINT "time_record_justification_absense_document_id_fkey" FOREIGN KEY ("absense_document_id") REFERENCES "absense_document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
