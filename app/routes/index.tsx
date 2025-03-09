import { useState } from "react";
import { useFetcher } from "@remix-run/react";
import ChatBox from "~/components/ChatBox";

export default function Index() {
    const [prompt, setPrompt] = useState("");
    const fetcher = useFetcher();

    return (


        <div className="flex flex-1 w-full h-full justify-center items-center">
            hello world
        </div>
    );
}
