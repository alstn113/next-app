/*
  Warnings:

  - A unique constraint covering the columns `[postId]` on the table `PostStats` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postId` to the `PostStats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PostStats` ADD COLUMN `commentCounts` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `likes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `postId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `PostStats_postId_key` ON `PostStats`(`postId`);

-- CreateIndex
CREATE UNIQUE INDEX `Tag_name_key` ON `Tag`(`name`);

-- AddForeignKey
ALTER TABLE `PostStats` ADD CONSTRAINT `PostStats_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
