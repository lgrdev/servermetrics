/*
  Warnings:

  - You are about to alter the column `avgpercent` on the `data_cpu` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.
  - You are about to alter the column `freepercent` on the `data_disk` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.
  - You are about to alter the column `freepercent` on the `data_memory` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.

*/
-- AlterTable
ALTER TABLE "data_cpu" ALTER COLUMN "avgpercent" SET DATA TYPE DECIMAL(5,2);

-- AlterTable
ALTER TABLE "data_disk" ALTER COLUMN "freepercent" SET DATA TYPE DECIMAL(5,2);

-- AlterTable
ALTER TABLE "data_memory" ALTER COLUMN "freepercent" SET DATA TYPE DECIMAL(5,2);
