/*
  Warnings:

  - You are about to drop the `TeacherDicipline` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TeacherDicipline" DROP CONSTRAINT "TeacherDicipline_dicipline_id_fkey";

-- DropForeignKey
ALTER TABLE "TeacherDicipline" DROP CONSTRAINT "TeacherDicipline_teacher_id_fkey";

-- DropTable
DROP TABLE "TeacherDicipline";

-- CreateTable
CREATE TABLE "teachersDiciplines" (
    "id" SERIAL NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "dicipline_id" INTEGER NOT NULL,

    CONSTRAINT "teachersDiciplines_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "teachersDiciplines" ADD CONSTRAINT "teachersDiciplines_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachersDiciplines" ADD CONSTRAINT "teachersDiciplines_dicipline_id_fkey" FOREIGN KEY ("dicipline_id") REFERENCES "diciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
