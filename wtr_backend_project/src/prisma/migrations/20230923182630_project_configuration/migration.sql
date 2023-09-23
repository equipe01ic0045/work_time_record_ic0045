/*
  Warnings:

  - A unique constraint covering the columns `[project_name]` on the table `project` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user_project_role" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "project_configurations" (
    "project_id" SERIAL NOT NULL,
    "project_documents" BOOLEAN NOT NULL,
    "project_time_interval" TIMESTAMP(3) NOT NULL,
    "project_time_start" TIMESTAMP(3) NOT NULL,
    "project_time_end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_configurations_pkey" PRIMARY KEY ("project_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "project_project_name_key" ON "project"("project_name");

-- AddForeignKey
ALTER TABLE "project_configurations" ADD CONSTRAINT "project_configurations_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;
