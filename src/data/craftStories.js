// Backend-ready repository of Artisan Craft Stories, Visual Journeys, and Videos.
// Designed to mirror API responses from a future backend/database.

export const CRAFT_STORIES = [
  {
    id: "story-kanchipuram-silk",
    craftName: "Kanchipuram Silk",
    productId: 1,
    artisanId: 1,
    title: "The Golden Threads of Kanchi: A Symphony in Pure Silk",
    subtitle: "How 28 days of hand-weaving turn mulberry silk into an heirloom of divinity.",
    video: {
      // High quality craft weaving video sample with fallback
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      poster: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
      duration: "02:18",
      durationSeconds: 138,
      captions: {
        en: [
          { time: 0, text: "In the sacred temple town of Kanchipuram, dawn arrives to the rhythm of the wooden loom." },
          { time: 5, text: "Meenakshi Devi represents the fourth generation of master silk weavers." },
          { time: 12, text: "Only pure Mulberry silk filaments and silver dipped in 24-carat gold zari are chosen." },
          { time: 22, text: "The ancient Korvai technique interlocks the heavy border and body seamlessly." },
          { time: 35, text: "No machine can replicate the soul woven into these sacred temple borders." }
        ],
        ta: [
          { time: 0, text: "காஞ்சிபுரம் கோவில் நகரத்தில், மரத்தறி நெசவின் தாளத்தோடு விடியல் பிறக்கிறது." },
          { time: 5, text: "மீனாட்சி தேவி நான்கு தலைமுறை பட்டு நெசவாளர் பாரம்பரியத்தின் பிரதிநிதி." },
          { time: 12, text: "தூய மல்பெரி பட்டு நூலும், 24 காரட் தங்க ஜரிகையும் மட்டுமே தேர்ந்தெடுக்கப்படுகின்றன." },
          { time: 22, text: "பாரம்பரிய கோர்வை முறையில் உடலும் பார்டரும் ஒன்றாக இணைக்கப்படுகின்றன." },
          { time: 35, text: "இந்த கோவில் பார்டர்களில் நெய்யப்பட்ட ஆன்மாவை எந்த இயந்திரமும் செய்ய முடியாது." }
        ],
        hi: [
          { time: 0, text: "कांचीपुरम के पवित्र मंदिर नगर में, लकड़ी के करघे की ताल के साथ भोर होती है।" },
          { time: 5, text: "मीनाक्षी देवी रेशम बुनकरों की चौथी पीढ़ी की मास्टर कारीगर हैं।" },
          { time: 12, text: "केवल शुद्ध शहतूत रेशम और सोने की ज़री का उपयोग किया जाता है।" },
          { time: 22, text: "प्राचीन कोरवई तकनीक से पल्लू और बॉर्डर को एक साथ बुना जाता है।" }
        ]
      }
    },
    narrator: {
      name: "Meenakshi Devi",
      role: "4th Generation Master Weaver",
      region: "Kanchipuram, Tamil Nadu",
      lineage: "Family has woven temple silks for 110 years",
      avatar: "🧵",
      quote: "Every warp thread is a prayer; every weft is a life dedicated to preserving India's grace.",
    },
    productStory:
      "Kanchipuram silk sarees trace their ancestry to the Sage Markanda, the master weaver of the Gods. Crafted in the ancient temple city of Kanchipuram in Tamil Nadu, each saree is woven using the legendary 'Korvai' method where the body and temple borders are woven separately on pit looms and interlocked with three shuttles. The heavy silk yarn is twisted with three ply (Murukku pattu) and embellished with authentic silver zari gilded in pure gold, creating a fabric that retains its luster for over a century.",
    visualJourney: [
      {
        step: 1,
        stage: "Raw Materials Selection",
        timeframe: "Days 1 – 3",
        headline: "Pure Mulberry Silk & 24K Gold-dipped Silver Zari",
        desc: "Raw silk filaments are carefully sorted from local silkworm rearers. Only Grade-A Mulberry silk is selected for its high tensile strength and natural shimmer. Authentic Surat silver zari threads electroplated with genuine 24-karat gold are inspected.",
        artisanNote: "If the zari fails our purity burn-test, we send the entire spool back. Quality is our family honor.",
        icon: "✨",
        badge: "100% Certified Mulberry Silk"
      },
      {
        step: 2,
        stage: "Vat Dyeing & Warping",
        timeframe: "Days 4 – 8",
        headline: "Vat Dyeing in Copper Cauldrons with Temple Water",
        desc: "The silk skeins are degummed in mild soap and boiled in large copper cauldrons with eco-friendly natural dyes. The yarns are stretched across bamboo reeds in open fields, rinsed in mineral-rich water, and warp beams are wound by hand.",
        artisanNote: "The mineral density of local well water gives Kanchipuram silk its deep, unyielding brilliance.",
        icon: "🎨",
        badge: "Azo-Free Eco Dyes"
      },
      {
        step: 3,
        stage: "Loom Setup & Korvai Interlocking",
        timeframe: "Days 9 – 24",
        headline: "Two Weavers, Three Shuttles & Pit Loom Symphony",
        desc: "Weaving a pure Korvai saree requires two weavers working synchronized on either side of the pit loom. With three shuttles throwing threads simultaneously, the contrast border and the body are locked with intricate zig-zag temple spires (thazhampoo reku).",
        artisanNote: "A single centimeter of complex temple border can take four hours of intense concentration.",
        icon: "🪡",
        badge: "Korvai Triple-Shuttle Weaving"
      },
      {
        step: 4,
        stage: "Finished Masterpiece & Craft DNA Seal",
        timeframe: "Days 25 – 28",
        headline: "Inspection, Silk Mark Verification & Passport Encoding",
        desc: "The completed saree is taken off the loom, meticulously inspected for zero tension defects, hand-fringed, stamped with the government Silk Mark and registered onto the KalaaSetu Craft Passport with a cryptographic DNA seal.",
        artisanNote: "When this saree reaches a bride, she wears not just silk, but a hundred years of our ancestral heartbeat.",
        icon: "🏆",
        badge: "GI Tag No. 47 & Silk Mark"
      }
    ],
    whySpecial: [
      {
        title: "Heirloom Durability (100+ Years)",
        desc: "Three-ply twisted mulberry silk threads create an uncrushable drape that is traditionally passed down through three generations as family heirloom.",
        icon: "Shield"
      },
      {
        title: "Unbroken Generational Korvai Technique",
        desc: "Unlike powerloom imitations, the Korvai interlock prevents border fraying and requires two human weavers moving in poetic unison.",
        icon: "Users"
      },
      {
        title: "Certified Geographical Indication (GI)",
        desc: "Legally protected under India's GI Act (GI-47), ensuring that only sarees woven within the Kanchipuram municipal perimeter carry this seal.",
        icon: "Award"
      },
      {
        title: "Fair Wage Direct Livelihood",
        desc: "Zero middlemen. 100% of fair artisan wages directly empower women weavers and sustain traditional pit-loom workshops in rural Tamil Nadu.",
        icon: "HeartHandshake"
      }
    ]
  },
  {
    id: "story-madhubani-painting",
    craftName: "Madhubani Painting",
    productId: 4,
    artisanId: 2,
    title: "Colors of the Earth: Sacred Mithila Pigments",
    subtitle: "How twigs, matchsticks, and cow dung paper tell 2,500-year-old epics.",
    video: {
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      poster: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
      duration: "02:05",
      durationSeconds: 125,
      captions: {
        en: [
          { time: 0, text: "In Mithila, women have painted walls since the time of King Janaka and Sita." },
          { time: 6, text: "Sita Kumari prepares paper treated with cow dung and multani mitti." },
          { time: 14, text: "Pigments come from marigold petals, crushed indigo, soot, and turmeric." }
        ],
        hi: [
          { time: 0, text: "मिथिला में, राजा जनक और सीता के समय से महिलाएं दीवारों पर चित्र बनाती आ रही हैं।" },
          { time: 6, text: "सीता कुमारी गोबर और मिट्टी से शोधित हस्तनिर्मित कागज तैयार करती हैं।" }
        ]
      }
    },
    narrator: {
      name: "Sita Kumari",
      role: "Master Mithila Folk Artist",
      region: "Madhubani, Bihar",
      lineage: "Taught by grandmother under the village banyan tree",
      avatar: "🎨",
      quote: "Our brush is made from a bird's fallen feather or a bamboo twig; our colors are gathered from Mother Earth.",
    },
    productStory:
      "Madhubani or Mithila painting originated when King Janaka commissioned artists to capture the wedding of Lord Ram and Princess Sita. Characterized by eye-catching geometrical patterns, dual-line borders, and natural motifs with no empty spaces, the art is created without preliminary sketching using bamboo nibs, cotton-wrapped sticks, and purely organic plant dyes.",
    visualJourney: [
      {
        step: 1,
        stage: "Handmade Paper Preparation",
        timeframe: "Days 1 – 2",
        headline: "Cotton Pulp Paper Treated with Cow Dung & Neem",
        desc: "Raw handmade cotton-rag paper is bathed in a delicate mixture of desi cow dung water and neem extract. This preserves the parchment from insects and grants the iconic rustic ivory hue.",
        artisanNote: "The cow dung gives the canvas life; it connects the divine paintings to the sacred earth.",
        icon: "📜",
        badge: "Eco-Cotton Rag Paper"
      },
      {
        step: 2,
        stage: "Natural Pigment Extraction",
        timeframe: "Days 3 – 4",
        headline: "Crushing Marigolds, Indigo Leaves, and Lamp Black",
        desc: "Yellow is boiled from marigold flowers and turmeric; black from mustard-oil lamp soot; red from kusum petals and madder roots; green from crushed apple and wood leaves; blue from wild indigo.",
        artisanNote: "We never touch chemical synthetic tubes. If it cannot be eaten by nature, it cannot be in Mithila art.",
        icon: "🌿",
        badge: "100% Organic Plant Dyes"
      },
      {
        step: 3,
        stage: "Freehand Bamboo Pen Outlining",
        timeframe: "Days 5 – 10",
        headline: "Double-Line Borders Without Prior Pencil Sketched Marks",
        desc: "Using a sharpened bamboo splinter (kachni nib), the artist directly draws the sacred mythology: fish symbolizing fertility, peacocks of grace, and lotus blossoms of purity.",
        artisanNote: "The hand does not hesitate. The memory is passed from mother to daughter across millennia.",
        icon: "🖋️",
        badge: "Freehand Bamboo Nib"
      },
      {
        step: 4,
        stage: "Filling (Bharni) & KalaaSetu Seal",
        timeframe: "Days 11 – 14",
        headline: "Vibrant Pigment Layering & Craft Authentication",
        desc: "Colors are filled in flat, harmonious blocks using frayed cotton swabs. The completed canvas is dried in shaded village breezes, signed by the artist, and authenticated with Craft DNA.",
        artisanNote: "This canvas brings ancient auspicious blessings to modern homes across oceans.",
        icon: "🌟",
        badge: "GI Tag Certified (Bihar)"
      }
    ],
    whySpecial: [
      {
        title: "2,500-Year-Old Uninterrupted Folk Tradition",
        desc: "Rooted in Ramayana lore, recognized worldwide as one of humanity's purest living folk art forms.",
        icon: "Award"
      },
      {
        title: "Zero Chemical Pigments",
        desc: "All colors are naturally gathered from flowers, herbs, clay, and soot — non-toxic and deeply archival.",
        icon: "Shield"
      },
      {
        title: "Matriarchal Cultural Preservation",
        desc: "Traditionally preserved and painted exclusively by women of Mithila, fostering female economic independence.",
        icon: "Users"
      },
      {
        title: "Sacred Spatial Geometry",
        desc: "Not a millimeter of canvas is left blank; filled with sacred flora and fauna celebrating universal harmony.",
        icon: "HeartHandshake"
      }
    ]
  }
];

