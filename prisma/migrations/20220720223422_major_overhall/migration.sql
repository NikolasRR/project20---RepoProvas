/*
  Warnings:

  - You are about to drop the column `instructor_id` on the `tests` table. All the data in the column will be lost.
  - You are about to drop the `instructors` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `term_id` to the `diciplines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacher_id` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_instructor_id_fkey";

-- AlterTable
ALTER TABLE "diciplines" ADD COLUMN     "term_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tests" DROP COLUMN "instructor_id",
ADD COLUMN     "teacher_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "instructors";

-- CreateTable
CREATE TABLE "terms" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "terms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teachers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeacherDicipline" (
    "id" SERIAL NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "dicipline_id" INTEGER NOT NULL,

    CONSTRAINT "TeacherDicipline_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "diciplines" ADD CONSTRAINT "diciplines_term_id_fkey" FOREIGN KEY ("term_id") REFERENCES "terms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherDicipline" ADD CONSTRAINT "TeacherDicipline_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherDicipline" ADD CONSTRAINT "TeacherDicipline_dicipline_id_fkey" FOREIGN KEY ("dicipline_id") REFERENCES "diciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
