-- AlterTable
ALTER TABLE "games" ADD COLUMN     "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "type" SET DEFAULT 'game';
