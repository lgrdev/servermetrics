-- AlterTable
ALTER TABLE "data_cpu" ALTER COLUMN "avgpercent" SET DEFAULT 0.00,
ALTER COLUMN "avgpercent" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "data_disk" ALTER COLUMN "freepercent" SET DEFAULT 0.00,
ALTER COLUMN "freepercent" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "data_memory" ALTER COLUMN "freepercent" SET DEFAULT 0.00,
ALTER COLUMN "freepercent" SET DATA TYPE DECIMAL(65,30);
