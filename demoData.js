export const CRAFTS = [
  "Kanchipuram Silk", "Madhubani Painting", "Ikat Weaving", "Blue Pottery",
  "Channapatna Toys", "Dhokra Metal Casting", "Pattachitra", "Warli Painting",
  "Bidriware", "Phulkari Embroidery", "Bandhani", "Chikankari",
  "Terracotta Craft", "Kalamkari", "Bamboo Craft"
];

export const ARTISANS = [
  { id: 1, name: "Meenakshi Devi", craft: "Kanchipuram Silk", district: "Kanchipuram", state: "Tamil Nadu", exp: 22, rating: 4.9, products: 3, earnings: 186000, languages: ["Tamil","English"], avatar: "🧵", verified: true },
  { id: 2, name: "Sita Kumari", craft: "Madhubani Painting", district: "Madhubani", state: "Bihar", exp: 15, rating: 4.8, products: 2, earnings: 94000, languages: ["Hindi","Maithili"], avatar: "🎨", verified: true },
  { id: 3, name: "Prakash Meher", craft: "Ikat Weaving", district: "Sambalpur", state: "Odisha", exp: 18, rating: 4.7, products: 2, earnings: 121000, languages: ["Odia","Hindi"], avatar: "🪡", verified: true },
  { id: 4, name: "Radhika Kumawat", craft: "Blue Pottery", district: "Jaipur", state: "Rajasthan", exp: 12, rating: 4.6, products: 2, earnings: 78000, languages: ["Hindi","Rajasthani"], avatar: "🏺", verified: true },
  { id: 5, name: "Basavaraj Gowda", craft: "Channapatna Toys", district: "Channapatna", state: "Karnataka", exp: 20, rating: 4.9, products: 2, earnings: 105000, languages: ["Kannada","English"], avatar: "🪵", verified: true },
  { id: 6, name: "Sukhram Baghel", craft: "Dhokra Metal Casting", district: "Bastar", state: "Chhattisgarh", exp: 25, rating: 4.8, products: 2, earnings: 132000, languages: ["Hindi","Gondi"], avatar: "⚒️", verified: true },
  { id: 7, name: "Aparna Maharana", craft: "Pattachitra", district: "Raghurajpur", state: "Odisha", exp: 16, rating: 4.7, products: 2, earnings: 88000, languages: ["Odia"], avatar: "🖌️", verified: true },
  { id: 8, name: "Jivya Dhurve", craft: "Warli Painting", district: "Palghar", state: "Maharashtra", exp: 30, rating: 5.0, products: 2, earnings: 156000, languages: ["Marathi","Hindi"], avatar: "🔺", verified: true },
  { id: 9, name: "Nazeer Ahmed", craft: "Bidriware", district: "Bidar", state: "Karnataka", exp: 28, rating: 4.9, products: 2, earnings: 143000, languages: ["Urdu","Kannada"], avatar: "⚱️", verified: true },
  { id: 10, name: "Harpreet Kaur", craft: "Phulkari Embroidery", district: "Patiala", state: "Punjab", exp: 14, rating: 4.6, products: 2, earnings: 76000, languages: ["Punjabi","Hindi"], avatar: "🧶", verified: true },
  { id: 11, name: "Rasilaben Bhil", craft: "Bandhani", district: "Kutch", state: "Gujarat", exp: 19, rating: 4.8, products: 2, earnings: 98000, languages: ["Gujarati"], avatar: "🌀", verified: true },
  { id: 12, name: "Shabana Khatoon", craft: "Chikankari", district: "Lucknow", state: "Uttar Pradesh", exp: 17, rating: 4.7, products: 2, earnings: 91000, languages: ["Urdu","Hindi"], avatar: "🪢", verified: true },
  { id: 13, name: "Bimal Chitrakar", craft: "Terracotta Craft", district: "Bankura", state: "West Bengal", exp: 21, rating: 4.6, products: 2, earnings: 84000, languages: ["Bengali"], avatar: "🐎", verified: true },
  { id: 14, name: "Venkatesh Naidu", craft: "Kalamkari", district: "Srikalahasti", state: "Andhra Pradesh", exp: 23, rating: 4.8, products: 2, earnings: 112000, languages: ["Telugu"], avatar: "🖋️", verified: true },
  { id: 15, name: "Ratan Debbarma", craft: "Bamboo Craft", district: "West Tripura", state: "Tripura", exp: 10, rating: 4.5, products: 3, earnings: 62000, languages: ["Kokborok","Bengali"], avatar: "🎍", verified: true },
];

const gradients = [
  "from-terracotta to-turmeric","from-madder to-terracotta","from-indigonight to-madder",
  "from-turmeric to-terracotta-dark","from-bronze to-madder","from-terracotta-dark to-indigonight"
];

