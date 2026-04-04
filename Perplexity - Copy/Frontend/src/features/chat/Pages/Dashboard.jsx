import React, { useState, useEffect } from "react";
import { useChat } from "../hook/useChat";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
// import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const Dashboard = () => {
  const chat = useChat();
  const [chatInput, setChatInput] = useState("");

  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);

  useEffect(() => {
    chat.initializeSocketConnection();
    chat.handleGetChats();
  }, []);

  const handleSubmitMessage = (e) => {
    e.preventDefault();

    const trimmed = chatInput.trim();
    if (!trimmed) return;

    chat.handleSendMessage({
      message: trimmed,
      chatId: currentChatId,
    });

    setChatInput("");
  };

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats);
  };

  return (
    <div className="h-screen w-full bg-black text-white flex relative overflow-hidden">
      {/* 🌌 Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(106,0,255,0.15),transparent_40%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,122,0,0.15),transparent_40%)]"></div>

      {/* 🧊 Sidebar */}
      <aside className="relative w-[260px] flex-shrink-0  h-full bg-white/5 backdrop-blur-2xl border-r border-white/10 p-4 flex flex-col">
        <h1 className="text-xl font-semibold mb-6 tracking-wide">Perplexity</h1>

        <button className="mb-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
          + New Chat
        </button>

        <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar">
          <p className="text-xs text-white/40  mb-2">Recent</p>

          {Object.values(chats).map((chat, i) => (
            <div
              key={i}
              onClick={() => openChat(chat.id)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer text-sm transition"
            >
              {chat.title}
            </div>
          ))}
        </div>

        <div className="text-xs text-white/30 mt-4">© 2026</div>
      </aside>

      {/* 💬 Chat Area */}
      <div className="flex-1 flex items-center justify-center relative">
        <div className="relative  w-[55vw] h-full shadow-2xl flex flex-col overflow-hidden transition-all duration-500 ">
          {/* Messages */}
          <div className="flex-1 no-scrollbar overflow-y-auto p-6 space-y-4 scroll-smooth">
            {!chats[currentChatId]?.messages?.length && (
              <div className="text-center text-white/30 mt-20">
                <h2 className="text-2xl font-semibold mb-2">
                  Welcome to Perplexity!
                </h2>
                <p className="text-sm">
                  Start by asking a question or sharing your thoughts.
                </p>
              </div>
            )}

            {chats[currentChatId]?.messages.map((message) => (
              <div
                key={message.id}
                className={` flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[90%] px-5 py-3 text-sm rounded-2xl transition-all duration-300 animate-[fadeIn_0.3s_ease]
                  ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-black-600 to-black rounded-br-none shadow-lg shadow-blue-900/40 hover:scale-[1.02]"
                      : "rounded-bl-none bg-gradient-to-br from-black-600 to-black shadow-lg shadow-purple-900/40"
                  }`}
                >
                  {message.role === "user" ? (
                    message.content
                  ) : message.isThinking ? (
                    // 🤖 THINKING ANIMATION
                    <div className="flex gap-1 items-center text-red-800 ">
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></span>
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></span>
                    </div>
                  ) : (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm, remarkMath]}
                      rehypePlugins={[rehypeHighlight, rehypeKatex]}
                      components={{
                        // 🔤 Headings
                        h1: ({ children }) => (
                          <h1 className="text-2xl font-bold mb-3 text-blue-400 border-b border-white/10 pb-1">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-xl font-semibold mb-2 text-purple-400">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-lg font-semibold mb-2 text-pink-400">
                            {children}
                          </h3>
                        ),

                        // 📄 Paragraph
                        p: ({ children }) => (
                          <p className="mb-2 leading-relaxed text-white/90">
                            {children}
                          </p>
                        ),

                        // 📌 Lists
                        ul: ({ children }) => (
                          <ul className="mb-2 list-disc pl-5 space-y-1 text-white/90">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="mb-2 list-decimal pl-5 space-y-1 text-white/90">
                            {children}
                          </ol>
                        ),

                        // 💻 Code
                        code({ inline, className, children }) {
                          return inline ? (
                            <code className="bg-white/10 text-blue-300 px-1.5 py-0.5 rounded">
                              {children}
                            </code>
                          ) : (
                            <pre className="mb-3 overflow-x-auto rounded-xl bg-black/50 p-4 border border-white/10 shadow-md">
                              <code className={className}>{children}</code>
                            </pre>
                          );
                        },

                        // 💬 Blockquote
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-purple-500 pl-3 italic text-white/70 mb-2">
                            {children}
                          </blockquote>
                        ),

                        // 🔗 Links
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            target="_blank"
                            className="text-blue-400 underline hover:text-blue-300"
                          >
                            {children}
                          </a>
                        ),

                        // 📊 Table
                        table: ({ children }) => (
                          <div className="overflow-x-auto mb-3">
                            <table className="w-full border border-white/10 rounded-lg overflow-hidden">
                              {children}
                            </table>
                          </div>
                        ),
                        th: ({ children }) => (
                          <th className="bg-white/10 px-3 py-2 text-left text-sm font-semibold">
                            {children}
                          </th>
                        ),
                        td: ({ children }) => (
                          <td className="border-t border-white/10 px-3 py-2 text-sm">
                            {children}
                          </td>
                        ),

                        // ➖ Horizontal line
                        hr: () => <hr className="my-4 border-white/10" />,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmitMessage}
            className="p-4 border-t border-white/10 flex gap-3 bg-black/30 backdrop-blur-xl"
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:bg-white/10"
            />

            <button
              type="submit"
              disabled={!chatInput.trim()}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-purple-900/40 disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px) scale(0.98);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
