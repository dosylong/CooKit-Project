-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "authorId" TEXT,
    "difficultId" INTEGER,
    "name" TEXT,
    "instruction" TEXT,
    "prepTime" DOUBLE PRECISION,
    "cookTime" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Difficulty" (
    "id" SERIAL NOT NULL,
    "difficult" TEXT,

    CONSTRAINT "Difficulty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "recipeId" INTEGER,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("userFirebaseId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_difficultId_fkey" FOREIGN KEY ("difficultId") REFERENCES "Difficulty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;
