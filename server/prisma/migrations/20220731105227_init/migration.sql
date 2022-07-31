/*
  Warnings:

  - You are about to drop the column `hashedRt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `hashedRt`,
    DROP COLUMN `provider`;
