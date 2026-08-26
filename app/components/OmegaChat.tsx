"use client";

import { useEffect, useRef, useState } from "react";
import { X, Send, RotateCcw, ChevronDown, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "مرحبًا بك في OMEGA! 👋\nيسعدنا مساعدتك في التعرف على خدماتنا ومشروعاتنا، طلب عرض سعر، فرص العمل، أو فرص التعاون مع الشركة.\n\nWelcome to OMEGA! How can we help you today?",
  timestamp: new Date(),
};

const SUGGESTED_QUESTIONS = [
  "مين شركة أوميجا؟",
  "إيه هي مشاريع الشركة؟",
  "كيف أطلب عرض سعر لمشروع؟",
  "مكان الشركة وفروعها فين؟",
  "كيف أقدم على وظيفة ",
  "أريد التسجيل كمورد / مقاول باطن",
];

function TypingDots() {
  return (
    <div className="omega-chat-typing">
      <span />
      <span />
      <span />
    </div>
  );
}

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1") // **bold** → bold
    .replace(/\*(.+?)\*/g, "$1")      // *italic* → italic
    .replace(/^#{1,6}\s+/gm, "")      // # headers
    .replace(/`(.+?)`/g, "$1");       // `code` → code
}

function getLineDir(line: string): "ltr" | "rtl" | "auto" {
  // If the line contains Arabic letters, it must be RTL overall
  if (/[\u0600-\u06FF]/.test(line)) return "rtl";
  // If it's purely numbers, emails, URLs etc (no Arabic), force LTR
  const ltrPatterns = /(\+\d|\d{4,}|@|www\.|http|📞|📱)/;
  if (ltrPatterns.test(line)) return "ltr";
  return "auto";
}

function renderRichLine(line: string) {
  // Match URLs, Emails, or Phone numbers (digits with spaces/dashes, min length 8)
  const regex = /(https?:\/\/[^\s]+|[\w\.-]+@[\w\.-]+\.\w+|[\+\d][\d\s\-]{6,}[\d])/g;
  const parts = line.split(regex);
  return parts.map((part, index) => {
    if (!part) return null;
    
    if (part.match(/^https?:\/\//)) {
      // It's a URL
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0a2463", textDecoration: "underline", wordBreak: "break-all" }}
        >
          <bdi dir="ltr">{part}</bdi>
        </a>
      );
    } else if (part.match(/^[\w\.-]+@[\w\.-]+\.\w+$/) || part.match(/^[\+\d][\d\s\-]{6,}[\d]$/)) {
      // It's an Email or Phone number
      return (
        <bdi key={index} dir="ltr" style={{ margin: "0 4px" }}>
          {part}
        </bdi>
      );
    }
    
    // Normal text
    return <span key={index}>{part}</span>;
  });
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  const lines = stripMarkdown(message.content).split("\n").filter((l) => l.trim());

  return (
    <div className={`omega-chat-msg ${isUser ? "omega-chat-msg--user" : "omega-chat-msg--ai"}`}>
      {!isUser && (
        <div className="omega-chat-avatar">
          <Sparkles size={13} />
        </div>
      )}
      <div
        className={`omega-chat-bubble ${isUser ? "omega-chat-bubble--user" : "omega-chat-bubble--ai"}`}
        dir="auto"
      >
        {lines.map((line, i) => (
          <p key={i} dir={getLineDir(line)} style={{ margin: i > 0 ? "0.45rem 0 0" : "0" }}>
            {renderRichLine(line)}
          </p>
        ))}
      </div>
    </div>
  );
}

