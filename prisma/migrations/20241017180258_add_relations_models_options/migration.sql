/*
  Warnings:

  - You are about to drop the `_ModelsToOptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ModelsToSpecs` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[plate]` on the table `Cars` will be added. If there are existing duplicate values, this will fail.
  - Made the column `available_status` on table `Available` required. This step will fail if there are existing NULL values in that column.
  - Made the column `plate` on table `Cars` required. This step will fail if there are existing NULL values in that column.
  - Made the column `model_id` on table `Cars` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rentPerDay` on table `Cars` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Cars` required. This step will fail if there are existing NULL values in that column.
  - Made the column `availableAt` on table `Cars` required. This step will fail if there are existing NULL values in that column.
  - Made the column `availability_id` on table `Cars` required. This step will fail if there are existing NULL values in that column.
  - Made the column `year` on table `Cars` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `Cars` required. This step will fail if there are existing NULL values in that column.
  - Made the column `manufacture_name` on table `Manufacture` required. This step will fail if there are existing NULL values in that column.
  - Made the column `manufacture_region` on table `Manufacture` required. This step will fail if there are existing NULL values in that column.
  - Made the column `year_establish` on table `Manufacture` required. This step will fail if there are existing NULL values in that column.
  - Made the column `model_name` on table `Models` required. This step will fail if there are existing NULL values in that column.
  - Made the column `transmission_id` on table `Models` required. This step will fail if there are existing NULL values in that column.
  - Made the column `capacity` on table `Models` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type_id` on table `Models` required. This step will fail if there are existing NULL values in that column.
  - Made the column `manufacture_id` on table `Models` required. This step will fail if there are existing NULL values in that column.
  - Made the column `option_name` on table `Options` required. This step will fail if there are existing NULL values in that column.
  - Made the column `spec_name` on table `Specs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `transmission_name` on table `Transmission` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type_name` on table `Type` required. This step will fail if there are existing NULL values in that column.

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
ALTER TABLE "_ModelsToOptions" DROP CONSTRAINT "_ModelsToOptions_A_fkey";

-- DropForeignKey
ALTER TABLE "_ModelsToOptions" DROP CONSTRAINT "_ModelsToOptions_B_fkey";

-- DropForeignKey
ALTER TABLE "_ModelsToSpecs" DROP CONSTRAINT "_ModelsToSpecs_A_fkey";

-- DropForeignKey
ALTER TABLE "_ModelsToSpecs" DROP CONSTRAINT "_ModelsToSpecs_B_fkey";

-- AlterTable
ALTER TABLE "Available" ALTER COLUMN "available_status" SET NOT NULL,
ALTER COLUMN "available_status" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Cars" ALTER COLUMN "plate" SET NOT NULL,
ALTER COLUMN "plate" SET DATA TYPE TEXT,
ALTER COLUMN "model_id" SET NOT NULL,
ALTER COLUMN "rentPerDay" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DATA TYPE TEXT,
ALTER COLUMN "availableAt" SET NOT NULL,
ALTER COLUMN "availableAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "availability_id" SET NOT NULL,
ALTER COLUMN "year" SET NOT NULL,
ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "image" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Manufacture" ALTER COLUMN "manufacture_name" SET NOT NULL,
ALTER COLUMN "manufacture_name" SET DATA TYPE TEXT,
ALTER COLUMN "manufacture_region" SET NOT NULL,
ALTER COLUMN "manufacture_region" SET DATA TYPE TEXT,
ALTER COLUMN "year_establish" SET NOT NULL;

-- AlterTable
ALTER TABLE "Models" ALTER COLUMN "model_name" SET NOT NULL,
ALTER COLUMN "model_name" SET DATA TYPE TEXT,
ALTER COLUMN "transmission_id" SET NOT NULL,
ALTER COLUMN "capacity" SET NOT NULL,
ALTER COLUMN "type_id" SET NOT NULL,
ALTER COLUMN "manufacture_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Options" ALTER COLUMN "option_name" SET NOT NULL,
ALTER COLUMN "option_name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Specs" ALTER COLUMN "spec_name" SET NOT NULL,
ALTER COLUMN "spec_name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Transmission" ALTER COLUMN "transmission_name" SET NOT NULL,
ALTER COLUMN "transmission_name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Type" ALTER COLUMN "type_name" SET NOT NULL,
ALTER COLUMN "type_name" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "_ModelsToOptions";

-- DropTable
DROP TABLE "_ModelsToSpecs";

-- CreateTable
CREATE TABLE "_ModelOptions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ModelSpecs" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ModelOptions_AB_unique" ON "_ModelOptions"("A", "B");

-- CreateIndex
CREATE INDEX "_ModelOptions_B_index" ON "_ModelOptions"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ModelSpecs_AB_unique" ON "_ModelSpecs"("A", "B");

-- CreateIndex
CREATE INDEX "_ModelSpecs_B_index" ON "_ModelSpecs"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Cars_plate_key" ON "Cars"("plate");

-- AddForeignKey
ALTER TABLE "Models" ADD CONSTRAINT "Models_transmission_id_fkey" FOREIGN KEY ("transmission_id") REFERENCES "Transmission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Models" ADD CONSTRAINT "Models_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Models" ADD CONSTRAINT "Models_manufacture_id_fkey" FOREIGN KEY ("manufacture_id") REFERENCES "Manufacture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cars" ADD CONSTRAINT "Cars_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "Models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cars" ADD CONSTRAINT "Cars_availability_id_fkey" FOREIGN KEY ("availability_id") REFERENCES "Available"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModelOptions" ADD CONSTRAINT "_ModelOptions_A_fkey" FOREIGN KEY ("A") REFERENCES "Models"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModelOptions" ADD CONSTRAINT "_ModelOptions_B_fkey" FOREIGN KEY ("B") REFERENCES "Options"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModelSpecs" ADD CONSTRAINT "_ModelSpecs_A_fkey" FOREIGN KEY ("A") REFERENCES "Models"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModelSpecs" ADD CONSTRAINT "_ModelSpecs_B_fkey" FOREIGN KEY ("B") REFERENCES "Specs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
