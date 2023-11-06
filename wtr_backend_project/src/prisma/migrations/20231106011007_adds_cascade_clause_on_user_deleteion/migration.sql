-- DropForeignKey
ALTER TABLE "time_record" DROP CONSTRAINT "time_record_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_project_role" DROP CONSTRAINT "user_project_role_user_id_fkey";

-- AddForeignKey
ALTER TABLE "user_project_role" ADD CONSTRAINT "user_project_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_record" ADD CONSTRAINT "time_record_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
