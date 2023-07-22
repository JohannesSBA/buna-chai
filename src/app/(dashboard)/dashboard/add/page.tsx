import AddFriendButton from "@/app/components/AddFriendButton";
import { FunctionComponent } from "react";

const page: FunctionComponent = () => {
    return (
        <main className="pt-8">
            <h1 className="font-bold text-5xl mb-8">Add Friend</h1>
            <AddFriendButton />
        </main>
    );
};

export default page;
