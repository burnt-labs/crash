-- CreateTable
CREATE TABLE "AAEntry" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AAEntry_pkey" PRIMARY KEY ("id")
);
