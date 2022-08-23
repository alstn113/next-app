/*
  Warnings:

  - You are about to drop the column `commentCounts` on the `PostStats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `PostStats` DROP COLUMN `commentCounts`,
    ADD COLUMN `commentsCount` INTEGER NOT NULL DEFAULT 0;
