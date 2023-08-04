"use client";
import { cn, toPusherKey } from "@/lib/utils";
import { format } from "date-fns";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { pusherClient } from "@/lib/pusher";

interface MessagesProps {
    initalMessage: Message[];
    sessionId: string;
    sessionImg: string | null | undefined;
    chatPartner: User;
    chatId: string;
}

const Messages: FunctionComponent<MessagesProps> = ({
    initalMessage,
    sessionId,
    chatId,
    sessionImg,
    chatPartner,
}) => {
    const [messages, setMessages] = useState<Message[]>(initalMessage);

    useEffect(() => {
        pusherClient.subscribe(toPusherKey(`chat:${chatId}`));

        const messageHandler = (message: Message) => {
            setMessages((prev) => [message, ...prev]);
        };

        pusherClient.bind(`incoming_message`, messageHandler);

        return () => {
            pusherClient.unsubscribe(toPusherKey(`chat:${chatId}`));
            pusherClient.unbind("incoming_message", messageHandler);
        };
    });

    const scrollDownRef = useRef<HTMLDivElement | null>(null);

    const formatTimeStamp = (timeStamp: number) => {
        return format(timeStamp, "HH:mm");
    };
    return (
        <div
            id="messages"
            className="flex h-full flex-1 flex-col-reverse gap-4 p-3 overlow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
            <div ref={scrollDownRef} />

            {messages.map((message, index) => {
                const isCurrentUser = message.senderId === sessionId;

                const hasNextMessageFromSameUser =
                    messages[index - 1]?.senderId === messages[index].senderId;

                return (
                    <div key={`${message.id}-${message.timestamp}`}>
                        <div
                            className={cn("flex items-end", {
                                "justify-end": isCurrentUser,
                            })}
                        >
                            <div
                                className={cn(
                                    "flex flex-col space-y-2 text-base max-w-xs mx-2",
                                    {
                                        "order-1 items-end": isCurrentUser,
                                        "order-2 items-start": !isCurrentUser,
                                    }
                                )}
                            >
                                <span
                                    className={cn(
                                        "px-4 py-2 rounded-lg inline-block",
                                        {
                                            "bg-red-600 text-white":
                                                isCurrentUser,
                                            "bg-gray-200 text-gray-900":
                                                !isCurrentUser,
                                            "rounded-br-none":
                                                hasNextMessageFromSameUser &&
                                                isCurrentUser,
                                            "rounded-bl-none":
                                                !hasNextMessageFromSameUser &&
                                                !isCurrentUser,
                                        }
                                    )}
                                >
                                    {message.text}{" "}
                                    <span className="m1-2 text-xs text-gray-400">
                                        {formatTimeStamp(message.timestamp)}{" "}
                                    </span>
                                </span>
                            </div>

                            <div
                                className={cn("relative w-6 h-6", {
                                    "order-2": isCurrentUser,
                                    "order-1": !isCurrentUser,
                                    invisible: hasNextMessageFromSameUser,
                                })}
                            >
                                <Image
                                    fill
                                    src={
                                        isCurrentUser
                                            ? (sessionImg as string)
                                            : chatPartner.image
                                    }
                                    alt={"profile picture"}
                                    referrerPolicy="no-referrer"
                                    className="rounded-full"
                                ></Image>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Messages;
