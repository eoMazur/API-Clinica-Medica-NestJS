/*
  Warnings:

  - You are about to alter the column `cargo` on the `pacientes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `pacientes` MODIFY `cargo` INTEGER NOT NULL DEFAULT 1;
