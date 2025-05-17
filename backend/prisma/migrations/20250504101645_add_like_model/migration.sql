/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `prefectureId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "prefectureId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Test";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_prefectureId_fkey" FOREIGN KEY ("prefectureId") REFERENCES "Prefecture"("id") ON DELETE CASCADE ON UPDATE CASCADE;
