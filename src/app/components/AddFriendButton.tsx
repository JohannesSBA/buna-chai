"use client";

import { FunctionComponent, useState } from "react";
import Button from "./Button";
import { addFriendValidator } from "@/lib/validations/add-friend";
import axios, { AxiosError } from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface AddFriendButtonProps {}

const AddFriendButton: FunctionComponent<AddFriendButtonProps> = () => {
    const [showSuccessState, setShowSuccessState] = useState<boolean>(false);

    const {} = useForm({
        resolver: zodResolver(addFriendValidator),
    });

    async function addFriend(email: string) {
        try {
            const validatedEmail = addFriendValidator.parse({ email });

            await axios.post("/api/firneds.add", {
                email: validatedEmail,
            });

            setShowSuccessState(true);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return;
            }

            if (error instanceof AxiosError) {
                return;
            }
        }
    }
    return (
        <form className="max-w-sm">
            <label
                htmlFor="email"
                className="block text-sm font-medium leaading-6 text-gray-900"
            >
                Add Friend By Email
            </label>

            <div className="mt-2 flex gap-4">
                <input
                    type="text"
                    className="w-full block rounded0md border-0 py-1.5 text0gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focusLring-2 focus:ring-inset focus:ring-red-600 smLtext-sm sm:leading-6"
                    placeholder="you@example.com"
                />
                <Button>Add</Button>
            </div>
        </form>
    );
};

export default AddFriendButton;
