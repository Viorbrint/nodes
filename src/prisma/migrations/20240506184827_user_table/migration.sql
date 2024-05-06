/*
  Warnings:

  - You are about to drop the column `Keywords` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `Location` on the `Note` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "Keywords",
DROP COLUMN "Location",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "content" TEXT,
ADD COLUMN     "keywords" TEXT[],
ADD COLUMN     "location" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
