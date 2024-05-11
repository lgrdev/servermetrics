-- CreateTable
CREATE TABLE "DataContainer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DataContainer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataContainerState" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "containerId" INTEGER NOT NULL,

    CONSTRAINT "DataContainerState_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DataContainerState" ADD CONSTRAINT "DataContainerState_containerId_fkey" FOREIGN KEY ("containerId") REFERENCES "DataContainer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
