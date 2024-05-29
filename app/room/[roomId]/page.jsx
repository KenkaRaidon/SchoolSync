import { PrismaClient } from "@prisma/client";
import Messages from "@/componentes/chat/Messages";
import MessageField from "@/componentes/chat/MessageField";

const prisma = new PrismaClient();

const Page = async ({ params }) => {

    const { roomId } = params

    const existingMessages = await prisma.message.findMany({
        where: {
            chatRoomId: roomId,
        },
    })

    const serializedMessages = existingMessages.map((message) => ({
        text: message.text,
        id: message.id,
    }))

    return (
        <>
            <div>
                <p>messages:</p>
                <Messages roomId={roomId} initialMessages={serializedMessages} />
                <MessageField roomId={roomId} />
            </div>
        </>
    );
}

export default Page