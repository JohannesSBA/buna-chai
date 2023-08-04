import { authOptions } from "@/lib/auth";
import { FunctionComponent } from "react";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { fetchRedis } from "@/helpers/redis";
import { messageArrayValidator } from "@/lib/validations/message";
import Image from "next/image";
import Messages from "@/app/components/Messages";
import ChatInput from "@/app/components/ChatInput";

interface chatProps {
    params: {
        chatid: string;
    };
}

async function getChatMessage(chatid: string) {
    try {
        const result: string[] = await fetchRedis(
            "zrange",
            `Chat:${chatid}:messages`,
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

    const chatPartnerRaw = (await fetchRedis(
        "get",
        `user:${chatPaternerId}`
    )) as string;
    const charPartner = JSON.parse(chatPartnerRaw) as User;
    const initalMessage = await getChatMessage(chatid);

    return (
        <div className="flex-1 justify-between flex flex-col h-full max-h-[calc(100vh-6rem)]">
            <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                <div className="relative flex items-center space-x-4">
                    <div className="relative">
                        <div className="relative w-8 sm:w-12 h-8 sm:h-12">
                            <Image
                                fill
                                referrerPolicy="no-referrer"
                                src={chatPartner.image}
                                alt={`${chatPartner.name} profile picture}`}
                                className="rounded-full"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col leading-tight">
                        <div className="text-xl flex justify-items-center">
                            <span className="text-gray-700 mr-3 font-semibold">
                                {chatPartner.name}
                            </span>
                        </div>

                        <span className="text-sm text-gray-600">
                            {chatPartner.email}
                        </span>
                    </div>
                </div>
            </div>
            <Messages
                sessionId={session.user.id}
                chatId={chatid}
                initalMessage={initalMessage}
                chatPartner={chatPartner}
                sessionImg={session.user.image}
            />
            <ChatInput chatPartner={chatPartner} chatId={chatid} />
        </div>
    );
};

export default chat;
