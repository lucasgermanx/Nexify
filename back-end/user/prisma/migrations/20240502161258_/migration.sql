-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_reference` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL,
    `user_discord` VARCHAR(191) NOT NULL,
    `status` ENUM('pending', 'active', 'blocked', 'banned', 'suspense') NOT NULL DEFAULT 'pending',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Users_user_reference_key`(`user_reference`),
    UNIQUE INDEX `Users_email_key`(`email`),
    UNIQUE INDEX `Users_user_discord_key`(`user_discord`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AccountActivationToken` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_reference` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `token_used` BOOLEAN NOT NULL DEFAULT false,
    `tokens_old` VARCHAR(191) NULL,
    `resent` BOOLEAN NOT NULL DEFAULT false,
    `times_resent` INTEGER NOT NULL DEFAULT 0,
    `token_expired` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AccountActivationToken_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecoverTokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_reference` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `token_used` BOOLEAN NOT NULL DEFAULT false,
    `tokens_old` VARCHAR(191) NULL,
    `resent` BOOLEAN NOT NULL DEFAULT false,
    `times_resent` INTEGER NOT NULL DEFAULT 0,
    `token_expired` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `RecoverTokens_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AccountActivationToken` ADD CONSTRAINT `AccountActivationToken_user_reference_fkey` FOREIGN KEY (`user_reference`) REFERENCES `Users`(`user_reference`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecoverTokens` ADD CONSTRAINT `RecoverTokens_user_reference_fkey` FOREIGN KEY (`user_reference`) REFERENCES `Users`(`user_reference`) ON DELETE RESTRICT ON UPDATE CASCADE;