let pid = 1;
function p(artisanId, name, material, price, tags, desc) {
  const a = ARTISANS.find(x => x.id === artisanId);
  return {
    id: pid++, artisanId, artisan: a.name, craft: a.craft,
    district: a.district, state: a.state, name, material, price,
    tags, desc, gradient: gradients[pid % gradients.length],
    matchScore: 70 + Math.floor(Math.random()*29),
  };
}

export const PRODUCTS = [
  p(1,"Bridal Kanchipuram Silk Saree","Mulberry Silk + Zari",18500,["wedding","premium"],"Handwoven pure silk saree with temple-border zari work, traditional to Kanchipuram."),
  p(1,"Festive Kanchipuram Saree","Silk + Gold Zari",12800,["festive"],"Vibrant contrast-border silk saree, ideal for festive occasions."),
  p(1,"Kanchipuram Silk Dupatta","Silk",3200,["gift","accessory"],"Lightweight silk dupatta with zari edge, perfect gifting piece."),
  p(2,"Madhubani Ram-Sita Wall Art","Handmade Paper + Natural Dyes",2400,["wall-decor","mythology"],"Traditional Mithila painting depicting Ram-Sita motifs in natural pigments."),
  p(2,"Madhubani Tree of Life Canvas","Canvas + Natural Colors",3600,["wall-decor","premium"],"Intricate Tree of Life composition, a Madhubani signature theme."),
  p(3,"Sambalpuri Ikat Saree","Cotton Ikat",4200,["daily-wear","handloom"],"Double-ikat woven cotton saree with traditional Sambalpuri motifs."),
  p(3,"Ikat Dress Material Set","Cotton",1800,["fabric"],"3-piece ikat dress material, tie-dyed before weaving for sharp patterns."),
  p(4,"Blue Pottery Dinner Set","Quartz Ceramic",5600,["home-decor","gift"],"Hand-painted Jaipur blue pottery dinner set, cobalt floral motifs."),
  p(4,"Blue Pottery Flower Vase","Quartz Ceramic",1450,["home-decor"],"Elegant hand-painted vase, lead-free glaze, signature Jaipur blue."),
  p(5,"Channapatna Stacking Toy Set","Ivory Wood + Natural Dye",950,["kids","eco-friendly"],"Lacquered wooden stacking rings, non-toxic vegetable dyes, GI-tagged craft."),
  p(5,"Channapatna Wooden Chess Set","Rosewood + Ivory Wood",2800,["gift","premium"],"Hand-turned wooden chess set with lacquer finish."),
  p(6,"Dhokra Tribal Horse Figurine","Bell Metal (Lost-wax)",1650,["decor","tribal-art"],"Lost-wax bronze-casting technique over 4000 years old, Bastar tribal motif."),
  p(6,"Dhokra Wall Hanging - Tree of Life","Bell Metal",2950,["wall-decor","premium"],"Intricate Dhokra wall art depicting tribal Tree of Life theme."),
  p(7,"Pattachitra Jagannath Scroll","Cloth + Natural Colors",4100,["mythology","collector"],"Traditional Odisha scroll painting depicting Lord Jagannath, natural pigments."),
  p(7,"Pattachitra Palm Leaf Etching","Palm Leaf",1900,["collector","gift"],"Fine hand-etched palm leaf art, a dying Odisha tradition."),
  p(8,"Warli Painting Wedding Canvas","Canvas + Natural White Pigment",3300,["wall-decor","wedding"],"Iconic Warli tribal art depicting a wedding ceremony scene."),
  p(8,"Warli Painted Terracotta Pot","Terracotta + Natural Pigment",1250,["home-decor"],"Warli motifs hand-painted on traditional terracotta pot."),
  p(9,"Bidriware Hookah Base","Zinc Alloy + Silver Inlay",7200,["premium","collector"],"Silver-inlaid Bidriware with signature jet-black oxidised finish."),
  p(9,"Bidriware Decorative Box","Zinc Alloy + Silver Inlay",3800,["gift","premium"],"Handcrafted silver-inlay box, GI-tagged Bidar craft."),
  p(10,"Phulkari Embroidered Dupatta","Khaddar Cotton + Silk Thread",2600,["wedding","accessory"],"Vibrant Phulkari floral embroidery, Punjab bridal tradition."),
  p(10,"Phulkari Cushion Covers (Set of 2)","Cotton + Silk Thread",1400,["home-decor"],"Hand-embroidered cushion covers in classic Phulkari geometric patterns."),
  p(11,"Bandhani Silk Saree","Silk",6800,["festive","handloom"],"Traditional tie-dye Bandhani saree from Kutch, vivid geometric dots."),
  p(11,"Bandhani Dupatta","Georgette",1650,["accessory"],"Lightweight tie-dye dupatta, classic Bandhani leheriya pattern."),
  p(12,"Chikankari Kurta Set","Georgette + Cotton Thread",3450,["daily-wear","festive"],"Fine white-thread Lucknawi Chikankari hand embroidery."),
  p(12,"Chikankari Saree","Georgette",5200,["festive","premium"],"Elegant Chikankari embroidered saree with delicate shadow-work."),
  p(13,"Bankura Terracotta Horse","Terracotta Clay",1200,["decor","collector"],"Iconic elongated-neck Bankura horse, a symbol of Bengal folk art."),
  p(13,"Terracotta Wall Plates (Set of 3)","Terracotta Clay",1650,["wall-decor"],"Hand-molded terracotta plates with traditional Bengal motifs."),
  p(14,"Kalamkari Hand-Painted Saree","Cotton + Vegetable Dyes",4800,["festive","handloom"],"Pen-drawn Kalamkari saree using natural vegetable dyes."),
  p(14,"Kalamkari Wall Tapestry","Cotton",2900,["wall-decor"],"Mythological narrative panel in traditional Srikalahasti Kalamkari style."),
  p(15,"Bamboo Handwoven Basket","Bamboo",650,["eco-friendly","daily-use"],"Handwoven bamboo basket from Tripura, made from locally sourced bamboo, 3 days of craftsmanship."),
  p(15,"Bamboo Table Lamp","Bamboo + Cane",1350,["home-decor","eco-friendly"],"Eco-friendly bamboo-cane lamp shade, handcrafted natural finish."),
  p(15,"Bamboo Storage Organiser Set","Bamboo",980,["eco-friendly","home"],"Set of 3 nested bamboo organisers, sustainably handcrafted."),
];

