-- CreateTable
CREATE TABLE "Character" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "campaign" TEXT NOT NULL,
    "image" TEXT,
    "player" TEXT NOT NULL,
    "primaryRole" TEXT NOT NULL,
    "secondaryRole" TEXT NOT NULL,
    "secondaryRole2" TEXT NOT NULL,
    "look" TEXT,
    "background" TEXT,
    "stress" TEXT[],
    "assets" TEXT,
    "notes" TEXT,
    "specialAbilities" TEXT[],
    "conditions" TEXT[],
    "bonds" TEXT[],
    "pronouns" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "character_slug_idx" ON "Character"("slug");
