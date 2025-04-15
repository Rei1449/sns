/*
  Warnings:

  - A unique constraint covering the columns `[followUserId,followedUserId]` on the table `Follow` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Follow_followUserId_followedUserId_key" ON "Follow"("followUserId", "followedUserId");
