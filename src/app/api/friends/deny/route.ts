import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const session = await getServerSession(authOptions);

        if (!session) {
            return new Response("Unauthorized", { status: 401 });
        }

        const { id: idToDeny } = z.object({ id: z.string() }).parse(body);

        await db.srem(
            `userL${session.user.id}:incoming_friend_request`,
            idToDeny
        );

        return new Response("OK");
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response("Invalid request payload", { status: 422 });
        }

        return new Response("Invalid request payload", { status: 400 });
    }
}
