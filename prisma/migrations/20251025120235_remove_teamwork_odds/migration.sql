/*
  Warnings:

  - You are about to drop the column `odds` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `teamwork` on the `Character` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "odds",
DROP COLUMN "teamwork";
