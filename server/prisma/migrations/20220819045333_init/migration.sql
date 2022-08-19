-- DropIndex
DROP INDEX `PostLike_userId_fkey` ON `PostLike`;

-- AlterTable
ALTER TABLE `Comment` ADD COLUMN `likes` INTEGER NOT NULL DEFAULT 0;
