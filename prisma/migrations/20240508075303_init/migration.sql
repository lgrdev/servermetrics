-- CreateTable
CREATE TABLE "data_memory" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "freepercent" INTEGER NOT NULL,

    CONSTRAINT "data_memory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_cpu" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "avgpercent" INTEGER NOT NULL,

    CONSTRAINT "data_cpu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_disk" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "freepercent" INTEGER NOT NULL,

    CONSTRAINT "data_disk_pkey" PRIMARY KEY ("id")
);
