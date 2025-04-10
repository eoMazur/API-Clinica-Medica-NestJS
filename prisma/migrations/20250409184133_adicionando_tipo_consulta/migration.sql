/*
  Warnings:

  - You are about to drop the column `tipoConsulta` on the `consultas` table. All the data in the column will be lost.
  - Added the required column `idTipoConsulta` to the `consultas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `consultas` DROP COLUMN `tipoConsulta`,
    ADD COLUMN `idTipoConsulta` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `TipoConsulta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `valor` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `consultas` ADD CONSTRAINT `consultas_idTipoConsulta_fkey` FOREIGN KEY (`idTipoConsulta`) REFERENCES `TipoConsulta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
