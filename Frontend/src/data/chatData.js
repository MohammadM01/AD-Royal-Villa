export const chatData = [
  {
    id: "greet",
    keywords: [
      "hello",
      "hi",
      "hey",
      "greetings",
      "good morning",
      "good afternoon",
      "good evening",
    ],
    content: "Hello! Welcome to AD Royal Villa. How can I assist you today? 😊",
    category: "General",
  },
  {
    id: "owner",
    keywords: ["owner", "who owns", "founder", "about us", "who are you"],
    content:
      "AD Royal Villa is a luxury private estate designed for exclusive getaways. We are dedicated to providing you with a memorable and comfortable stay.",
    category: "About",
  },
  {
    id: "contact",
    keywords: [
      "contact",
      "phone",
      "email",
      "address",
      "location",
      "reach you",
      "call",
    ],
    content:
      "You can reach us at +91 98902 05767. We are located near Coral School, Padgha - 421101. [Click here to chat on WhatsApp](https://wa.me/919890205767).",
    category: "Contact",
  },
  {
    id: "services",
    keywords: ["services", "what do you offer", "facilities", "amenities"],
    content:
      "We offer a range of luxury amenities including a private pool, 4BHK villa, personal chef, and outdoor activities. Check our [Amenities page](/amenities) for more details.",
    category: "Services",
  },
  {
    id: "price",
    keywords: [
      "price",
      "pricing",
      "cost",
      "rate",
      "charge",
      "expensive",
      "cheap",
      "booking",
    ],
    content:
      "Here are our detailed pricing packages:\n\n" +
      "📅 Weekday Escape (Mon-Fri)\n" +
      "💰 ₹18,000 / night\n" +
      "👥 Up to 20 Guests\n\n" +
      "🎉 Royal Weekend (Sat-Sun)\n" +
      "💰 ₹20,000 / night\n" +
      "👥 Up to 20 Guests\n\n" +
      "✅ Includes:\n" +
      "- Full 4BHK Villa Access\n" +
      "- Private Pool & Lounge\n" +
      "- Music System Allowed\n" +
      "- BBQ Setup Available\n\n" +
      "🔗 Check availability & book here:\n" +
      "[https://adfarmsandresort.com/pricing](https://adfarmsandresort.com/pricing)",
    category: "Pricing",
  },
  {
    id: "booking",
    keywords: ["book", "reservation", "reserve"],
    content:
      "You can book your stay by clicking the 'Book Now' button at the top right of the page or by contacting us directly.",
    category: "Booking",
  },
];

export const synonymMap = {
  cost: "price",
  rate: "price",
  charge: "price",
  fee: "price",
  location: "contact",
  address: "contact",
  phone: "contact",
  call: "contact",
  pool: "amenities",
  swimming: "amenities",
  screens: "activities", // Example from prompt
};
