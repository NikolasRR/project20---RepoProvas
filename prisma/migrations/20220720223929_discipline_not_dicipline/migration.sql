/*
  Warnings:

  - You are about to drop the column `dicipline_id` on the `teachersDiciplines` table. All the data in the column will be lost.
  - You are about to drop the column `dicipline_id` on the `tests` table. All the data in the column will be lost.
  - You are about to drop the `diciplines` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `discipline_id` to the `teachersDiciplines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discipline_id` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "diciplines" DROP CONSTRAINT "diciplines_term_id_fkey";

-- DropForeignKey
ALTER TABLE "teachersDiciplines" DROP CONSTRAINT "teachersDiciplines_dicipline_id_fkey";

-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_dicipline_id_fkey";

-- AlterTable
ALTER TABLE "teachersDiciplines" DROP COLUMN "dicipline_id",
ADD COLUMN     "discipline_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tests" DROP COLUMN "dicipline_id",
ADD COLUMN     "discipline_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "diciplines";

-- CreateTable
CREATE TABLE "disciplines" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "term_id" INTEGER NOT NULL,

    CONSTRAINT "disciplines_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "disciplines_name_key" ON "disciplines"("name");

-- AddForeignKey
ALTER TABLE "disciplines" ADD CONSTRAINT "disciplines_term_id_fkey" FOREIGN KEY ("term_id") REFERENCES "terms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachersDiciplines" ADD CONSTRAINT "teachersDiciplines_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
