export const chatData = [
  // --- GENERAL GREETINGS ---
  {
    id: "greet_en",
    keywords: ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening", "howdy"],
    content: "Hello! Welcome to AD Royal Villa. How can I assist you today? 😊",
    category: "General",
  },
  {
    id: "greet_hi",
    keywords: ["namaste", "kaise ho", "kaha ho", "hi bot", "hello bot", "kya haal", "kya hhaal", "kaisa hai", "aur batao", "bolo"],
    content: "Namaste! AD Royal Villa mein aapka swagat hai. Main aapki kaise madad kar sakta hoon? 😊",
    category: "General",
  },

  // --- ABOUT OWNER / VILLA ---
  {
    id: "owner_en",
    keywords: ["owner", "who owns", "founder", "about us", "who are you", "what is this", "details", "villa details"],
    content: "AD Royal Villa is a luxury private estate spread over 5,000 sq.ft, designed for exclusive getaways. It features 4BHK accommodation, a private pool, and outdoor activities.",
    category: "About",
  },
  {
    id: "owner_hi",
    keywords: ["malik kaun hai", "kiska hai", "owner kaun", "kya hai ye", "villa ke baare me", "details kya hai"],
    content: "AD Royal Villa ek private luxury 4BHK estate hai (5,000 sq.ft). Yaha par aapko private pool, bada lawn, aur bahot saari activities milti hain ek exclusive stay ke liye.",
    category: "About",
  },

  // --- CONTACT / LOCATION ---
  {
    id: "contact_en",
    keywords: ["contact", "phone", "number", "email", "address", "location", "reach you", "call", "where are you", "how far", "distance", "map"],
    content: "📍 **Location:** Near Coral School, Padgha - 421101 (32 Kms from Thane).\n📞 **Phone:** +91 98902 05767\n🔗 [Click here to chat on WhatsApp](https://wa.me/919890205767).",
    category: "Contact",
  },
  {
    id: "contact_hi",
    keywords: ["contact number", "phone number", "kaha hai", "kaise aaye", "address kya hai", "location bhejo", "kaha par hai", "thane se kitna dur", "kaha h", "kdr h", "kidhar hai"],
    content: "📍 **Hamara Pata:** Near Coral School, Padgha - 421101 (Thane se 32 Kms door).\n📞 **Phone:** +91 98902 05767\n🔗 [WhatsApp par baat karne ke liye yaha click kare](https://wa.me/919890205767).",
    category: "Contact",
  },

  // --- PRICING ---
  {
    id: "price_en",
    keywords: ["price", "pricing", "cost", "rate", "charge", "expensive", "cheap", "booking amount", "how much", "tariff", "packages"],
    content: "Here are our transparent pricing packages (Up to 20 Guests):\n\n🌅 **Weekday Escape (Mon-Fri)**\n💰 ₹18,000 / night\n\n🎉 **Royal Weekend (Sat-Sun)**\n💰 ₹20,000 / night\n\nIncludes: Full 4BHK access, Private Pool, Kitchen access, and all amenities.\n🔗 [View Pricing Page](/pricing)",
    category: "Pricing",
  },
  {
    id: "price_hi",
    keywords: ["kitna price", "kya rate", "kitna kharcha", "rent kitna", "paisa kitna", "saturday ka rate", "weekend ka", "weekday ka", "cost kya hai"],
    content: "Hamare transparent packages (Max 20 logs ke liye):\n\n🌅 **Weekday (Somvaar se Shukravaar):** ₹18,000 / night\n🎉 **Weekend (Shanivaar - Ravivaar):** ₹20,000 / night\n\nIsme pura 4BHK villa, private pool, aur kitchen access shamil hai. Koi hidden charges nahi hain!\n🔗 [Pricing details yaha dekhe](/pricing)",
    category: "Pricing",
  },

  // --- BOOKING ---
  {
    id: "booking_en",
    keywords: ["book", "reservation", "reserve", "how to book", "availability", "available"],
    content: "To check availability or book your stay, you can click the 'Book Now' button at the top right, or message us directly on WhatsApp.\n🔗 [Chat on WhatsApp](https://wa.me/919890205767)",
    category: "Booking",
  },
  {
    id: "booking_hi",
    keywords: ["book karna hai", "booking kaise", "khali hai kya", "available hai", "reservation karna", "chahiye ghoomna"],
    content: "Booking karne ke liye ya availability check karne ke liye, aap website ke top right me 'Book Now' par click kar sakte hain, ya hume WhatsApp par message pijiye.\n🔗 [WhatsApp kare](https://wa.me/919890205767)",
    category: "Booking",
  },

  // --- AMENITIES ---
  {
    id: "amenities_en",
    keywords: ["services", "what do you offer", "facilities", "amenities", "kitchen", "food", "cook", "chef"],
    content: "Our Premium Amenities include:\n👨‍🍳 Fully Equipped Kitchen & Caretaker\n📺 Smart TV & WiFi\n🏏 Outdoor Ground (Cricket/Badminton)\n🎲 Indoor Games (Carrom, Cards)\n🔋 Inverter Backup\n🔗 [Explore all Amenities](/amenities)",
    category: "Services",
  },
  {
    id: "amenities_hi",
    keywords: ["kya kya hai", "suvidha", "facilities kya", "khana milega", "kitchen hai", "khelne ke liye", "wifi hai"],
    content: "Hamare villa me aapko ye premium best suvidhayein milengi:\n👨‍🍳 Pura Fully Equipped Kitchen aur Caretaker\n📺 Smart TV aur WiFi\n🏏 Bada lawn (Cricket/Badminton ke liye)\n🎲 Indoor Games (Carrom)\n🔋 Power Backup\n🔗 [Saari Amenities yaha dekhe](/amenities)",
    category: "Services",
  },

  // --- POOL ---
  {
    id: "pool_en",
    keywords: ["pool", "swimming", "swim", "water"],
    content: "Yes, we have a massive Private Swimming Pool exclusively for your group! 🏊‍♂️ It also includes twisting slides, a rain dance arena, and a giant tipping bucket.\n🔗 [Check out the Pool area](/activities)",
    category: "Pool",
  },
  {
    id: "pool_hi",
    keywords: ["pool kaisa hai", "swimming pool", "talaab", "pani", "nahana"],
    content: "Haan, villa me bhot bada private swimming pool hai surf aapke group ke liye! 🏊‍♂️ Isme twisting slides, rain dance aur bada tipping bucket bhi shamil hai.\n🔗 [Pool ki photo yaha dekhe](/activities)",
    category: "Pool",
  },

  // --- ACTIVITIES (SPECIFIC FEATURES) ---
  {
    id: "activities_en",
    keywords: ["activities", "dj", "music", "party", "rain dance", "bbq", "barbeque", "games", "tipping bucket", "slides", "water park"],
    content: "We have endless activities for you! 🎉\n- Live BBQ Setup\n- Rain Dance Arena with Music\n- Pool Twisting Slides\n- The Giant Tipping Bucket\n- Mushroom Fountain\n- Indoor & Outdoor Sports Ground\n🔗 [Check out our Activities page](/activities)",
    category: "Activities",
  },
  {
    id: "activities_hi",
    keywords: ["kya kare", "party karni hai", "music bajega", "dj allowed", "dj hai", "rain dance hai kya", "bbq milega", "barbeque chahiye", "tipping bucket"],
    content: "Villa me bhot saari mazedar activities hain! 🎉\n- Live BBQ (Barbeque) ki suvidha\n- Rain Dance Arena (Music ke saath)\n- Pool Slides aur Bada Tipping Bucket\n- Mushroom Fountain\n- Indoor aur Outdoor khelne ki jagah\n🔗 [Hamari Activities page dekhe](/activities)",
    category: "Activities",
  }
];

export const synonymMap = {
  // English Synonyms
  cost: "price",
  rate: "price",
  charge: "price",
  tariffs: "price",
  fee: "price",
  address: "contact",
  phone: "contact",
  call: "contact",
  where: "contact",
  map: "contact",
  swimming: "pool",
  food: "amenities",
  cook: "amenities",
  chef: "amenities",
  kitchen: "amenities",
  dj: "activities",
  music: "activities",
  party: "activities",

  // Hindi / Hinglish Synonyms Mapping to Hindi root words
  paisa: "price_hi",
  bhav: "price_hi",
  rent: "price_hi",
  kiraya: "price_hi",
  kharcha: "price_hi",
  pata: "contact_hi",
  jagah: "contact_hi",
  kaha: "contact_hi",
  kidhar: "contact_hi",
  location: "contact", // mapped to english keyword root
  suvidha: "amenities", // maps to amenities_hi root
  khana: "amenities", // maps to amenities_hi root
  khel: "activities", // maps to activities_hi root
  mazza: "activities", // maps to activities_hi root
};
