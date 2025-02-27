/*
  Warnings:

  - You are about to drop the column `field_id` on the `servers` table. All the data in the column will be lost.
  - Added the required column `game_id` to the `servers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "servers" DROP CONSTRAINT "servers_field_id_fkey";

-- AlterTable
ALTER TABLE "servers" DROP COLUMN "field_id",
ADD COLUMN     "game_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "servers" ADD CONSTRAINT "servers_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;
