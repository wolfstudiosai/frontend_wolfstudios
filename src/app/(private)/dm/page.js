"use client";

import { ChatContextProvider } from "./context";
import DMView from "./dm-view";

export default function page() {
    return (
        <ChatContextProvider>
            <DMView />
        </ChatContextProvider>

    )
}