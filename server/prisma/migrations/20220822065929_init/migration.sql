-- AlterTable
ALTER TABLE `Comment` ADD COLUMN `parentCommentId` VARCHAR(191) NULL,
    ADD COLUMN `subCommentsCount` INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_parentCommentId_fkey` FOREIGN KEY (`parentCommentId`) REFERENCES `Comment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
