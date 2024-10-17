/*
  Warnings:

  - You are about to alter the column `available_status` on the `Available` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `plate` on the `Cars` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(25)`.
  - You are about to alter the column `description` on the `Cars` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `image` on the `Cars` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `manufacture_name` on the `Manufacture` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `manufacture_region` on the `Manufacture` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `model_name` on the `Models` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `option_name` on the `Options` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `spec_name` on the `Specs` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `transmission_name` on the `Transmission` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `type_name` on the `Type` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to drop the `_ModelOptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ModelSpecs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cars" DROP CONSTRAINT "Cars_availability_id_fkey";

-- DropForeignKey
ALTER TABLE "Cars" DROP CONSTRAINT "Cars_model_id_fkey";

-- DropForeignKey
ALTER TABLE "Models" DROP CONSTRAINT "Models_manufacture_id_fkey";

-- DropForeignKey
ALTER TABLE "Models" DROP CONSTRAINT "Models_transmission_id_fkey";

-- DropForeignKey
ALTER TABLE "Models" DROP CONSTRAINT "Models_type_id_fkey";

-- DropForeignKey
ALTER TABLE "_ModelOptions" DROP CONSTRAINT "_ModelOptions_A_fkey";

-- DropForeignKey
ALTER TABLE "_ModelOptions" DROP CONSTRAINT "_ModelOptions_B_fkey";

-- DropForeignKey
ALTER TABLE "_ModelSpecs" DROP CONSTRAINT "_ModelSpecs_A_fkey";

-- DropForeignKey
ALTER TABLE "_ModelSpecs" DROP CONSTRAINT "_ModelSpecs_B_fkey";

-- DropIndex
DROP INDEX "Cars_plate_key";

-- AlterTable
ALTER TABLE "Available" ALTER COLUMN "available_status" DROP NOT NULL,
ALTER COLUMN "available_status" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "Cars" ALTER COLUMN "plate" DROP NOT NULL,
ALTER COLUMN "plate" SET DATA TYPE VARCHAR(25),
ALTER COLUMN "model_id" DROP NOT NULL,
ALTER COLUMN "rentPerDay" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "availableAt" DROP NOT NULL,
ALTER COLUMN "availableAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "availability_id" DROP NOT NULL,
ALTER COLUMN "year" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "image" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Manufacture" ALTER COLUMN "manufacture_name" DROP NOT NULL,
ALTER COLUMN "manufacture_name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "manufacture_region" DROP NOT NULL,
ALTER COLUMN "manufacture_region" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "year_establish" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Models" ALTER COLUMN "model_name" DROP NOT NULL,
ALTER COLUMN "model_name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "transmission_id" DROP NOT NULL,
ALTER COLUMN "capacity" DROP NOT NULL,
ALTER COLUMN "type_id" DROP NOT NULL,
ALTER COLUMN "manufacture_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Options" ALTER COLUMN "option_name" DROP NOT NULL,
ALTER COLUMN "option_name" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "Specs" ALTER COLUMN "spec_name" DROP NOT NULL,
ALTER COLUMN "spec_name" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "Transmission" ALTER COLUMN "transmission_name" DROP NOT NULL,
ALTER COLUMN "transmission_name" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "Type" ALTER COLUMN "type_name" DROP NOT NULL,
ALTER COLUMN "type_name" SET DATA TYPE VARCHAR(100);

-- DropTable
DROP TABLE "_ModelOptions";

-- DropTable
DROP TABLE "_ModelSpecs";

-- CreateTable
CREATE TABLE "_ModelsToOptions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ModelsToSpecs" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ModelsToOptions_AB_unique" ON "_ModelsToOptions"("A", "B");

-- CreateIndex
CREATE INDEX "_ModelsToOptions_B_index" ON "_ModelsToOptions"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ModelsToSpecs_AB_unique" ON "_ModelsToSpecs"("A", "B");

-- CreateIndex
CREATE INDEX "_ModelsToSpecs_B_index" ON "_ModelsToSpecs"("B");

-- AddForeignKey
ALTER TABLE "Models" ADD CONSTRAINT "Models_manufacture_id_fkey" FOREIGN KEY ("manufacture_id") REFERENCES "Manufacture"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Models" ADD CONSTRAINT "Models_transmission_id_fkey" FOREIGN KEY ("transmission_id") REFERENCES "Transmission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Models" ADD CONSTRAINT "Models_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Cars" ADD CONSTRAINT "Cars_availability_id_fkey" FOREIGN KEY ("availability_id") REFERENCES "Available"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Cars" ADD CONSTRAINT "Cars_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "Models"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_ModelsToOptions" ADD CONSTRAINT "_ModelsToOptions_A_fkey" FOREIGN KEY ("A") REFERENCES "Models"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModelsToOptions" ADD CONSTRAINT "_ModelsToOptions_B_fkey" FOREIGN KEY ("B") REFERENCES "Options"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModelsToSpecs" ADD CONSTRAINT "_ModelsToSpecs_A_fkey" FOREIGN KEY ("A") REFERENCES "Models"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModelsToSpecs" ADD CONSTRAINT "_ModelsToSpecs_B_fkey" FOREIGN KEY ("B") REFERENCES "Specs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
