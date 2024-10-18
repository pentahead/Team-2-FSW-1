/*
  Warnings:

  - You are about to drop the `_ModelsToOptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ModelsToSpecs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ModelsToOptions" DROP CONSTRAINT "_ModelsToOptions_A_fkey";

-- DropForeignKey
ALTER TABLE "_ModelsToOptions" DROP CONSTRAINT "_ModelsToOptions_B_fkey";

-- DropForeignKey
ALTER TABLE "_ModelsToSpecs" DROP CONSTRAINT "_ModelsToSpecs_A_fkey";

-- DropForeignKey
ALTER TABLE "_ModelsToSpecs" DROP CONSTRAINT "_ModelsToSpecs_B_fkey";

-- AlterTable
ALTER TABLE "Models" ADD COLUMN     "options_id" INTEGER,
ADD COLUMN     "specs_id" INTEGER;

-- DropTable
DROP TABLE "_ModelsToOptions";

-- DropTable
DROP TABLE "_ModelsToSpecs";

-- AddForeignKey
ALTER TABLE "Models" ADD CONSTRAINT "Models_options_id_fkey" FOREIGN KEY ("options_id") REFERENCES "Options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Models" ADD CONSTRAINT "Models_specs_id_fkey" FOREIGN KEY ("specs_id") REFERENCES "Specs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
