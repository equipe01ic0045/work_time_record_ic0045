/*
  Warnings:

  - Changed the type of `document_file` on the `documents` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "documents" DROP COLUMN "document_file",
ADD COLUMN     "document_file" BYTEA NOT NULL;
