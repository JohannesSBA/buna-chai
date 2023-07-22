"use client";

import Button from "@/app/components/Button";
import { signIn } from "next-auth/react";
import { FC, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function loginWithGoogle() {
        setIsLoading(true);
        try {
            await signIn("google");
        } catch (error) {
            toast.error("OOPs");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full flex flex-col items-center max-w-md space-y-8">
                    <div className="flex flex-col items-center gap-8">
                        Logo
                        <h2 className="mt-6 text-cetner text-3xl font-bold tracking-tight text-gray-900">
                            Sign In to your account
                        </h2>
                    </div>

                    <Button
                        isLoading={isLoading}
                        type="button"
                        className="max-w-sm mx-auito w-full"
                        onClick={loginWithGoogle}
                    >
                        {isLoading ? null : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-google"
                                viewBox="0 0 16 16"
                            >
                                {" "}
                                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />{" "}
                            </svg>
                        )}
                        Google
                    </Button>
                </div>
            </div>
        </>
    );
};

export default page;
