/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `credentials` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "credentials_id_userId_key" ON "credentials"("id", "userId");
