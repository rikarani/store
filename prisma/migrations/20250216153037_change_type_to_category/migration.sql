/*
  Warnings:

  - You are about to drop the column `type` on the `games` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "games" DROP COLUMN "type",
ADD COLUMN     "category" VARCHAR(255) NOT NULL DEFAULT 'game';
