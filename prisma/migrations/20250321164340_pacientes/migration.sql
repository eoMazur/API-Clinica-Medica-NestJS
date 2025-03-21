-- CreateTable
CREATE TABLE `pacientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `cargo` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `pacientes_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
