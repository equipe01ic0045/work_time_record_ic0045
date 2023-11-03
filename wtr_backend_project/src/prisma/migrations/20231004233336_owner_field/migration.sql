/*
  Warnings:

  - Added the required column `owner_id` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project" ADD COLUMN     "owner_id" INTEGER NOT NULL,
ALTER COLUMN "users_count" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
