/*
  Warnings:

  - You are about to drop the column `epxiredOtp` on the `AuthDetail` table. All the data in the column will be lost.
  - You are about to drop the column `otpVerification` on the `AuthDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `AuthDetail` DROP COLUMN `epxiredOtp`,
    DROP COLUMN `otpVerification`;

-- CreateTable
CREATE TABLE `OtpCode` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `otp` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `authDetailId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OtpCode` ADD CONSTRAINT `OtpCode_authDetailId_fkey` FOREIGN KEY (`authDetailId`) REFERENCES `AuthDetail`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
