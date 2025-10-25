/*
  Warnings:

  - The `conditions` column on the `Character` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "conditions",
ADD COLUMN     "conditions" BOOLEAN[] DEFAULT ARRAY[]::BOOLEAN[];
