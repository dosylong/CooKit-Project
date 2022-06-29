/*
  Warnings:

  - You are about to alter the column `prepTime` on the `Recipe` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `cookTime` on the `Recipe` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "prepTime" SET DATA TYPE INTEGER,
ALTER COLUMN "cookTime" SET DATA TYPE INTEGER;
