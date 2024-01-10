/*
  Warnings:

  - Added the required column `generatedAddress` to the `AAEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AAEntry" ADD COLUMN     "generatedAddress" TEXT NOT NULL;
