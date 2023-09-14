/*
  Warnings:

  - You are about to drop the column `document_id` on the `time_record` table. All the data in the column will be lost.
  - You are about to drop the `documents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "documents" DROP CONSTRAINT "documents_document_id_fkey";

-- AlterTable
ALTER TABLE "time_record" DROP COLUMN "document_id",
ADD COLUMN     "user_message" TEXT,
ALTER COLUMN "check_in_timestamp" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "check_out_timestamp" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL;

-- DropTable
DROP TABLE "documents";

-- CreateTable
CREATE TABLE "absense_document" (
    "absense_document_id" SERIAL NOT NULL,
    "time_record_id" INTEGER NOT NULL,
    "document_file" BYTEA NOT NULL,

    CONSTRAINT "absense_document_pkey" PRIMARY KEY ("absense_document_id")
);

-- AddForeignKey
ALTER TABLE "absense_document" ADD CONSTRAINT "absense_document_absense_document_id_fkey" FOREIGN KEY ("absense_document_id") REFERENCES "time_record"("time_record_id") ON DELETE RESTRICT ON UPDATE CASCADE;
