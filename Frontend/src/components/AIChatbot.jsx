import React, { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import { FaPaperPlane, FaTimes, FaCommentDots } from "react-icons/fa";
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
    // 1. Clean the query
    const lowerQuery = query
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .trim();

    if (!lowerQuery)
      return "I didn't quite catch that. Could you say it again?";

    // Helper to guess if query is Hindi/Hinglish
    const hindiTriggers = [
      "kya",
      "hai",
      "kaise",
      "kab",
      "kitna",
      "kaha",
      "kisko",
      "nahi",
      "ha",
      "acha",
      "bhai",
      "karna",
      "chahiye",
      "paisa",
      "kidhar",
      "kdr",
      "tum",
      "kon",
      "mera",
      "mujhe",
      "aap",
    ];
    const isLikelyHindi = hindiTriggers.some((trigger) =>
      new RegExp(`\\b${trigger}\\b`, "i").test(lowerQuery),
    );

    // 2. Exact Intent Matching using Word Boundaries (Catches explicit phrases inside long sentences like "hello who r u plz")
    let exactMatch = chatData.find((intent) =>
      intent.keywords.some((k) =>
        new RegExp(`\\b${k}\\b`, "i").test(lowerQuery),
      ),
    );

    if (exactMatch) return exactMatch.content;

    // 3. Fuzzy Search on Conversational Intents (Catches heavy typos like "pric", "locatin", "swimng", "oenr")
    const fuseChat = new Fuse(chatData, {
      keys: ["keywords"],
      threshold: 0.35, // Stricter threshold so "what is this" doesn't match "hi/hello"
      includeScore: true,
      ignoreLocation: true,
    });

    let bestFuzzyChatMatch = null;
    let bestFuzzyScore = 1;

    // A) Check full query first for overall intent matches
    const fullQueryResults = fuseChat.search(lowerQuery);
    if (fullQueryResults.length > 0 && fullQueryResults[0].score < 0.25) {
      bestFuzzyChatMatch = fullQueryResults[0].item;
      bestFuzzyScore = fullQueryResults[0].score;
    }

    // B) Check word by word for heavy typos buried inside long sentences
    // Only if we don't already have an excellent full-query match
    if (bestFuzzyScore > 0.15) {
      const words = lowerQuery.split(/\s+/);
      let bestWordScore = 1;
      let bestWordMatch = null;

      words.forEach((word) => {
        // Only fuzzy match substantial words (> 3 chars) to avoid false positive matches on tiny words like "is", "the", "a"
        // Also explicitly block fuzzying common generic words
        const ignoredWords = ["what", "this", "that", "then", "there", "about", "site"];
        if (word.length > 3 && !ignoredWords.includes(word)) {
          const wordResults = fuseChat.search(word);
          // Score closer to 0 is a better match. We require a firm match (<0.3)
          if (
            wordResults.length > 0 &&
            wordResults[0].score < bestWordScore &&
            wordResults[0].score < 0.3
          ) {
            bestWordScore = wordResults[0].score;
            bestWordMatch = wordResults[0].item;
          }
        }
      });

      // If the word match was stronger than the full sentence scattered match, use it
      if (bestWordMatch && bestWordScore < bestFuzzyScore) {
        bestFuzzyChatMatch = bestWordMatch;
      }
    }

    if (bestFuzzyChatMatch) return bestFuzzyChatMatch.content;

    // 4. Fuzzy Search in Website Knowledge Base (botMemory JSON)
    if (botMemory.length > 0) {
      const fuse = new Fuse(botMemory, {
        keys: ["keywords", "content", "category"],
        threshold: 0.4,
        includeScore: true,
      });

      const results = fuse.search(lowerQuery);

      if (results.length > 0) {
        let selectedMatch = results[0];

        // If we strongly suspect Hindi but top match is English (or vice versa), try seeking down the list.
        const targetLanguage = isLikelyHindi ? "hi" : "en";
        const languageAlignedMatch = results.find(
          (r) => r.item.language === targetLanguage && r.score < 0.4,
        );

        if (languageAlignedMatch) {
          selectedMatch = languageAlignedMatch;
        }

        return `${selectedMatch.item.content}`;
      }
    }

    // 5. Default Fallback with Language Heuristic
    if (isLikelyHindi) {
      return "Maaf karna, mujhe theek se samajh nahi aaya. 😅 Kya aap Pricing, Location, Pool, ya Booking ke baare mein pooch sakte hain?";
    }

    return "I'm not exactly sure what you mean! Try asking about Pricing, Location, Pool, or Contact Info.";
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
        className="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-full shadow-2xl hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <FaTimes size={28} /> : <img src="/aiboticon.png" alt="Datamatex AI Bot" className="w-[46px] h-[46px] object-contain drop-shadow-lg" />}
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
                <img src="/aiboticon.png" alt="AI Bot" className="w-5 h-5 object-contain" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">
                  Datamatex Ai Bot
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
