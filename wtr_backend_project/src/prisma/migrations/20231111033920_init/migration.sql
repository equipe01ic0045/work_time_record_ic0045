-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MANAGER', 'USER');

-- CreateEnum
CREATE TYPE "JustificationReviewStatus" AS ENUM ('APPROVED', 'PENDING', 'DENIED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "JustificationType" AS ENUM ('CHECKIN', 'CHECKOUT');

-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "cpf" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "project" (
    "project_id" SERIAL NOT NULL,
    "project_name" TEXT NOT NULL,
    "project_description" TEXT NOT NULL DEFAULT '',
    "owner_id" INTEGER NOT NULL,
    "location_required" BOOLEAN NOT NULL,
    "location" TEXT,
    "timezone" TEXT NOT NULL,
    "commercial_time_required" BOOLEAN NOT NULL,
    "commercial_time_start" INTEGER,
    "commercial_time_end" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_pkey" PRIMARY KEY ("project_id")
);

-- CreateTable
CREATE TABLE "user_project_role" (
    "user_project_role_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,
    "role" "UserRole" NOT NULL,
    "hours_per_week" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "open_check_in" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_project_role_pkey" PRIMARY KEY ("user_project_role_id")
);

-- CreateTable
CREATE TABLE "time_record" (
    "time_record_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,
    "check_in_timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "check_out_timestamp" TIMESTAMP(3),
    "location" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "time_record_pkey" PRIMARY KEY ("time_record_id")
);

-- CreateTable
CREATE TABLE "justification_document" (
    "justification_document_id" SERIAL NOT NULL,
    "document_file" BYTEA NOT NULL,
    "file_name" TEXT NOT NULL,
    "justification_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "justification_document_pkey" PRIMARY KEY ("justification_document_id")
);

-- CreateTable
CREATE TABLE "time_record_justification" (
    "justification_id" SERIAL NOT NULL,
    "colaborator_id" INTEGER NOT NULL,
    "reviewer_id" INTEGER,
    "project_id" INTEGER NOT NULL,
    "time_record_id" INTEGER NOT NULL,
    "status" "JustificationReviewStatus" NOT NULL,
    "user_message" TEXT,
    "manager_message" TEXT,
    "justification_type" "JustificationType" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "updated_location" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "time_record_justification_pkey" PRIMARY KEY ("justification_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_cpf_key" ON "user"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "project_project_name_key" ON "project"("project_name");

-- CreateIndex
CREATE UNIQUE INDEX "user_project_role_user_id_project_id_key" ON "user_project_role"("user_id", "project_id");

-- CreateIndex
CREATE UNIQUE INDEX "justification_document_justification_id_key" ON "justification_document"("justification_id");

-- CreateIndex
CREATE UNIQUE INDEX "time_record_justification_reviewer_id_key" ON "time_record_justification"("reviewer_id");

-- CreateIndex
CREATE UNIQUE INDEX "time_record_justification_justification_id_reviewer_id_key" ON "time_record_justification"("justification_id", "reviewer_id");

-- CreateIndex
CREATE UNIQUE INDEX "time_record_justification_justification_id_time_record_id_key" ON "time_record_justification"("justification_id", "time_record_id");

-- AddForeignKey
ALTER TABLE "user_project_role" ADD CONSTRAINT "user_project_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_project_role" ADD CONSTRAINT "user_project_role_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_record" ADD CONSTRAINT "time_record_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_record" ADD CONSTRAINT "time_record_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "justification_document" ADD CONSTRAINT "justification_document_justification_id_fkey" FOREIGN KEY ("justification_id") REFERENCES "time_record_justification"("justification_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_record_justification" ADD CONSTRAINT "time_record_justification_colaborator_id_fkey" FOREIGN KEY ("colaborator_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_record_justification" ADD CONSTRAINT "time_record_justification_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_record_justification" ADD CONSTRAINT "time_record_justification_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_record_justification" ADD CONSTRAINT "time_record_justification_time_record_id_fkey" FOREIGN KEY ("time_record_id") REFERENCES "time_record"("time_record_id") ON DELETE RESTRICT ON UPDATE CASCADE;
