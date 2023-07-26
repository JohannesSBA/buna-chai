import { authOptions } from "@/lib/auth";
import { FunctionComponent } from "react";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { fetchRedis } from "@/helpers/redis";
import { messageArrayValidator } from "@/lib/validations/message";

interface chatProps {
    params: {
        chatid: string;
    };
}

async function getChatMessage(chatid: string) {
    try {
        const result: string[] = await fetchRedis(
            "zrange",
            `chat:${chatid}:messages`,
            0,
            -1
        );

        const dbMessages = result.map(
            (message) => JSON.parse(message) as Message
        );

        const reversedDbMessages = dbMessages.reverse();

        const messages = messageArrayValidator.parse(reversedDbMessages);

        return messages;
    } catch (error) {
        notFound();
    }
}

const chat = async ({ params }: chatProps) => {
    const { chatid } = params;
    const session = await getServerSession(authOptions);
    if (!session) notFound();

    const { user } = session;

    const [userId1, userId2] = chatid.split("--");

    if (user.id !== userId1 && user.id !== userId2) notFound();

    const chatPaternerId = user.id === userId1 ? userId2 : userId1;
    const chatPartner = (await db.get(`user:${chatPaternerId}`)) as User;
    const initalMessages = await getChatMessage(chatid);

    return <div>{params.chatid}</div>;
};

export default chat;
