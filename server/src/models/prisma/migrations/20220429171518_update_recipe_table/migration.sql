/*
  Warnings:

  - A unique constraint covering the columns `[recipeSlug]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "recipeSlug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_recipeSlug_key" ON "Recipe"("recipeSlug");
