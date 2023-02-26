/*
  Warnings:

  - Added the required column `categoriaId` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagen` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precio` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `producto` ADD COLUMN `categoriaId` INTEGER NOT NULL,
    ADD COLUMN `imagen` VARCHAR(191) NOT NULL,
    ADD COLUMN `nombre` VARCHAR(191) NOT NULL,
    ADD COLUMN `precio` DOUBLE NOT NULL;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `icono` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
