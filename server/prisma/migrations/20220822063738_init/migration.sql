/*
  Warnings:

  - You are about to drop the column `postLikes` on the `PostStats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `PostStats` DROP COLUMN `postLikes`,
    ADD COLUMN `likes` INTEGER NOT NULL DEFAULT 0;
