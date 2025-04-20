-- CreateTable
CREATE TABLE "Drawing" (
    "id" TEXT NOT NULL,
    "schemaVersion" INTEGER NOT NULL,
    "document" JSONB NOT NULL,
    "session" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Drawing_pkey" PRIMARY KEY ("id")
);
