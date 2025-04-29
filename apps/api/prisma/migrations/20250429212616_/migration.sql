/*
  Warnings:

  - You are about to drop the column `progress` on the `course_progress` table. All the data in the column will be lost.
  - You are about to drop the `lesson_progress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "lesson_progress" DROP CONSTRAINT "lesson_progress_lesson_id_fkey";

-- DropForeignKey
ALTER TABLE "lesson_progress" DROP CONSTRAINT "lesson_progress_user_id_fkey";

-- AlterTable
ALTER TABLE "course_progress" DROP COLUMN "progress";

-- DropTable
DROP TABLE "lesson_progress";
