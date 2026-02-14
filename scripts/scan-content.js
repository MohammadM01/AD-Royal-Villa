const fs = require("fs");
const path = require("path");

// Configuration
const PAGES_DIR = path.join(__dirname, "../Frontend/src/pages");
const OUTPUT_FILE = path.join(__dirname, "../Frontend/public/bot-memory.json");

// Helper to clean text
const cleanText = (text) => {
  return text
    .replace(/import\s+.*?from\s+['"].*?['"];?/g, "") // Remove imports
    .replace(/<[^>]*>/g, " ") // Remove HTML tags
    .replace(/\{.*?\}/g, "") // Remove JS expressions in JSX
    .replace(/[(){}]/g, "") // Remove remaining braces/parens that might be artifacts
    .replace(/[:?]/g, " ") // Remove potential ternary operators
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();
};

const scanPages = () => {
  const memory = [];

  if (!fs.existsSync(PAGES_DIR)) {
    console.error(`Pages directory not found: ${PAGES_DIR}`);
    return;
  }

  const files = fs.readdirSync(PAGES_DIR);

  files.forEach((file) => {
    if (!file.endsWith(".jsx")) return;

    const filePath = path.join(PAGES_DIR, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const pageName = file.replace(".jsx", "");

    // Extract key content using Regex (simple extraction)
    // Matches content inside common text tags
    const textMatches = content.match(/>([^<]+)</g);

    if (textMatches) {
      const pageContent = textMatches
        .map((match) => match.replace(/[><]/g, "").trim())
        .filter((text) => {
          // Filter out empty/short strings
          if (text.length < 5) return false;

          // Filter out code artifacts
          const codeIndicators = [
            "{",
            "}",
            "=>",
            "const ",
            "let ",
            "var ",
            "return ",
            "import ",
            "export ",
            "function",
            "console.",
            "useRef",
            "useState",
            "useEffect",
            "className=",
            "style=",
            "onClick=",
          ];
          if (codeIndicators.some((indicator) => text.includes(indicator)))
            return false;

          return true;
        })
        .join(" ");

      if (pageContent) {
        memory.push({
          id: pageName.toLowerCase(),
          keywords: [
            pageName.toLowerCase(),
            ...pageName.split(/(?=[A-Z])/).map((s) => s.toLowerCase()),
          ],
          content: cleanText(pageContent),
          category: pageName,
        });
      }
    }
  });

  // Write to public folder
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(memory, null, 2));
  console.log(
    `✅ Bot memory generated with ${memory.length} pages at ${OUTPUT_FILE}`,
  );
};

scanPages();
