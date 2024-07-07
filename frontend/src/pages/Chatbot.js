import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatboxRef = useRef(null);

  useEffect(() => {
    document.title = "Chat";
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/chat",
        { message: input },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const botResponse = response.data.botResponse;
      const newMessages = [...messages, { text: input, type: "user" }];
      setMessages(newMessages);

      setTimeout(() => {
        const updatedMessages = [...newMessages, { text: botResponse, type: "bot" }];
        setMessages(updatedMessages);
      }, 1000);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInput("");
  };

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chatbot">
      <header>
        <h2>
          <img src="./images/chat.png" width="30" height="30" className="icon-chat" alt="React Bootstrap logo" />
          <p className="icons d-inline">Chatbot</p>
        </h2>
      </header>
      <ul className="chatbox" ref={chatboxRef}>
        <div>
          {messages.map((message, index) => (
            <div key={index} id={message.type}>
              {message.type === "user" ? (
                <div className="chat send">
                  <p>{message.text}</p>
                  <img className="icon-chat" src="./icons/user.svg" alt="user" />
                </div>
              ) : (
                <div className="chat receive">
                  <img className="icon-chat" src="./icons/chatbot.svg" alt="chatbot" />
                  <p>{message.text}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ul>
      <div className="input-chat input-group">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
        <div className="button-chat input-group-prepend">
          <button className="input-group-text bg-transparent" id="inputGroup-sizing-default" onClick={sendMessage}>
            <img src="./icons/send.svg" alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
