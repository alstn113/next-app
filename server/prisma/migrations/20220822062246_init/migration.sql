/*
  Warnings:

  - You are about to drop the column `likes` on the `PostStats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `PostStats` DROP COLUMN `likes`,
    ADD COLUMN `postLikes` INTEGER NOT NULL DEFAULT 0;
