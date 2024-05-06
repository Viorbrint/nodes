-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "Keywords" TEXT[],
    "Location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);
