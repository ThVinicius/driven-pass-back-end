/*
  Warnings:

  - You are about to alter the column `title` on the `segureNotes` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `annotation` on the `segureNotes` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.

*/
-- AlterTable
ALTER TABLE "segureNotes" ALTER COLUMN "title" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "annotation" SET DATA TYPE VARCHAR(1000);
