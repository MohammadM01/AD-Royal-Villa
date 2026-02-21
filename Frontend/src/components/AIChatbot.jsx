import React, { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import { FaRobot, FaPaperPlane, FaTimes, FaCommentDots } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { chatData, synonymMap } from "../data/chatData";

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [letters, setMessages] = useState([
    {
      text: "Hello! I'm your AI assistant. Ask me anything about the villa!",
      sender: "bot",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [botMemory, setBotMemory] = useState([]);
  const chatEndRef = useRef(null);

  // Load bot memory on mount
  useEffect(() => {
    fetch("/bot-memory.json")
      .then((res) => res.json())
      .then((data) => setBotMemory(data))
      .catch((err) => console.error("Failed to load bot memory:", err));
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [letters, isTyping]);

  const handleSend = async (manualText = null) => {
    const textToSend = manualText || input;
    if (!textToSend.trim()) return;

    setMessages((prev) => [...prev, { text: textToSend, sender: "user" }]);
    setInput("");
    setIsTyping(true);

    // Simulate thinking delay
    setTimeout(() => {
      const response = generateResponse(textToSend);
      setMessages((prev) => [...prev, { text: response, sender: "bot" }]);
      setIsTyping(false);
    }, 600);
  };

  const generateResponse = (query) => {
    const lowerQuery = query.toLowerCase();

    // 1. Check Synonym Map
    const normalizedQuery = lowerQuery
      .split(" ")
      .map((word) => synonymMap[word] || word)
      .join(" ");

    // 2. Check Manual Intents (Exact Match)
    const exactMatch = chatData.find((intent) =>
      intent.keywords.some((k) => normalizedQuery.includes(k)),
    );

    if (exactMatch) return exactMatch.content;

    // 3. Fuzzy Search in Bot Memory (Website Content)
    if (botMemory.length > 0) {
      const fuse = new Fuse(botMemory, {
        keys: ["keywords", "content", "category"],
        threshold: 0.4, // Lower is stricter
        includeScore: true,
      });

      const results = fuse.search(normalizedQuery);

      if (results.length > 0) {
        const bestMatch = results[0];

        // Detect if the matched memory block is in Hindi/Hinglish (basic check)
        const isHindiMatch = bestMatch.item.content.includes("kya") || bestMatch.item.content.includes("hai") || bestMatch.item.content.includes("aapko");

        const introText = isHindiMatch
          ? `Mhe ye jankari website pe mili (${bestMatch.item.category}): \n\n`
          : `I found this on our ${bestMatch.item.category} page: \n\n`;

        const linkText = isHindiMatch
          ? `[Yaha aur padhe](/${bestMatch.item.id})`
          : `[Read more matches here](/${bestMatch.item.id})`;

        return `${introText}"${bestMatch.item.content.substring(0, 150)}..." \n\n${linkText}`;
      }
    }

    // 4. Default Fallback with Language Heuristic
    const hindiTriggers = ["kya", "hai", "kaise", "kab", "kitna", "kaha", "kisko", "nahi", "ha", "acha", "bhai", "karna", "chahiye", "paisa"];
    const isLikelyHindi = hindiTriggers.some(trigger => lowerQuery.includes(trigger));

    if (isLikelyHindi) {
      return "Maaf karna, mujhe theek se samajh nahi aaya. 😅 Aap Price, Location, Pool, ya Booking ke baare mein pooch sakte hain!";
    }

    return "I'm not sure about that. Try asking about Price, Location, Pool, or Contact!";
  };

  // Helper to render markdown-like links
  const renderMessage = (text) => {
    // Regex for [Link Text](url)
    const parts = text.split(/(\[.*?\]\(.*?\))/g);
    return parts.map((part, index) => {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        return (
          <a
            key={index}
            href={match[2]}
            className="text-blue-400 underline hover:text-blue-300"
          >
            {match[1]}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-full shadow-2xl hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <FaTimes size={24} /> : <FaRobot size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden z-40 flex flex-col font-sans"
            style={{ maxHeight: "500px", height: "60vh" }}
          >
            {/* Header */}
            <div className="bg-gray-800 p-4 flex items-center gap-3 border-b border-gray-700">
              <div className="bg-cyan-500/20 p-2 rounded-full">
                <FaRobot className="text-cyan-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">
                  Datamatex Assistant
                </h3>
                <span className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>{" "}
                  Online
                </span>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900/95 backdrop-blur-sm scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              {letters.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-md whitespace-pre-wrap ${msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-800 text-gray-200 rounded-bl-none border border-gray-700"
                      }`}
                  >
                    {renderMessage(msg.text)}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 p-3 rounded-2xl rounded-bl-none border border-gray-700 flex gap-1">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Chips (Optional suggestions) */}
            <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
              {["Pricing", "Amenities", "Pool", "Contact"].map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSend(chip)}
                  className="whitespace-nowrap px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700 hover:bg-gray-700 transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-gray-800 border-t border-gray-700 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about the villa..."
                className="flex-1 bg-gray-900 text-white text-sm rounded-full px-4 py-2 border border-gray-700 focus:outline-none focus:border-cyan-500 transition-colors"
                autoFocus
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="bg-cyan-600 text-white p-2 rounded-full hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FaPaperPlane size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
