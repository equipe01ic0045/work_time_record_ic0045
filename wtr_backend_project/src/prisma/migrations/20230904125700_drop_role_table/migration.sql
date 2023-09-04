/*
  Warnings:

  - You are about to drop the column `role_id` on the `user_project_role` table. All the data in the column will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `user_project_role` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MANAGER', 'USER');

-- DropForeignKey
ALTER TABLE "user_project_role" DROP CONSTRAINT "user_project_role_role_id_fkey";

-- AlterTable
ALTER TABLE "user_project_role" DROP COLUMN "role_id",
ADD COLUMN     "role" "UserRole" NOT NULL;

-- DropTable
DROP TABLE "role";
