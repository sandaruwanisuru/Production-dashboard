/*
  Warnings:

  - You are about to drop the column `endedAt` on the `production` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` ALTER COLUMN `createdAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `production` DROP COLUMN `endedAt`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'user',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
