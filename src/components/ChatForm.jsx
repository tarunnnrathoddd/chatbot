import { useRef, useState } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();
  const [inputValue, setInputValue] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const userMessage = inputValue.trim();
    if (!userMessage) return;
    setInputValue(""); // Clear the input field after submission

    // Add user message
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    // Add "Thinking..." and call generateBotResponse after state updates
    setTimeout(() => {
      setChatHistory((history) => {
        const updatedHistory = [
          ...history,
          { role: "model", text: "Thinking..." }
        ];
        generateBotResponse([
          ...updatedHistory.filter(msg => msg.text !== "Thinking..."),
          { role: "user", text: `Using the details provided above, please address this query: ${userMessage}` }
        ]);
        return updatedHistory;
      });
    }, 600);
  };

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className="message-input"
        required
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      {inputValue.trim() && (
        <button type="submit">
          <span className="material-symbols-rounded">keyboard_arrow_upward</span>
        </button>
      )}
    </form>
  );
};

export default ChatForm;