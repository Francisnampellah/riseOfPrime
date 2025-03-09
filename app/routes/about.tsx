import { useState } from "react";
import { useFetcher } from "@remix-run/react";
import ChatBox from "~/components/ChatBox";

export default function About() {
    const [prompt, setPrompt] = useState("");
    const fetcher = useFetcher<{ message: string[] }>();

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Header */}
            <header className="py-4 px-6 bg-white border-b shadow-sm">
                <h1 className="text-xl font-medium text-center text-gray-800">Ollama RAG Chat</h1>
            </header>

            {/* Main chat area */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="max-w-3xl mx-auto">
                    <ChatBox 
                        messages={fetcher.data ? fetcher.data.message.map((msg) => ({ 
                            role: "user", 
                            content: msg 
                        })) : []} 
                    />
                </div>
            </div>

            {/* Input area */}
            <div className="bg-white border-t p-4">
                <div className="max-w-3xl mx-auto relative">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Message..."
                        className="w-full p-4 pr-16 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={1}
                    />
                    <button
                        onClick={() => {
                            if (!prompt.trim()) return;
                            fetcher.submit(
                                JSON.stringify({ prompt }),
                                {
                                    method: "post",
                                    action: "/api/chat",
                                    encType: "application/json",
                                }
                            );
                            setPrompt("");
                        }}
                        className="absolute right-4 bottom-4 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400"
                        disabled={!prompt.trim() || fetcher.state === "submitting"}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 2L11 13" />
                            <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}