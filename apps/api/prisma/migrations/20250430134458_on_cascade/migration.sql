-- DropForeignKey
ALTER TABLE "lessons" DROP CONSTRAINT "lessons_course_id_fkey";

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
