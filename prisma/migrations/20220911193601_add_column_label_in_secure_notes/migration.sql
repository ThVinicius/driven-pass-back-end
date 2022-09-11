/*
  Warnings:

  - A unique constraint covering the columns `[userId,label]` on the table `segureNotes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `label` to the `segureNotes` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "segureNotes_userId_title_key";

-- AlterTable
ALTER TABLE "segureNotes" ADD COLUMN     "label" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "segureNotes_userId_label_key" ON "segureNotes"("userId", "label");
