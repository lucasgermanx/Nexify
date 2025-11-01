-- CreateTable
CREATE TABLE `Stores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_reference` VARCHAR(191) NOT NULL,
    `store_reference` VARCHAR(191) NOT NULL,
    `store_name` VARCHAR(191) NOT NULL,
    `store_subdomain` VARCHAR(191) NOT NULL,
    `store_domain` VARCHAR(191) NULL,
    `store_status` ENUM('activated', 'cancelled', 'expired', 'disabled') NOT NULL DEFAULT 'activated',
    `store_plan` VARCHAR(191) NOT NULL,
    `store_money_type` ENUM('BRL', 'USD', 'EUR') NOT NULL DEFAULT 'BRL',
    `store_trial` BOOLEAN NOT NULL DEFAULT true,
    `store_token` VARCHAR(191) NOT NULL,
    `maintenance` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Stores_store_reference_key`(`store_reference`),
    UNIQUE INDEX `Stores_store_subdomain_key`(`store_subdomain`),
    UNIQUE INDEX `Stores_store_domain_key`(`store_domain`),
    UNIQUE INDEX `Stores_store_token_key`(`store_token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contents` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `store_reference` VARCHAR(191) NOT NULL,
    `logo` LONGTEXT NULL,
    `favicon` LONGTEXT NULL,
    `banner` LONGTEXT NULL,
    `title` VARCHAR(191) NULL DEFAULT 'Loja FiveMarket',
    `description` VARCHAR(191) NULL DEFAULT 'Altere a descrição em seu painel na área de edição de template',
    `widget_discord` VARCHAR(191) NULL DEFAULT '776623816339619840',
    `widget_fiveM` VARCHAR(191) NULL DEFAULT 'fivemarket.com.br',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Contents_store_reference_key`(`store_reference`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Partials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `store_reference` VARCHAR(191) NOT NULL,
    `header` LONGTEXT NULL,
    `body` LONGTEXT NULL,
    `footer` LONGTEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscriptions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` VARCHAR(191) NOT NULL,
    `store_reference` VARCHAR(191) NOT NULL,
    `subscription_id` VARCHAR(191) NOT NULL,
    `cycle` ENUM('MONTHLY') NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'EXPIRED') NOT NULL DEFAULT 'ACTIVE',
    `value` DOUBLE NOT NULL,
    `deleted` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `subscriptions_store_reference_key`(`store_reference`),
    UNIQUE INDEX `subscriptions_subscription_id_key`(`subscription_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `invoice_reference` VARCHAR(191) NOT NULL,
    `payment_id` VARCHAR(191) NOT NULL,
    `subscription_id` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'RECEIVED', 'CONFIRMED', 'OVERDUE', 'REFUNDED', 'RECEIVED_IN_CASH', 'REFUND_REQUESTED', 'REFUND_IN_PROGRESS', 'CHARGEBACK_REQUESTED', 'CHARGEBACK_DISPUTE', 'AWAITING_CHARGEBACK_REVERSAL', 'DUNNING_REQUESTED', 'DUNNING_RECEIVED', 'AWAITING_RISK_ANALYSIS') NOT NULL DEFAULT 'PENDING',
    `invoiceUrl` VARCHAR(191) NOT NULL,
    `invoiceNumber` VARCHAR(191) NOT NULL,
    `paymentDate` VARCHAR(191) NOT NULL,
    `creditDate` VARCHAR(191) NOT NULL,
    `transactionReceiptUrl` VARCHAR(191) NOT NULL,
    `refundReceiptUrl` VARCHAR(191) NULL,
    `billingType` VARCHAR(191) NULL,
    `creditCardNumber` INTEGER NULL,
    `creditCardBrand` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `invoices_payment_id_key`(`payment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MercadoPago` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `store_reference` VARCHAR(191) NOT NULL,
    `access_token` LONGTEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `MercadoPago_store_reference_key`(`store_reference`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Picpay` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `store_reference` VARCHAR(191) NOT NULL,
    `picpayToken` LONGTEXT NULL,
    `sellerToken` LONGTEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Picpay_store_reference_key`(`store_reference`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_reference` VARCHAR(191) NOT NULL,
    `store_reference` VARCHAR(191) NOT NULL,
    `product_reference` VARCHAR(191) NOT NULL,
    `product_name` VARCHAR(191) NOT NULL,
    `product_description` LONGTEXT NOT NULL,
    `product_price` VARCHAR(191) NOT NULL,
    `product_price_discount` VARCHAR(191) NOT NULL,
    `product_visibility` VARCHAR(191) NOT NULL,
    `product_stock` INTEGER NOT NULL,
    `expire_day` VARCHAR(191) NOT NULL,
    `product_image` LONGBLOB NOT NULL,
    `variables` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Products_product_reference_key`(`product_reference`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_reference` VARCHAR(191) NOT NULL,
    `store_reference` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `category_slug` VARCHAR(191) NOT NULL,
    `category_icon` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Categories_category_reference_key`(`category_reference`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Variables` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `store_reference` VARCHAR(191) NOT NULL,
    `variable_reference` VARCHAR(191) NOT NULL,
    `variable` VARCHAR(191) NOT NULL,
    `commands` TEXT NOT NULL,
    `option_name` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Variables_variable_reference_key`(`variable_reference`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transaction_reference` VARCHAR(191) NOT NULL,
    `buyer` VARCHAR(191) NOT NULL,
    `store_reference` VARCHAR(191) NOT NULL,
    `product_reference` VARCHAR(191) NOT NULL,
    `price_paid` VARCHAR(191) NOT NULL,
    `coupon` VARCHAR(191) NOT NULL,
    `coupon_discount` DOUBLE NOT NULL,
    `coupon_type` VARCHAR(191) NOT NULL,
    `form_of_payments` VARCHAR(191) NOT NULL,
    `status_payment` ENUM('pending', 'approved', 'authorized', 'in_process', 'in_mediation', 'rejected', 'cancelled', 'refunded', 'charged_back') NOT NULL DEFAULT 'pending',
    `order_delivered` BOOLEAN NOT NULL DEFAULT false,
    `quantity` INTEGER NOT NULL,
    `variable` VARCHAR(191) NOT NULL,
    `automatic_update` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Coupons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `store_reference` VARCHAR(191) NOT NULL,
    `reference` VARCHAR(191) NOT NULL,
    `coupon` VARCHAR(191) NOT NULL,
    `coupon_discount` DOUBLE NOT NULL,
    `limited_used` INTEGER NOT NULL,
    `used` INTEGER NULL DEFAULT 0,
    `type` ENUM('percentage', 'direct') NOT NULL,
    `activated` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Coupons_reference_key`(`reference`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Contents` ADD CONSTRAINT `Contents_store_reference_fkey` FOREIGN KEY (`store_reference`) REFERENCES `Stores`(`store_reference`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Partials` ADD CONSTRAINT `Partials_store_reference_fkey` FOREIGN KEY (`store_reference`) REFERENCES `Contents`(`store_reference`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_subscription_id_fkey` FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions`(`subscription_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MercadoPago` ADD CONSTRAINT `MercadoPago_store_reference_fkey` FOREIGN KEY (`store_reference`) REFERENCES `Stores`(`store_reference`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Picpay` ADD CONSTRAINT `Picpay_store_reference_fkey` FOREIGN KEY (`store_reference`) REFERENCES `Stores`(`store_reference`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_store_reference_fkey` FOREIGN KEY (`store_reference`) REFERENCES `Stores`(`store_reference`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_category_reference_fkey` FOREIGN KEY (`category_reference`) REFERENCES `Categories`(`category_reference`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Categories` ADD CONSTRAINT `Categories_store_reference_fkey` FOREIGN KEY (`store_reference`) REFERENCES `Stores`(`store_reference`) ON DELETE CASCADE ON UPDATE CASCADE;
