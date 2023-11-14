-- AddForeignKey
ALTER TABLE "time_record_justification" ADD CONSTRAINT "time_record_justification_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;
