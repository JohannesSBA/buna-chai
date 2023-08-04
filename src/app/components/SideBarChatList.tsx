"use client";
import { chatHrefConstructor } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { FunctionComponent, useEffect, useState } from "react";

interface SideBarChatListProps {
    friends: User[];
    session: string;
}

const SideBarChatList: FunctionComponent<SideBarChatListProps> = ({
    friends,
    session,
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const [unSeenMessage, setUnseenMessage] = useState<Message[]>([]);

    useEffect(() => {
        if (pathname?.includes("chat")) {
            setUnseenMessage((prev) => {
                return prev.filter((msg) => !pathname.includes(msg.senderId));
            });
        }
    }, [pathname]);

    return (
        <ul
            role="list"
            className="max-h-[25rem] overflow-y-auto -mx-2 space-y-1"
        >
            {friends.sort().map((friend) => {
                const unseenMessage = unSeenMessage.filter((useenMsg) => {
                    return useenMsg.senderId === friend.id;
                }).length;
                return (
                    <li key={friend.id} className="flex">
                        <a
                            href={`/dashboard/chat/${chatHrefConstructor(
                                session,
                                friend.id
                            )}`}
                            className="text-gray-700 hover:text-red-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm"
                        >
                            {friend.name}
                            {unseenMessage > 0 ? (
                                <div className="bg-red-600 font-medium text-xs text-white w-4 h-4 rounded-full flex justify-center items-center">
                                    {unseenMessage}
                                </div>
                            ) : null}
                        </a>
                    </li>
                );
            })}
        </ul>
    );
};

export default SideBarChatList;
