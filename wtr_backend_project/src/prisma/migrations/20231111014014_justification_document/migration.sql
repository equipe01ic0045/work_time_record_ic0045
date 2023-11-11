/*
  Warnings:

  - You are about to drop the `absense_document` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `status` on the `time_record_justification` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "JustificationReviewStatus" AS ENUM ('APPROVED', 'PENDING', 'DENIED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "absense_document" DROP CONSTRAINT "absense_document_justification_id_fkey";

-- DropForeignKey
ALTER TABLE "absense_document" DROP CONSTRAINT "absense_document_time_record_id_fkey";

-- AlterTable
ALTER TABLE "time_record_justification" DROP COLUMN "status",
ADD COLUMN     "status" "JustificationReviewStatus" NOT NULL;

-- DropTable
DROP TABLE "absense_document";

-- DropEnum
DROP TYPE "TimeRecordJustificationStatus";

-- CreateTable
CREATE TABLE "justification_document" (
    "justification_document_id" SERIAL NOT NULL,
    "document_file" BYTEA NOT NULL,
    "file_name" TEXT NOT NULL,
    "justification_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "justification_document_pkey" PRIMARY KEY ("justification_document_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "justification_document_justification_id_key" ON "justification_document"("justification_id");

-- AddForeignKey
ALTER TABLE "justification_document" ADD CONSTRAINT "justification_document_justification_id_fkey" FOREIGN KEY ("justification_id") REFERENCES "time_record_justification"("justification_id") ON DELETE RESTRICT ON UPDATE CASCADE;
