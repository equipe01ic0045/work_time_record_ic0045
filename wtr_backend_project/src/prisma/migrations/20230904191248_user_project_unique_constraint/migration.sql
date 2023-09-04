/*
  Warnings:

  - A unique constraint covering the columns `[user_id,project_id]` on the table `user_project_role` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_project_role_user_id_project_id_key" ON "user_project_role"("user_id", "project_id");
