-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "join_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "birthday" DATE,
    "gender" TEXT,
    "description" TEXT,
    "workplace" TEXT,
    "interests" TEXT[],
    "certifications" TEXT[],
    "languages" TEXT[],

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "match" (
    "match_id" SERIAL NOT NULL,
    "fst_user_id" INTEGER NOT NULL,
    "snd_user_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'active',

    CONSTRAINT "match_pkey" PRIMARY KEY ("match_id")
);

-- CreateTable
CREATE TABLE "chat" (
    "chat_id" SERIAL NOT NULL,
    "match_id" INTEGER NOT NULL,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("chat_id")
);

-- CreateTable
CREATE TABLE "message" (
    "chat_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("chat_id","user_id","date")
);

-- CreateTable
CREATE TABLE "comment" (
    "commenter_id" INTEGER NOT NULL,
    "receiver_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("commenter_id","receiver_id","date")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "match_fst_user_id_snd_user_id_key" ON "match"("fst_user_id", "snd_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "chat_match_id_key" ON "chat"("match_id");

-- AddForeignKey
ALTER TABLE "match" ADD CONSTRAINT "match_fst_user_id_fkey" FOREIGN KEY ("fst_user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match" ADD CONSTRAINT "match_snd_user_id_fkey" FOREIGN KEY ("snd_user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "match"("match_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chat"("chat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_commenter_id_fkey" FOREIGN KEY ("commenter_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
