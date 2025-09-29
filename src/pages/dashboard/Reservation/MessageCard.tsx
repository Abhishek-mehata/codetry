import { useState } from "react";
import { Button, Loader } from "../../../components";
import { useCreateChatRoomMutation, useSendMessageMutation, useGetMessagesQuery } from "../../../redux/features/messageApi";
import { message as antdMessage } from "antd";
import { useSelector } from "react-redux";
import type { RootAppState } from "../../../redux/store";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import DashboardInput from "../../../components/dashboard/shared/DashboardInput";
import "../../../../src/index.css"
type MessageCardProps = {
    bookingId: string;
    sellerId: number;
};

function MessageCard({ bookingId, sellerId }: MessageCardProps) {
    // Redux selectors for user info
    const userId = useSelector((state: RootAppState) => state.auth.user?.id);
    // const userRole = useSelector((state: RootAppState) => state.auth.user?.role); // unused

    // API hooks
    const { data: messages, error, isLoading, refetch, isFetching } = useGetMessagesQuery(bookingId, { skip: !bookingId });
    const [createChatRoom, { isLoading: isCreatingRoom }] = useCreateChatRoomMutation();
    const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

    // UI state
    const [userMessage, setUserMessage] = useState("");

    // Determine if we need to show the create room button
    const isFetchBaseQueryError = (err: unknown): err is FetchBaseQueryError =>
        typeof err === 'object' && err !== null && 'status' in err && typeof (err as FetchBaseQueryError).status === 'number';
    const needsRoom = isFetchBaseQueryError(error) && (error.status === 404 || error.status === 500);

    // Handlers
    const handleCreateChatRoom = async () => {
        try {
            await createChatRoom({ sellerId, bookingId }).unwrap();
            antdMessage.success("Chat room created!");
            refetch();
        } catch {
            antdMessage.error("Failed to create chat room");
        }
    };

    const handleSendMessage = async () => {
        if (!userMessage.trim()) {
            antdMessage.warning("Please enter a message.");
            return;
        }
        try {
            await sendMessage({ roomId: bookingId, content: userMessage }).unwrap();
            setUserMessage("");
            antdMessage.success("Message sent!");
            refetch();
        } catch {
            antdMessage.error("Failed to send message");
        }
    };

    // Loading state
    if (isLoading || isFetching || isCreatingRoom) return <Loader loading={true} />;

    // Show create room button if needed
    if (needsRoom) {
        return (
            <div>
                <p className="text-2xl my-4">Create a Chat room and start chat.</p>
                <Button onClick={handleCreateChatRoom} className="">Create a Chat Room</Button>
            </div>
        );
    }

    // Chat UI
    return (
        <div className="flex flex-col h-full  mx-auto mt-5">
            <p className="text-2xl mb-4">Messages</p>
            <div className="flex-1 overflow-y-auto rounded p-4 mb-4 bg-gray-50" style={{ minHeight: 200, maxHeight: 500 }}>
                {messages && messages.length > 0 ? (
                    messages.map(msg => {
                        const isCurrentUser = msg.senderId === userId;
                        return (
                            <div
                                key={msg.id}
                                className={`mb-2 flex ${isCurrentUser ? 'justify-start' : 'justify-end'}`}
                            >
                                <div
                                    className={`px-3 py-2 rounded-lg max-w-xs break-words ${isCurrentUser ? 'bg-blue-100 text-left' : 'bg-green-100 text-right'}`}
                                >
                                    <div className="text-xs text-gray-500 mb-1">{msg.sender.role}</div>
                                    <div>{msg.content}</div>
                                    <div className="text-[10px] text-gray-400 mt-1">{new Date(msg.createdAt).toLocaleString()}</div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-gray-400 text-center">No messages yet. Say hi!</div>
                )}
            </div>
            <div className="flex gap-2">
                <DashboardInput
                    type="textarea"
                    rows={1}
                    value={userMessage}
                    onChange={e => setUserMessage(e.target.value)}
                    disabled={isSending}
                    placeholder="Type your message..."
                    className="font-popins"
                />
                <Button
                    className="min-w-[80px]"
                    onClick={handleSendMessage}
                    disabled={isSending || !userMessage.trim()}
                >
                    {isSending ? 'Sending...' : 'Send'}
                </Button>
            </div>
        </div>
    );
}

export default MessageCard;