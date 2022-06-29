-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_authorId_fkey";

-- DropIndex
DROP INDEX "Recipe_authorId_key";

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("userFirebaseId") ON DELETE CASCADE ON UPDATE CASCADE;
