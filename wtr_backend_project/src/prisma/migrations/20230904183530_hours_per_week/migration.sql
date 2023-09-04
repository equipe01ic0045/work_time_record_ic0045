/*
  Warnings:

  - Added the required column `hours_per_week` to the `user_project_role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_project_role" ADD COLUMN     "hours_per_week" INTEGER NOT NULL;
