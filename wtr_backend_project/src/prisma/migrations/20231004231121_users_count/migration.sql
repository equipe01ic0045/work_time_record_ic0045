/*
  Warnings:

  - Added the required column `commercial_time_required` to the `project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_required` to the `project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timezone` to the `project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `users_count` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project" ADD COLUMN     "commercial_time_end" INTEGER,
ADD COLUMN     "commercial_time_required" BOOLEAN NOT NULL,
ADD COLUMN     "commercial_time_start" INTEGER,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "location_required" BOOLEAN NOT NULL,
ADD COLUMN     "timezone" TEXT NOT NULL,
ADD COLUMN     "users_count" INTEGER NOT NULL;
