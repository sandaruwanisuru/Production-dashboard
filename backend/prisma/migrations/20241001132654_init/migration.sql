/*
  Warnings:

  - You are about to drop the column `orderId` on the `production` table. All the data in the column will be lost.
  - You are about to drop the column `remainingQuantity` on the `production` table. All the data in the column will be lost.
  - Added the required column `size` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Production` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Production` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `production` DROP FOREIGN KEY `Production_orderId_fkey`;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `size` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `production` DROP COLUMN `orderId`,
    DROP COLUMN `remainingQuantity`,
    ADD COLUMN `quantity` INTEGER NOT NULL,
    ADD COLUMN `size` VARCHAR(191) NOT NULL;
