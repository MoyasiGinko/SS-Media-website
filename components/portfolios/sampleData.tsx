// types/index.ts
export type MediaItem = {
  id: string;
  title: string;
  imagePath: string;
  pdfPath?: string;
  videoPath?: string;
  category: "UI/UX" | "Graphic Design" | "Shorts/Reels" | "Websites" | "Videos";
  subCategory?: string;
  description?: string;
  date?: string;
  views?: number;
  likes?: number;
  duration?: string; // For videos
  thumbnails?: string[]; // For image galleries
  url?: string; // For websites
  client?: string;
  tags?: string[];
};

export const sampleData: MediaItem[] = [
  // UI/UX Projects
  {
    id: "uiux-1",
    title: "Mobile Banking App Redesign",
    imagePath: "/samples/uiux/banking-app.jpg",
    pdfPath: "/samples/uiux/banking-app-case-study.pdf",
    category: "UI/UX",
    description:
      "Complete redesign of a mobile banking application with focus on improved user experience and accessibility",
    date: "2025-03-15",
    client: "FinTech Solutions",
    tags: ["Mobile", "Finance", "UX Research", "Wireframing"],
  },
  {
    id: "uiux-2",
    title: "E-commerce Dashboard",
    imagePath: "/samples/uiux/ecommerce-dashboard.jpg",
    category: "UI/UX",
    description:
      "Comprehensive merchant dashboard for e-commerce platform with analytics and inventory management",
    date: "2025-02-01",
    client: "ShopEasy Platform",
    tags: ["Dashboard", "Analytics", "E-commerce", "Admin Panel"],
  },
  {
    id: "uiux-3",
    title: "Fitness Tracking App",
    imagePath: "/samples/uiux/fitness-app.jpg",
    pdfPath: "/samples/uiux/fitness-app-prototype.pdf",
    category: "UI/UX",
    description:
      "User-centered fitness application with progress tracking and personalized workout plans",
    date: "2025-01-10",
    client: "FitLife",
    tags: ["Mobile", "Health", "Activity Tracking", "Gamification"],
  },
  {
    id: "uiux-4",
    title: "Smart Home Control Interface",
    imagePath: "/samples/uiux/smart-home.jpg",
    category: "UI/UX",
    description:
      "Intuitive interface for controlling smart home devices with voice and touch interactions",
    date: "2024-12-05",
    client: "ConnectedHome Technologies",
    tags: ["IoT", "Smart Home", "Voice UI", "Touchscreen"],
  },

  // Graphic Design Projects
  {
    id: "design-1",
    title: "Eco-Friendly Product Packaging",
    imagePath: "/samples/design/eco-packaging.jpg",
    category: "Graphic Design",
    description:
      "Sustainable packaging design for an organic skincare line using recyclable materials",
    date: "2025-04-02",
    client: "Pure Earth Cosmetics",
    tags: ["Packaging", "Sustainable", "Branding", "Print Design"],
  },
  {
    id: "design-2",
    title: "Tech Conference Branding",
    imagePath: "/samples/design/tech-conference.jpg",
    pdfPath: "/samples/design/tech-conference-brand-guide.pdf",
    category: "Graphic Design",
    description:
      "Complete brand identity for an annual tech innovation conference including logo, typography, and collateral",
    date: "2025-03-22",
    client: "FutureTech Summit",
    tags: ["Branding", "Logo Design", "Event Materials", "Typography"],
  },
  {
    id: "design-3",
    title: "Annual Report Design",
    imagePath: "/samples/design/annual-report.jpg",
    pdfPath: "/samples/design/annual-report-2024.pdf",
    category: "Graphic Design",
    description:
      "Visually compelling annual report design for a multinational corporation with custom infographics",
    date: "2025-02-28",
    client: "Global Ventures Inc.",
    tags: ["Print Design", "Corporate", "Infographics", "Layout"],
  },
  {
    id: "design-4",
    title: "Food Delivery App Icons",
    imagePath: "/samples/design/food-app-icons.jpg",
    category: "Graphic Design",
    description:
      "Cohesive icon set for a food delivery application representing different cuisine categories",
    date: "2025-01-15",
    client: "Meal Rush",
    tags: ["Icon Design", "Mobile", "UI Elements", "Illustration"],
  },

  // Shorts/Reels
  {
    id: "shorts-1",
    title: "Product Launch Teaser",
    imagePath: "/samples/shorts/product-teaser.jpg",
    videoPath: "/samples/shorts/product-teaser.mp4",
    category: "Shorts/Reels",
    description: "15-second vertical video teasing a new smartphone release",
    date: "2025-04-10",
    duration: "0:15",
    views: 45000,
    likes: 3200,
    client: "TechGiant Mobile",
    tags: ["Product Launch", "Teaser", "Vertical Video", "Social Media"],
  },
  {
    id: "shorts-2",
    title: "Cooking Tutorial: 1-Minute Breakfast",
    imagePath: "/samples/shorts/cooking-tutorial.jpg",
    videoPath: "/samples/shorts/cooking-tutorial.mp4",
    category: "Shorts/Reels",
    description: "Quick recipe tutorial optimized for social media sharing",
    date: "2025-03-28",
    duration: "0:58",
    views: 125000,
    likes: 8700,
    client: "Quick Bites Cooking Channel",
    tags: ["Tutorial", "Cooking", "Fast-paced", "Educational"],
  },
  {
    id: "shorts-3",
    title: "Travel Destination Highlight",
    imagePath: "/samples/shorts/travel-highlight.jpg",
    videoPath: "/samples/shorts/travel-highlight.mp4",
    category: "Shorts/Reels",
    description: "Captivating 30-second showcase of a tropical destination",
    date: "2025-03-05",
    duration: "0:30",
    views: 87500,
    likes: 6400,
    client: "Wanderlust Travel Agency",
    tags: ["Travel", "Destination Marketing", "Scenic", "Wanderlust"],
  },
  {
    id: "shorts-4",
    title: "Workout Challenge",
    imagePath: "/samples/shorts/workout-challenge.jpg",
    videoPath: "/samples/shorts/workout-challenge.mp4",
    category: "Shorts/Reels",
    description: "Viral fitness challenge designed for social media engagement",
    date: "2025-02-20",
    duration: "0:22",
    views: 230000,
    likes: 15600,
    client: "FitLifestyle Brand",
    tags: ["Fitness", "Challenge", "Trendy", "User-generated Content"],
  },

  // Websites
  {
    id: "web-1",
    title: "Luxury Real Estate Platform",
    imagePath: "/samples/websites/real-estate.jpg",
    category: "Websites",
    url: "https://luxury-homes-example.com",
    description:
      "High-end real estate website with immersive property showcases and virtual tours",
    date: "2025-04-15",
    client: "Elite Properties",
    tags: ["Real Estate", "Luxury", "Virtual Tours", "Property Listings"],
  },
  {
    id: "web-2",
    title: "Artisanal Bakery E-commerce",
    imagePath: "/samples/websites/bakery.jpg",
    category: "Websites",
    url: "https://sweet-delights-example.com",
    description:
      "Fully responsive e-commerce site for an artisanal bakery with online ordering",
    date: "2025-03-10",
    client: "Sweet Delights Bakery",
    tags: ["E-commerce", "Food & Beverage", "Online Ordering", "Responsive"],
  },
  {
    id: "web-3",
    title: "Nonprofit Organization Portal",
    imagePath: "/samples/websites/nonprofit.jpg",
    category: "Websites",
    url: "https://helping-hands-example.org",
    description:
      "Comprehensive website for a nonprofit with donation integration and volunteer management",
    date: "2025-02-05",
    client: "Helping Hands Foundation",
    tags: [
      "Nonprofit",
      "Donation Platform",
      "Volunteer Management",
      "Community",
    ],
  },
  {
    id: "web-4",
    title: "Medical Practice Website",
    imagePath: "/samples/websites/medical.jpg",
    category: "Websites",
    url: "https://wellness-clinic-example.com",
    description:
      "Professional healthcare provider website with appointment scheduling and patient resources",
    date: "2025-01-20",
    client: "Wellness Medical Group",
    tags: [
      "Healthcare",
      "Appointment Booking",
      "Patient Portal",
      "Medical Services",
    ],
  },

  // Videos
  {
    id: "video-1",
    title: "Sustainable Agriculture Documentary",
    imagePath: "/samples/videos/agriculture-doc.jpg",
    videoPath: "/samples/videos/agriculture-documentary.mp4",
    category: "Videos",
    subCategory: "Documentary",
    description:
      "In-depth documentary exploring innovative sustainable farming practices",
    date: "2025-04-20",
    duration: "26:42",
    client: "GreenEarth Initiative",
    tags: ["Documentary", "Agriculture", "Sustainability", "Educational"],
  },
  {
    id: "video-2",
    title: "Advanced Data Analysis Tutorial",
    imagePath: "/samples/videos/data-tutorial.jpg",
    videoPath: "/samples/videos/data-analysis-tutorial.mp4",
    category: "Videos",
    subCategory: "Educational Videos",
    description:
      "Comprehensive tutorial on advanced data analysis techniques for professionals",
    date: "2025-03-25",
    duration: "18:15",
    client: "DataMasters Academy",
    tags: ["Tutorial", "Data Science", "Professional Development", "Technical"],
  },
  {
    id: "video-3",
    title: "CEO Interview Series",
    imagePath: "/samples/videos/ceo-interview.jpg",
    videoPath: "/samples/videos/ceo-interview.mp4",
    category: "Videos",
    subCategory: "Talking Head",
    description:
      "Engaging interview with industry-leading CEO on business innovation",
    date: "2025-02-15",
    duration: "32:10",
    client: "Business Insider Magazine",
    tags: ["Interview", "Business", "Leadership", "Corporate"],
  },
  {
    id: "video-4",
    title: "Championship Highlights",
    imagePath: "/samples/videos/sports-highlights.jpg",
    videoPath: "/samples/videos/championship-highlights.mp4",
    category: "Videos",
    subCategory: "Sports",
    description:
      "Dynamic highlight reel from the national basketball championship",
    date: "2025-01-30",
    duration: "8:45",
    client: "National Basketball Association",
    tags: ["Sports", "Basketball", "Highlights", "Championship"],
  },
  {
    id: "video-5",
    title: "New Electric Vehicle Promotion",
    imagePath: "/samples/videos/ev-promo.jpg",
    videoPath: "/samples/videos/ev-promotion.mp4",
    category: "Videos",
    subCategory: "Promo/Ad",
    description:
      "Cinematic promotional video for latest electric vehicle model",
    date: "2025-01-05",
    duration: "1:45",
    client: "EcoMotors",
    tags: ["Advertisement", "Automotive", "Electric Vehicle", "Product Launch"],
  },
];

export default sampleData;
