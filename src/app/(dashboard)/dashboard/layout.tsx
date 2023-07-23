import { authOptions } from "@/lib/auth";
import { FunctionComponent, ReactNode } from "react";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Icon, Icons } from "@/app/components/Icons";
import SignOutButton from "@/app/components/SignOutButton";

interface LayoutProps {
    children: ReactNode;
}

interface SidebarOption {
    id: number;
    name: string;
    href: string;
    Icon: Icon;
}

const sidebarOptions: SidebarOption[] = [
    {
        id: 1,
        name: "Add Friend",
        href: "/dashboard/add",
        Icon: "UserPlus",
    },
];

const Layout: FunctionComponent<LayoutProps> = async ({ children }) => {
    const session = await getServerSession(authOptions);
    if (!session) notFound();

    return (
        <div className="w-full flex h-screen">
            <div className="hidden md:flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r border-gray-900 px-6">
                <Link
                    href="/dashboard"
                    className="flex h-16 shrink-0 items-center justify-center p-5"
                >
                    LOGO
                </Link>

                <div className="text-xs font-semibold leading-6 text-gray-400">
                    Your Chats
                </div>

                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>//Chats that this user has</li>
                        <li>
                            <div className="text-xs font-semibold leading-6 text-gray-400">
                                Overview
                            </div>

                            <ul role="list" className="-mx-2 mt-2 space-y-1">
                                {sidebarOptions.map((option) => {
                                    const Icon = Icons[option.Icon];
                                    return (
                                        <li key={option.id}>
                                            <Link
                                                href={option.href}
                                                className="text-gray-700 hover:text-red-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                            >
                                                <span className="text-gray-400 border-gray-400 group-hover:border-red-600 group-hover:text-red-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.0625rem] font-medium bg-white">
                                                    <Icon className="h-4 w-4" />
                                                </span>

                                                <span className="truncate">
                                                    {option.name}
                                                </span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>

                        <li></li>

                        <li className="-mx-6 mt-auto items-center">
                            <div className="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
                                <div className="relative h-8 w-8 bg-gray-50"></div>
                                <span className="sr-only">Your profile</span>
                                <div className="flex flex-col">
                                    <span aria-hidden="true">
                                        {session.user.name}
                                    </span>
                                    <span
                                        className="text-xs text-zinc-400"
                                        aria-hidden="true"
                                    >
                                        {" "}
                                        {session.user.email}
                                    </span>
                                </div>
                                <SignOutButton className="h-full aspect-square" />
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>

            <aside className="max-h-screen container py-16 md:py-12 w-full">
                {children}
            </aside>
        </div>
    );
};

export default Layout;
