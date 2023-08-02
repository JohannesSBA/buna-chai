import { useRouter } from "next/navigation";
import { FunctionComponent, useState } from "react";

interface SideBarChatListProps {
    friends: User[];
}

const SideBarChatList: FunctionComponent<SideBarChatListProps> = ({
    friends,
}) => {
    const router = useRouter();
    const [unSeenMessage, setUnseenMessage] = useState<Message[]>([]);
    return (
        <ul
            role="list"
            className="max-h-[25rem] overflow-y-auto -mx-2 space-y-1"
        >
            {friends.sort().map((friend) => {
                return <div>s</div>;
            })}
        </ul>
    );
};

export default SideBarChatList;
