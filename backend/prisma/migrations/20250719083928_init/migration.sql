-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserProfile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `telegram` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL,

    UNIQUE INDEX `UserProfile_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Listing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `link` VARCHAR(191) NOT NULL,
    `ad_name` VARCHAR(191) NOT NULL,
    `brand_id` INTEGER NOT NULL,
    `model_id` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `previous_price` INTEGER NULL,
    `price_changed_at` DATETIME(3) NULL,
    `mileage` INTEGER NOT NULL,
    `power` INTEGER NOT NULL,
    `type_id` INTEGER NOT NULL,
    `gearbox_id` INTEGER NOT NULL,
    `fuel_id` INTEGER NOT NULL,
    `source_site_id` INTEGER NOT NULL,
    `photo_url` VARCHAR(191) NOT NULL,
    `parsed_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `archived` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Listing_link_key`(`link`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSearchFilter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `brand_id` INTEGER NULL,
    `model_id` INTEGER NULL,
    `min_price` DOUBLE NULL,
    `max_price` DOUBLE NULL,
    `min_mileage` INTEGER NULL,
    `max_mileage` INTEGER NULL,
    `min_year` INTEGER NULL,
    `max_year` INTEGER NULL,
    `type_id` INTEGER NULL,
    `gearbox_id` INTEGER NULL,
    `fuel_id` INTEGER NULL,
    `min_power` DOUBLE NULL,
    `max_power` DOUBLE NULL,
    `telegram` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NotificationQueue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `listing_id` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `sent` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `NotificationQueue_user_id_listing_id_type_key`(`user_id`, `listing_id`, `type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarBrand` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarModel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `brand_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FuelType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GearboxType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SourceSite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `photo_url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserProfile` ADD CONSTRAINT `UserProfile_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Listing` ADD CONSTRAINT `Listing_brand_id_fkey` FOREIGN KEY (`brand_id`) REFERENCES `CarBrand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Listing` ADD CONSTRAINT `Listing_model_id_fkey` FOREIGN KEY (`model_id`) REFERENCES `CarModel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Listing` ADD CONSTRAINT `Listing_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `CarType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Listing` ADD CONSTRAINT `Listing_gearbox_id_fkey` FOREIGN KEY (`gearbox_id`) REFERENCES `GearboxType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Listing` ADD CONSTRAINT `Listing_fuel_id_fkey` FOREIGN KEY (`fuel_id`) REFERENCES `FuelType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Listing` ADD CONSTRAINT `Listing_source_site_id_fkey` FOREIGN KEY (`source_site_id`) REFERENCES `SourceSite`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSearchFilter` ADD CONSTRAINT `UserSearchFilter_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSearchFilter` ADD CONSTRAINT `UserSearchFilter_brand_id_fkey` FOREIGN KEY (`brand_id`) REFERENCES `CarBrand`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSearchFilter` ADD CONSTRAINT `UserSearchFilter_model_id_fkey` FOREIGN KEY (`model_id`) REFERENCES `CarModel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSearchFilter` ADD CONSTRAINT `UserSearchFilter_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `CarType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSearchFilter` ADD CONSTRAINT `UserSearchFilter_gearbox_id_fkey` FOREIGN KEY (`gearbox_id`) REFERENCES `GearboxType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSearchFilter` ADD CONSTRAINT `UserSearchFilter_fuel_id_fkey` FOREIGN KEY (`fuel_id`) REFERENCES `FuelType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NotificationQueue` ADD CONSTRAINT `NotificationQueue_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NotificationQueue` ADD CONSTRAINT `NotificationQueue_listing_id_fkey` FOREIGN KEY (`listing_id`) REFERENCES `Listing`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarModel` ADD CONSTRAINT `CarModel_brand_id_fkey` FOREIGN KEY (`brand_id`) REFERENCES `CarBrand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
