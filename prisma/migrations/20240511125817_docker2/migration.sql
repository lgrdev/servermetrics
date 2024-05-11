/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `DataContainer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DataContainer_name_key" ON "DataContainer"("name");