export function OmegaChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [hasBadge, setHasBadge] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      setHasBadge(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    const userText = text.trim();
    if (!userText || isLoading) return;

    const userMsg: Message = { role: "user", content: userText, timestamp: new Date() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    setShowSuggestions(false);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error("Stream failed");
      }

      // Add empty assistant message and stream into it
      const assistantMsg: Message = { role: "assistant", content: "", timestamp: new Date() };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsLoading(false);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let finalContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        finalContent += chunk;
        
        // Strip the $$LEAD$$ part from being displayed to the user
        const displayContent = finalContent.split("$$LEAD$$")[0];

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content: displayContent,
          };
          return updated;
        });
      }

      // After stream is done, check if a lead was captured
      if (finalContent.includes("$$LEAD$$")) {
        try {
          const leadMatch = finalContent.match(/\$\$LEAD\$\$\s*({[\s\S]*?})\s*\$\$LEAD\$\$/);
          if (leadMatch && leadMatch[1]) {
            const leadData = JSON.parse(leadMatch[1]);
            // Send the extracted lead data to the server to be saved in Contact Messages
            await fetch("/api/chat-lead", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(leadData),
            });
          }
        } catch (err) {
          console.error("Failed to parse or save lead data", err);
        }
      }
    } catch {
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "عذرًا، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.",
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const resetChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setShowSuggestions(true);
    setInput("");
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="omega-chat-trigger"
        aria-label="Open Omega AI chat"
        id="omega-ai-chat-trigger"
      >
        <div className="omega-chat-trigger-icon">
          {isOpen ? (
            <ChevronDown size={22} strokeWidth={2.5} />
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.524 3.658 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
              <path d="M8 10h.01M12 10h.01M16 10h.01" strokeWidth="2.5"/>
            </svg>
          )}
        </div>
        {hasBadge && !isOpen && (
          <span className="omega-chat-badge">1</span>
        )}
        {/* Glow ring */}
        <div className="omega-chat-trigger-ring" />
      </button>

      {/* Chat panel */}
      <div className={`omega-chat-panel ${isOpen ? "omega-chat-panel--open" : ""}`}>
        {/* Header */}
        <div className="omega-chat-header">
          <div className="omega-chat-header-info">
            <div className="omega-chat-header-avatar">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="omega-chat-header-name">Omega AI</h3>
              <p className="omega-chat-header-status">
                <span className="omega-chat-status-dot" />
                Online · Company Assistant
              </p>
            </div>
          </div>
          <div className="omega-chat-header-actions">
            <button onClick={resetChat} title="Reset chat" className="omega-chat-icon-btn">
              <RotateCcw size={15} />
            </button>
            <button onClick={() => setIsOpen(false)} className="omega-chat-icon-btn">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="omega-chat-messages" id="omega-chat-messages">
          {messages.map((msg, i) => (
            <MessageBubble key={i} message={msg} />
          ))}
          {isLoading && (
            <div className="omega-chat-msg omega-chat-msg--ai">
              <div className="omega-chat-avatar">
                <Sparkles size={13} />
              </div>
              <div className="omega-chat-bubble omega-chat-bubble--ai">
                <TypingDots />
              </div>
            </div>
          )}

          {/* Suggested questions */}
          {showSuggestions && messages.length === 1 && (
            <div className="omega-chat-suggestions">
              {SUGGESTED_QUESTIONS.map((q) => {
                const isArabic = /[\u0600-\u06FF]/.test(q);
                return (
                  <button
                    key={q}
                    className="omega-chat-suggestion-btn"
                    dir={isArabic ? "rtl" : "ltr"}
                    onClick={() => sendMessage(q)}
                  >
                    {q}
                  </button>
                );
              })}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div className="omega-chat-input-area">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about Omega... / اسأل عن أوميجا..."
            className="omega-chat-input"
            rows={1}
            disabled={isLoading}
            id="omega-chat-input"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            className="omega-chat-send-btn"
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </div>

        {/* Footer */}
        <div className="omega-chat-footer">
          Powered by Omega AI · Built on company data
        </div>
      </div>

      <style>{`
        /* ===== TRIGGER BUTTON ===== */
        .omega-chat-trigger {
          position: fixed;
          bottom: 1.75rem;
          right: 1.75rem;
          z-index: 9999;
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 50%;
          border: none;
          background: linear-gradient(135deg, #0a2463, #1b4f8a);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 28px rgba(10, 36, 99, 0.45);
          transition: transform 250ms cubic-bezier(.34,1.56,.64,1), box-shadow 250ms ease;
        }
        .omega-chat-trigger:hover {
          transform: scale(1.1) translateY(-2px);
          box-shadow: 0 14px 36px rgba(10, 36, 99, 0.55);
        }
        .omega-chat-trigger-icon {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 250ms ease;
        }
        .omega-chat-badge {
          position: absolute;
          top: -3px;
          right: -3px;
          width: 1.1rem;
          height: 1.1rem;
          border-radius: 50%;
          background: #c9a84c;
          color: white;
          font-size: 0.65rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
          animation: omega-badge-pop 0.4s cubic-bezier(.34,1.56,.64,1) both;
        }
        @keyframes omega-badge-pop {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .omega-chat-trigger-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: rgba(10, 36, 99, 0.3);
          animation: omega-ping 2.5s ease-out infinite;
          z-index: 0;
        }
        @keyframes omega-ping {
          0% { transform: scale(1); opacity: 0.6; }
          80%, 100% { transform: scale(1.7); opacity: 0; }
        }

        /* ===== PANEL ===== */
        .omega-chat-panel {
          position: fixed;
          bottom: 6rem;
          right: 1.75rem;
          z-index: 9998;
          width: min(380px, calc(100vw - 2rem));
          height: 520px;
          border-radius: 16px;
          background: white;
          box-shadow: 0 24px 64px rgba(10, 36, 99, 0.2), 0 4px 16px rgba(10, 36, 99, 0.1);
          border: 1px solid rgba(10, 36, 99, 0.1);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transform: scale(0.92) translateY(16px);
          opacity: 0;
          pointer-events: none;
          transform-origin: bottom right;
          transition: transform 280ms cubic-bezier(.34,1.56,.64,1), opacity 200ms ease;
          direction: ltr;
        }
        .omega-chat-panel--open {
          transform: scale(1) translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        /* ===== HEADER ===== */
        .omega-chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.1rem;
          background: linear-gradient(135deg, #0a2463 0%, #1b4f8a 100%);
          color: white;
          flex-shrink: 0;
          direction: rtl;
        }
        .omega-chat-header-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .omega-chat-header-avatar {
          width: 2.4rem;
          height: 2.4rem;
          border-radius: 50%;
          background: rgba(201, 168, 76, 0.25);
          border: 1.5px solid rgba(201, 168, 76, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c9a84c;
          flex-shrink: 0;
        }
        .omega-chat-header-name {
          margin: 0;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.02em;
        }
        .omega-chat-header-status {
          margin: 0.1rem 0 0;
          font-size: 0.72rem;
          opacity: 0.78;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        .omega-chat-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4ade80;
          display: inline-block;
        }
        .omega-chat-header-actions {
          display: flex;
          gap: 0.3rem;
        }
        .omega-chat-icon-btn {
          width: 2rem;
          height: 2rem;
          border-radius: 8px;
          border: none;
          background: rgba(255,255,255,0.12);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 150ms ease;
        }
        .omega-chat-icon-btn:hover {
          background: rgba(255,255,255,0.22);
        }

        /* ===== MESSAGES ===== */
        .omega-chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          background: #f8f7f4;
          scroll-behavior: smooth;
        }
        .omega-chat-messages::-webkit-scrollbar { width: 4px; }
        .omega-chat-messages::-webkit-scrollbar-thumb { background: rgba(10,36,99,0.15); border-radius: 4px; }
        .omega-chat-msg {
          display: flex;
          align-items: flex-end;
          gap: 0.5rem;
          animation: omega-msg-in 0.3s ease both;
        }
        @keyframes omega-msg-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .omega-chat-msg--user {
          flex-direction: row-reverse;
        }
        .omega-chat-avatar {
          width: 1.8rem;
          height: 1.8rem;
          border-radius: 50%;
          background: linear-gradient(135deg, #0a2463, #1b4f8a);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c9a84c;
          flex-shrink: 0;
        }
        .omega-chat-bubble {
          max-width: 80%;
          padding: 0.7rem 0.9rem;
          border-radius: 14px;
          font-size: 0.875rem;
          line-height: 1.55;
          text-align: start;
        }
        .omega-chat-bubble p { margin: 0; }
        .omega-chat-bubble--ai {
          background: white;
          color: #1a1a2e;
          border: 1px solid rgba(10,36,99,0.09);
          border-bottom-left-radius: 4px;
          box-shadow: 0 2px 8px rgba(10,36,99,0.06);
        }
        .omega-chat-bubble--user {
          background: linear-gradient(135deg, #0a2463, #1b4f8a);
          color: white;
          border-bottom-right-radius: 4px;
        }

        /* ===== TYPING ===== */
        .omega-chat-typing {
          display: flex;
          gap: 4px;
          align-items: center;
          padding: 0.1rem 0;
        }
        .omega-chat-typing span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #c9a84c;
          animation: omega-dot-bounce 1.2s ease-in-out infinite;
        }
        .omega-chat-typing span:nth-child(2) { animation-delay: 0.15s; }
        .omega-chat-typing span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes omega-dot-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }

        /* ===== SUGGESTIONS ===== */
        .omega-chat-suggestions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
          margin-top: 0.3rem;
          direction: rtl;
          justify-content: flex-start;
        }
        .omega-chat-suggestion-btn {
          padding: 0.45rem 0.8rem;
          border-radius: 999px;
          border: 1px solid rgba(10,36,99,0.18);
          background: white;
          color: #0a2463;
          font-family: inherit;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 150ms ease, border-color 150ms ease, transform 150ms ease;
        }
        .omega-chat-suggestion-btn:hover {
          background: #0a2463;
          color: white;
          border-color: #0a2463;
          transform: translateY(-1px);
        }

        /* ===== INPUT ===== */
        .omega-chat-input-area {
          display: flex;
          align-items: flex-end;
          flex-direction: row-reverse;
          gap: 0.5rem;
          padding: 0.75rem 0.9rem;
          border-top: 1px solid rgba(10,36,99,0.08);
          background: white;
          flex-shrink: 0;
        }
        .omega-chat-input {
          flex: 1;
          resize: none;
          border: 1px solid rgba(10,36,99,0.15);
          border-radius: 10px;
          padding: 0.6rem 0.8rem;
          font-size: 0.875rem;
          line-height: 1.45;
          color: #1a1a2e;
          background: #f8f7f4;
          outline: none;
          max-height: 100px;
          overflow-y: auto;
          direction: rtl;
          text-align: right;
          transition: border-color 150ms ease, box-shadow 150ms ease;
        }
        .omega-chat-input:focus {
          border-color: #0a2463;
          box-shadow: 0 0 0 3px rgba(10,36,99,0.08);
        }
        .omega-chat-input::placeholder { color: #9ca3af; }
        .omega-chat-send-btn {
          width: 2.4rem;
          height: 2.4rem;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #0a2463, #1b4f8a);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: transform 150ms ease, opacity 150ms ease, box-shadow 150ms ease;
          box-shadow: 0 4px 12px rgba(10,36,99,0.3);
        }
        .omega-chat-send-btn:hover:not(:disabled) {
          transform: scale(1.08);
          box-shadow: 0 6px 18px rgba(10,36,99,0.4);
        }
        .omega-chat-send-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* ===== FOOTER ===== */
        .omega-chat-footer {
          padding: 0.4rem 0.9rem;
          text-align: center;
          font-size: 0.67rem;
          color: #9ca3af;
          border-top: 1px solid rgba(10,36,99,0.05);
          background: white;
          letter-spacing: 0.03em;
          flex-shrink: 0;
        }

        /* Mobile adjustments */
        @media (max-width: 480px) {
          .omega-chat-trigger {
            bottom: 1.25rem;
            right: 1rem;
          }
          .omega-chat-panel {
            bottom: 5.5rem;
            right: 0.5rem;
            left: 0.5rem;
            width: auto;
            height: 480px;
          }
        }
      `}</style>
    </>
  );
}
