-- DropForeignKey
ALTER TABLE "time_record" DROP CONSTRAINT "time_record_project_id_fkey";

-- DropForeignKey
ALTER TABLE "time_record_justification" DROP CONSTRAINT "time_record_justification_project_id_fkey";

-- AddForeignKey
ALTER TABLE "time_record" ADD CONSTRAINT "time_record_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_record_justification" ADD CONSTRAINT "time_record_justification_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE CASCADE ON UPDATE CASCADE;
