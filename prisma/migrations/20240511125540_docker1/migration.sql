-- AlterTable
ALTER TABLE "DataContainerState" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "DataContainerState_createdAt_idx" ON "DataContainerState"("createdAt");
