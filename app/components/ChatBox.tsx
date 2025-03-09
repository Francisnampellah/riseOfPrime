interface Message {
  role: string;
  content: string;
}

interface ChatBoxProps {
  messages: Message[];
}

export default function ChatBox({ messages }: ChatBoxProps) {
    return (
      <div className="border p-4 mt-2 h-80 overflow-y-auto bg-gray-100 rounded">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 my-1 ${msg.role === "user" ? "text-right" : ""}`}>
            <span className={`px-3 py-1 rounded ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>
    );
  }
  