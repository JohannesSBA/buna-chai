import AddFriendButton from "@/app/components/AddFriendButton";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { FunctionComponent } from "react";

const page: FunctionComponent = async () => {
    const session = await getServerSession(authOptions);
    return (
        <main className="pt-8">
            <h1 className="font-bold text-5xl mb-8">Add Friend</h1>
            <AddFriendButton />
        </main>
    );
};

export default page;
