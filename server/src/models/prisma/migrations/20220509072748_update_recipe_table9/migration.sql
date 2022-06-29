-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "authorId" TEXT;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("userFirebaseId") ON DELETE CASCADE ON UPDATE CASCADE;