// Helper to generate or retrieve a storytelling profile for any product
export function getCraftStory(product) {
  if (!product) return CRAFT_STORIES[0];

  const found = CRAFT_STORIES.find(
    s => s.productId === product.id || s.craftName.toLowerCase() === (product.craft || '').toLowerCase()
  );

  if (found) return found;

  // Dynamically generate a rich storytelling profile for any craft
  return {
    id: `story-${product.id}`,
    craftName: product.craft,
    productId: product.id,
    artisanId: product.artisanId,
    title: `The Heritage of ${product.craft}: Masterwork from ${product.district}`,
    subtitle: `How ${product.material} is shaped by centuries of traditional Indian craftsmanship.`,
    video: {
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      poster: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1200&q=80",
      duration: "02:10",
      durationSeconds: 130,
      captions: {
        en: [
          { time: 0, text: `In ${product.district}, ${product.state}, master artisans carry on the heritage of ${product.craft}.` },
          { time: 8, text: `Carefully selecting raw materials: ${product.material}.` },
          { time: 18, text: "Every contour and weave is sculpted entirely by human hands without machines." }
        ],
        hi: [
          { time: 0, text: `${product.state} के ${product.district} में, शिल्पकार ${product.craft} की समृद्ध परंपरा को आगे बढ़ा रहे हैं।` }
        ]
      }
    },
    narrator: {
      name: product.artisan || "Master Craftsman",
      role: "National Master Craftsperson",
      region: `${product.district}, ${product.state}`,
      lineage: "Over two decades of dedicated mastery",
      avatar: "🏺",
      quote: "Craft is not just work for us — it is our breath, our ancestors' legacy, and our children's future.",
    },
    productStory:
      product.desc ||
      `The craft of ${product.craft} in ${product.state} has flourished across centuries. Handcrafted using ${product.material}, each piece undergoes rigorous traditional processes passed down from master to disciple. Every finished piece is unique, bearing the subtle marks of the artisan's touch.`,
    visualJourney: [
      {
        step: 1,
        stage: "Raw Materials Sourcing",
        timeframe: "Stage 1",
        headline: `Ethically Sourced ${product.material}`,
        desc: `Locally sourced raw ingredients from natural quarries and farms in ${product.district}. Graded for purity, density, and environmental sustainability.`,
        artisanNote: "We only use raw materials that mother nature provides in our regional biome.",
        icon: "🌿",
        badge: "Locally Sourced"
      },
      {
        step: 2,
        stage: "Preparation & Seasoning",
        timeframe: "Stage 2",
        headline: "Hand Processing & Natural Conditioning",
        desc: "The raw elements are seasoned, purified, and prepared using age-old ancestral techniques without chemical accelerators.",
        artisanNote: "Patience is our primary ingredient. Rushing ruins the inner soul of the craft.",
        icon: "⏳",
        badge: "Ancestral Methods"
      },
      {
        step: 3,
        stage: "Artisanal Sculpting / Weaving",
        timeframe: "Stage 3",
        headline: "Precision Handcrafting by Master Hands",
        desc: "Shaped, woven, cast, or painted over days of painstaking individual attention using hand tools and manual wheels.",
        artisanNote: "Every curve is measured by the artisan's eye and touch, perfected over decades.",
        icon: "⚒️",
        badge: "100% Handcrafted"
      },
      {
        step: 4,
        stage: "Quality Inspection & Craft DNA",
        timeframe: "Stage 4",
        headline: "Authenticity Certification & Digital Passport",
        desc: "The finished item is inspected for structural perfection and logged onto the KalaaSetu verified registry.",
        artisanNote: "A certificate of authenticity guarantees buyers are holding genuine Indian art.",
        icon: "🪪",
        badge: "KalaaSetu Verified"
      }
    ],
    whySpecial: [
      {
        title: "100% Handcrafted Provenance",
        desc: "Never mass-produced in factories. Made with individual artistic human touch.",
        icon: "Award"
      },
      {
        title: "Eco-Friendly & Non-Toxic",
        desc: "Sustainably crafted with biodegradable or natural minerals and vegetable pigments.",
        icon: "Shield"
      },
      {
        title: "Generational Heritage",
        desc: `Carrying centuries of cultural memory from the historic craft clusters of ${product.district}.`,
        icon: "Users"
      },
      {
        title: "Direct Community Fair Trade",
        desc: "Fair compensation paid directly to the artisan family without exploitative intermediaries.",
        icon: "HeartHandshake"
      }
    ]
  };
}
