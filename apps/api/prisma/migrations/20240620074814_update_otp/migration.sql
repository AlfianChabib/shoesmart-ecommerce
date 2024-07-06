/*
  Warnings:

  - You are about to drop the `OtpCode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `OtpCode` DROP FOREIGN KEY `OtpCode_authDetailId_fkey`;

-- DropTable
DROP TABLE `OtpCode`;

-- CreateTable
CREATE TABLE `Otp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `authDetailId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Otp` ADD CONSTRAINT `Otp_authDetailId_fkey` FOREIGN KEY (`authDetailId`) REFERENCES `AuthDetail`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
