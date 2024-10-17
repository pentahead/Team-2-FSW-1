-- CreateTable
CREATE TABLE "Available" (
    "id" SERIAL NOT NULL,
    "available_status" VARCHAR(100),

    CONSTRAINT "Available_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cars" (
    "id" SERIAL NOT NULL,
    "plate" VARCHAR(25),
    "model_id" INTEGER,
    "rentPerDay" DOUBLE PRECISION,
    "description" VARCHAR(255),
    "availableAt" TIMESTAMP(6),
    "availability_id" INTEGER,
    "year" INTEGER,
    "image" VARCHAR(255),

    CONSTRAINT "Cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manufacture" (
    "id" SERIAL NOT NULL,
    "manufacture_name" VARCHAR(100),
    "manufacture_region" VARCHAR(100),
    "year_establish" INTEGER,

    CONSTRAINT "Manufacture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Models" (
    "id" SERIAL NOT NULL,
    "model_name" VARCHAR(100),
    "transmission_id" INTEGER,
    "capacity" INTEGER,
    "type_id" INTEGER,
    "manufacture_id" INTEGER,

    CONSTRAINT "Models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Options" (
    "id" SERIAL NOT NULL,
    "option_name" VARCHAR(100),

    CONSTRAINT "Options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Specs" (
    "id" SERIAL NOT NULL,
    "spec_name" VARCHAR(100),

    CONSTRAINT "Specs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transmission" (
    "id" SERIAL NOT NULL,
    "transmission_name" VARCHAR(100),

    CONSTRAINT "Transmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "type_name" VARCHAR(100),

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

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
ALTER TABLE "Cars" ADD CONSTRAINT "Cars_availability_id_fkey" FOREIGN KEY ("availability_id") REFERENCES "Available"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Cars" ADD CONSTRAINT "Cars_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "Models"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Models" ADD CONSTRAINT "Models_manufacture_id_fkey" FOREIGN KEY ("manufacture_id") REFERENCES "Manufacture"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Models" ADD CONSTRAINT "Models_transmission_id_fkey" FOREIGN KEY ("transmission_id") REFERENCES "Transmission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Models" ADD CONSTRAINT "Models_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_ModelsToOptions" ADD CONSTRAINT "_ModelsToOptions_A_fkey" FOREIGN KEY ("A") REFERENCES "Models"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModelsToOptions" ADD CONSTRAINT "_ModelsToOptions_B_fkey" FOREIGN KEY ("B") REFERENCES "Options"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModelsToSpecs" ADD CONSTRAINT "_ModelsToSpecs_A_fkey" FOREIGN KEY ("A") REFERENCES "Models"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModelsToSpecs" ADD CONSTRAINT "_ModelsToSpecs_B_fkey" FOREIGN KEY ("B") REFERENCES "Specs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
