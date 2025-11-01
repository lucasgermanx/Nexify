-- CreateTable
CREATE TABLE `posts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_reference` VARCHAR(191) NOT NULL,
    `post_reference` VARCHAR(191) NOT NULL,
    `store_reference` VARCHAR(191) NOT NULL,
    `post_title` VARCHAR(191) NOT NULL,
    `post_description` VARCHAR(191) NOT NULL,
    `post_image` LONGBLOB NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `posts_post_reference_key`(`post_reference`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
