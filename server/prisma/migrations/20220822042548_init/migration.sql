/*
  Warnings:

  - You are about to drop the `PostsOnTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `PostsOnTags` DROP FOREIGN KEY `PostsOnTags_postId_fkey`;

-- DropForeignKey
ALTER TABLE `PostsOnTags` DROP FOREIGN KEY `PostsOnTags_tagId_fkey`;

-- DropTable
DROP TABLE `PostsOnTags`;

-- CreateTable
CREATE TABLE `PostTags` (
    `postId` VARCHAR(191) NOT NULL,
    `tagId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`postId`, `tagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PostTags` ADD CONSTRAINT `PostTags_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostTags` ADD CONSTRAINT `PostTags_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