export const BUYERS = [
  { id: 1, name: "Urban Ethnic Retail Pvt Ltd", type: "Retail Chain", location: "Mumbai" },
  { id: 2, name: "Heritage Home Exports", type: "Exporter", location: "Delhi" },
  { id: 3, name: "CraftCircle Gifting Co.", type: "Corporate Gifting", location: "Bengaluru" },
  { id: 4, name: "Global Weaves Inc.", type: "International Buyer (USA)", location: "New York" },
  { id: 5, name: "Sanskriti Boutique Group", type: "Boutique Chain", location: "Hyderabad" },
];

export const ORDERS = [
  { id: "ORD-2311", product: "Bridal Kanchipuram Silk Saree", buyer: "Sanskriti Boutique Group", amount: 18500, status: "Delivered" },
  { id: "ORD-2312", product: "Kanchipuram Silk Dupatta", buyer: "Urban Ethnic Retail Pvt Ltd", amount: 9600, status: "In Transit" },
  { id: "ORD-2313", product: "Festive Kanchipuram Saree", buyer: "Global Weaves Inc.", amount: 25600, status: "Processing" },
];

export const STATE_DEMAND = [
  { state: "Tamil Nadu", craft: "Kanchipuram Silk", demand: 92, growth: 14 },
  { state: "Bihar", craft: "Madhubani Painting", demand: 74, growth: 22 },
  { state: "Odisha", craft: "Ikat / Pattachitra", demand: 81, growth: 18 },
  { state: "Rajasthan", craft: "Blue Pottery", demand: 68, growth: 9 },
  { state: "Karnataka", craft: "Channapatna / Bidriware", demand: 77, growth: 11 },
  { state: "Chhattisgarh", craft: "Dhokra Casting", demand: 63, growth: 27 },
  { state: "Maharashtra", craft: "Warli Painting", demand: 88, growth: 19 },
  { state: "Punjab", craft: "Phulkari Embroidery", demand: 59, growth: 8 },
  { state: "Gujarat", craft: "Bandhani", demand: 85, growth: 16 },
  { state: "Uttar Pradesh", craft: "Chikankari", demand: 90, growth: 13 },
  { state: "West Bengal", craft: "Terracotta Craft", demand: 55, growth: 10 },
  { state: "Andhra Pradesh", craft: "Kalamkari", demand: 71, growth: 15 },
  { state: "Tripura", craft: "Bamboo Craft", demand: 48, growth: 31 },
];

export const MONTHLY_TREND = [
  { month: "Mar", orders: 120, income: 480000 },
  { month: "Apr", orders: 145, income: 560000 },
  { month: "May", orders: 168, income: 640000 },
  { month: "Jun", orders: 190, income: 710000 },
  { month: "Jul", orders: 224, income: 830000 },
  { month: "Aug", orders: 265, income: 980000 },
];

export const SCHEMES = [
  { name: "PM Vishwakarma Yojana", eligible: true, benefit: "₹15,000 toolkit incentive + collateral-free loan up to ₹3 lakh" },
  { name: "National Handicrafts Development Programme", eligible: true, benefit: "Skill upgradation + marketing support" },
  { name: "Artisan Credit Card Scheme", eligible: true, benefit: "Working capital credit up to ₹2 lakh at subsidised interest" },
];