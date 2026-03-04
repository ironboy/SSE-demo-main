import ChatMessages from "./ChatMessages";
import ChatInputForm from "./ChatInputForm";

export default function App() {

  // Omit the need to set keys in lists
  useAutoKeys();

  // our state/context
  const s = useStates("main", {
    chatMessages: [],
    newMessage: { userName: '', text: '' }
  });

  // Start an SSE listener
  useEffect(() => {
    // Avoid getting double event sources in React Strict mode
    globalThis.eventSourceSSE && globalThis.eventSourceSSE.close();
    // New event source
    globalThis.eventSourceSSE = new EventSource('/api/chat-sse');
    // Listen to SSE events
    globalThis.eventSourceSSE.onmessage = doOnSseEvent
  }, []);

  // On SSE events (in this app = chat messages)
  // - add the chat message to our message list 
  // and scroll to bottom of screen
  function doOnSseEvent({ data }) {
    s.chatMessages.push(JSON.parse(data));
    setTimeout(() => window.scrollTo(0, 1000000), 100);
  }

  return <>
    <header className="container-fluid p-3 fixed-top">
      <h3 className="m-0">Chat using SSE</h3>
    </header>
    <main className="container mt-5">
      {ChatMessages(s)}
    </main>
    <ChatInputForm />
  </>
};