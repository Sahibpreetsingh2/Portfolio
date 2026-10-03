require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Category = require('../models/Category');
const Project = require('../models/Project');
const Testimonial = require('../models/Testimonial');

// const IMG = (seed, w = 1600, h = 1200) => `https://picsum.photos/seed/${seed}/${w}/${h}`;
const PROJECT_IMAGES = {

  'Dim Sum Restaurant Branding': {
    cover: 'https://res.cloudinary.com/v1epgxfd/image/upload/v1790935323/WhatsApp_Image_2026-10-01_at_11.25.46_PM.jpg',
    gallery: [
      "https://res.cloudinary.com/v1epgxfd/image/upload/v1790935319/dimsum_1.png",
      "https://res.cloudinary.com/v1epgxfd/image/upload/v1790935323/WhatsApp_Image_2026-10-01_at_11.25.46_PM.jpg",
      "https://res.cloudinary.com/v1epgxfd/image/upload/v1790935321/1_1.png",
      "https://res.cloudinary.com/v1epgxfd/image/upload/v1790935329/poster_7_1.png"
    ]
  },

  'Glow in the Dark Party': {
    cover: 'https://res.cloudinary.com/v1epgxfd/image/upload/v1790958814/WhatsApp_Image_2026-10-02_at_9.59.39_PM.jpg',
    gallery: [
      "https://res.cloudinary.com/v1epgxfd/image/upload/v1790958814/WhatsApp_Image_2026-10-02_at_9.59.39_PM.jpg",
      "https://res.cloudinary.com/v1epgxfd/image/upload/v1791016124/file_000000007cbc8207b28c1a114a68f54a.png"
    ]
  },

  // corrected the cover image for 'Aether Coffee' to a valid URL
  'Hamilton Coffee Shop Branding': {
    cover: 'https://res.cloudinary.com/v1epgxfd/image/upload/v1790959179/3.png',
    gallery: [
      "https://res.cloudinary.com/v1epgxfd/image/upload/v1790958815/WhatsApp_Image_2026-10-02_at_9.59.41_PM.jpg"
    ]
  },

  'Modern Website Development': {
    cover: 'https://res.cloudinary.com/v1epgxfd/image/upload/v1790934887/poster_5.png',
    gallery: [
      "https://res.cloudinary.com/v1epgxfd/image/upload/v1790934888/poster_4.png"
    ]
  },

  // corrected the cover image for 'Orbit Gym' to a valid URL
  'Orbit Gym': {
    cover: 'https://res.cloudinary.com/v1epgxfd/image/upload/v1790935331/gym_1.png',
    gallery: [
      "https://res.cloudinary.com/v1epgxfd/image/upload/v1790935327/poster_13.png"
    ]
  },

  'Coffee Shop': {
    cover: 'https://res.cloudinary.com/v1epgxfd/image/upload/v1790935321/5.png',
    gallery: [
      "https://res.cloudinary.com/v1epgxfd/image/upload/v1790935332/poster_14_1.png",
      "https://res.cloudinary.com/v1epgxfd/image/upload/v1790935321/Paper_Logo_Mockup_PHOTOPEA.png",
      "https://res.cloudinary.com/v1epgxfd/image/upload/v1790935314/COFFEE_FIRST._EVERYTHING_ELSE_LATER._1.png"
    ]
  },

  'Fashion Studio Identity': {
    cover: 'https://res.cloudinary.com/v1epgxfd/image/upload/v1790959179/WhatsApp_Image_2026-10-02_at_10.00.24_PM.jpg',
    gallery: [
      "https://res.cloudinary.com/v1epgxfd/image/upload/v1790960744/poster_2.png",
      "https://res.cloudinary.com/v1epgxfd/image/upload/v1790959179/WhatsApp_Image_2026-10-02_at_10.00.24_PM.jpg"
    ]
  } 
};

const categories = [
  { name: 'Branding', description: 'Logo, typography, color systems and full visual identity.' },
  { name: 'UI/UX', description: 'Interfaces and digital product experiences.' },
  { name: 'Poster', description: 'Campaign and promotional poster design.' },
  { name: 'Packaging', description: 'Product packaging and physical presentation.' },
];


const projects = [
{
  title: 'Dim Sum Restaurant Branding',
  category: 'Branding',
  client: 'Dim Sum',
  industry: 'Food & Beverage',
  services: ['Brand Identity', 'Poster Design', 'Food Advertising'],
  // timeline: '4 weeks',
  role: 'Brand Designer',
  year: 2026,

  description:
    'A bold visual identity and promotional campaign created for a modern dim sum food brand.',

  challenge:
    'Create an eye-catching food identity that communicates freshness, taste and a memorable dining experience.',

  concept:
    'A bold typographic composition combined with appetizing food photography and a deep green palette to create a distinctive restaurant campaign.',

  process: [
    {
      stage: 'Research',
      detail: 'Studied restaurant branding, food advertising and contemporary Asian food identities.'
    },
    {
      stage: 'Moodboard',
      detail: 'Collected references for typography, food photography, color and restaurant advertising.'
    },
    {
      stage: 'Sketches',
      detail: 'Explored bold typographic layouts and food-focused compositions.'
    },
    {
      stage: 'Concept development',
      detail: 'Combined oversized typography with product photography to create a strong promotional visual.'
    },
    {
      stage: 'Design system',
      detail: 'Developed typography, colors and layout rules for promotional materials.'
    },
    {
      stage: 'Final design',
      detail: 'Delivered the final dim sum promotional poster for digital and print use.'
    }
  ],

  tags: ['branding', 'food', 'restaurant', 'poster', 'advertising'],

  featured: true,
  published: true
},
  {
  title: 'Glow in the Dark Party',
  category: 'Poster',
  client: 'DJ Schwartz & DJ Gallego',
  industry: 'Events & Entertainment',
  services: [
    'Event Poster',
    'Typography',
    'Visual Design',
    'Campaign Design'
  ],
  // timeline: '2 weeks',
  role: 'Graphic Designer',
  year: 2026,

  description:
    'A high-energy event poster designed for a glow-in-the-dark party featuring bold typography, neon lighting effects and an atmospheric nightlife aesthetic.',

  challenge:
    'Create an eye-catching event poster that communicates the energy of a nighttime party while making the event details easy to discover.',

  concept:
    'A dark visual environment combined with glowing cyan typography and flowing light effects to create a futuristic nightlife atmosphere.',

  process: [
    {
      stage: 'Research',
      detail:
        'Studied nightlife event posters, DJ promotions and contemporary party campaign designs.'
    },
    {
      stage: 'Moodboard',
      detail:
        'Collected references around neon lighting, dark environments, glow effects and nightlife photography.'
    },
    {
      stage: 'Typography',
      detail:
        'Explored bold display typography combined with handwritten script elements for contrast.'
    },
    {
      stage: 'Visual Development',
      detail:
        'Built the glowing typography and abstract light effects around the central event message.'
    },
    {
      stage: 'Final Design',
      detail:
        'Created the final event poster with date, time, ticket information and promotional details.'
    }
  ],

  tags: [
    'poster',
    'event',
    'dj',
    'nightlife',
    'typography',
    'campaign'
  ],

  featured: true,
  published: true,
},
 {
  title: 'Hamilton Coffee Shop Branding',
  category: 'Branding',
  client: 'Hamilton Coffee',
  industry: 'Food & Beverage',
  services: [
    'Brand Identity',
    'Poster Design',
    'Typography',
    'Visual Direction'
  ],
  // timeline: '3 weeks',
  role: 'Brand Designer',
  year: 2026,

  description:
    'A warm and elegant visual identity created for Hamilton Coffee Shop, combining coffee photography, refined typography and a handcrafted brand aesthetic.',

  challenge:
    'Create a memorable coffee shop identity that communicates warmth, quality and a handcrafted coffee experience.',

  concept:
    'A rich coffee-inspired visual system using warm brown tones, elegant typography and detailed coffee-bean photography.',

  process: [
    {
      stage: 'Research',
      detail:
        'Studied coffee shop branding, specialty coffee packaging and hospitality visual identities.'
    },
    {
      stage: 'Moodboard',
      detail:
        'Collected references around coffee beans, warm textures, elegant typography and cozy café environments.'
    },
    {
      stage: 'Concept Development',
      detail:
        'Developed a warm visual direction centered around coffee photography and sophisticated typography.'
    },
    {
      stage: 'Visual Design',
      detail:
        'Created the poster layout, typography system, decorative elements and supporting visual language.'
    },
    {
      stage: 'Final Design',
      detail:
        'Delivered a promotional coffee shop poster suitable for digital and print applications.'
    }
  ],

  tags: [
    'branding',
    'coffee',
    'restaurant',
    'food',
    'poster',
    'typography'
  ],

  featured: true,
  published: true,
},
{
  title: 'Modern Website Development',
  category: 'UI/UX',
  client: 'YourBrand',
  industry: 'Technology & Web Services',
  services: [
    'Website Development',
    'Responsive Design',
    'API Integration',
    'Database Integration',
    'Authentication'
  ],
  // timeline: '4 weeks',
  role: 'Full Stack Developer',
  year: 2026,

  description:
    'A modern, responsive and high-performance website designed to turn business ideas into powerful digital experiences.',

  challenge:
    'Create a professional website that works smoothly across desktop and mobile devices while providing a fast, responsive and user-friendly experience.',

  concept:
    'A clean and modern interface combining strong typography, responsive layouts, clear calls to action and a technology-focused visual style.',

  process: [
    {
      stage: 'Research',
      detail: 'Analyzed business requirements, target users and competitor websites.'
    },
    {
      stage: 'Planning',
      detail: 'Defined the website structure, pages, user flows and technical requirements.'
    },
    {
      stage: 'UI Design',
      detail: 'Created a modern responsive interface for desktop, tablet and mobile devices.'
    },
    {
      stage: 'Development',
      detail: 'Built the website with modern frontend and backend technologies.'
    },
    {
      stage: 'Integration',
      detail: 'Integrated APIs, database functionality, authentication and required business features.'
    },
    {
      stage: 'Testing & Delivery',
      detail: 'Tested responsiveness, functionality and performance before final deployment.'
    }
  ],

  tags: [
    'web-development',
    'full-stack',
    'responsive',
    'react',
    'nodejs',
    'spring-boot',
    'mysql',
    'mongodb'
  ],

  featured: true,
  published: true
},
  {
    title: 'Orbit Gym',
    category: 'Branding',
    client: 'Orbit Gym',
    industry: 'Fitness',
    services: ['Brand Identity', 'Marketing Materials'],
    // timeline: '4 weeks',
    role: 'Designer',
    year: 2026,
    description: 'A social-first campaign for a running shoe launch.',
    challenge: 'Create assets that work natively across five different social platforms.',
    concept: 'Motion-blurred photography paired with kinetic, oversized type.',
    process: [
      { stage: 'Research', detail: 'Audited competitor launch campaigns across platforms.' },
      { stage: 'Moodboard', detail: 'Collected kinetic typography and motion-photography references.' },
      { stage: 'Sketches', detail: 'Layout studies for stories, feed and out-of-home formats.' },
      { stage: 'Concept development', detail: 'Locked the kinetic type treatment.' },
      { stage: 'Design system', detail: 'Built a flexible template set for the launch window.' },
      { stage: 'Final design', detail: 'Delivered 40+ assets across five platforms.' },
    ],
    tags: ['social', 'campaign'],
    featured: false,
    published: true,
  },
{
  title: 'Coffee Shop',
  category: 'Branding',
  client: 'Coffee Shop',
  industry: 'Food & Beverage',
  services: [
    'Brand Identity',
    'Poster Design',
    'Typography',
    'Visual Design'
  ],
  // timeline: '3 weeks',
  role: 'Brand Designer',
  year: 2026,

  description:
    'A warm and inviting visual identity created for a modern coffee shop, combining rich coffee imagery, elegant typography and a cozy brand aesthetic.',

  challenge:
    'Create a memorable coffee shop identity that communicates warmth, quality and a welcoming customer experience.',

  concept:
    'A coffee-inspired visual direction built around warm brown tones, coffee-bean imagery, elegant typography and a handcrafted café atmosphere.',

  process: [
    {
      stage: 'Research',
      detail:
        'Studied coffee shop branding, café identities and food advertising.'
    },
    {
      stage: 'Moodboard',
      detail:
        'Explored coffee beans, warm textures, typography and cozy café aesthetics.'
    },
    {
      stage: 'Concept Development',
      detail:
        'Developed a warm and premium visual direction for the coffee shop.'
    },
    {
      stage: 'Visual Design',
      detail:
        'Created the typography, layout, imagery and supporting graphic elements.'
    },
    {
      stage: 'Final Design',
      detail:
        'Delivered the final coffee shop promotional design for digital and print use.'
    }
  ],

  tags: [
    'coffee',
    'coffee-shop',
    'branding',
    'food',
    'poster',
    'typography'
  ],

  featured: true,
  published: true
},
  {
  title: 'Fashion Studio Identity',
  category: 'Branding',
  client: 'Fashion Studio',
  industry: 'Fashion & Apparel',
  services: [
    'Brand Identity',
    'Typography',
    'Visual Design',
    'Promotional Design'
  ],
  // timeline: '3 weeks',
  role: 'Brand Designer',
  year: 2026,

  description:
    'A playful and contemporary visual identity for a fashion studio combining expressive typography, organic graphics and a warm pastel color palette.',

  challenge:
    'Develop a distinctive fashion identity that feels modern, creative and approachable while maintaining a strong visual personality.',

  concept:
    'A playful editorial direction combining oversized serif typography, handwritten lettering, abstract brush forms and soft pastel colors.',

  process: [
    {
      stage: 'Research',
      detail:
        'Studied contemporary fashion identities, editorial layouts and boutique fashion branding.'
    },
    {
      stage: 'Moodboard',
      detail:
        'Collected references featuring pastel colors, expressive typography, abstract shapes and fashion editorial graphics.'
    },
    {
      stage: 'Typography',
      detail:
        'Combined elegant serif typography with expressive handwritten lettering to create contrast.'
    },
    {
      stage: 'Visual Development',
      detail:
        'Developed the brush-style graphic element and geometric background pattern.'
    },
    {
      stage: 'Final Design',
      detail:
        'Created the final fashion studio promotional identity with a distinctive editorial composition.'
    }
  ],

  tags: [
    'branding',
    'fashion',
    'typography',
    'editorial',
    'graphic-design'
  ],

  featured: true,
  published: true,
}
];

const testimonials = [
  {
    clientName: 'Maya Chen',
    company: 'Nova Audio',
    designation: 'Founder',
    rating: 5,
    message:
      'Working with this studio completely changed how our brand is perceived. Every deliverable felt considered and precise.',
    published: true,
  },
  {
    clientName: 'Havenz Studio',
    company: 'FreeLance',
    designation: 'Head of Product',
    rating: 5,
    message:
      'The design system we received didn\'t just look good, it held up across every edge case our engineers threw at it.',
    published: true,
  },
  // {
  //   clientName: 'Sofia Marchetti',
  //   company: 'Atelier Studio',
  //   designation: 'Principal Architect',
  //   rating: 5,
  //   message:
  //     'A rare designer who listens more than they talk. The identity captured exactly how we wanted to be seen.',
  //   published: true,
  // },
  // {
  //   clientName: 'Priya Nair',
  //   company: 'Forma Skincare',
  //   designation: 'Marketing Director',
  //   rating: 4,
  //   message: 'Fast, professional, and genuinely collaborative. Our packaging has never gotten more compliments.',
  //   published: true,
  // },
];

const run = async () => {
  await connectDB();

  console.log('Clearing existing data...');
  await Promise.all([
    Category.deleteMany({}),
    Project.deleteMany({}),
    Testimonial.deleteMany({}),
  ]);

  console.log('Seeding categories...');
  await Category.insertMany(categories);


  // console.log('Seeding projects...');
  // const projectDocs = projects.map((p, i) => ({
  //   ...p,
  //   coverImage: { url: IMG(`${p.title}-cover`), alt: p.title },
  //   galleryImages: [1, 2, 3, 4].map((n) => ({
  //     url: IMG(`${p.title}-gallery-${n}`),
  //     alt: `${p.title} gallery image ${n}`,
  //     order: n,
  //   })),
  // }));
console.log('Seeding projects...');

const projectDocs = projects.map((p) => ({
  ...p,

  coverImage: {
    url: PROJECT_IMAGES[p.title].cover,
    alt: p.title
  },

  galleryImages: PROJECT_IMAGES[p.title].gallery.map((url, index) => ({
    url,
    alt: `${p.title} gallery image ${index + 1}`,
    order: index + 1
  }))
}));

  await Project.insertMany(projectDocs);

  console.log('Seeding testimonials...');
  await Testimonial.insertMany(testimonials);

  console.log('Seeding admin account...');
  const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (!existingAdmin) {
    await User.create({
      name: process.env.ADMIN_NAME || 'Admin',
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      password: process.env.ADMIN_PASSWORD || 'ChangeMe123!',
      role: 'admin',
    });
    console.log(`Admin created: ${process.env.ADMIN_EMAIL || 'admin@example.com'}`);
  } else {
    console.log('Admin already exists, skipping.');
  }

  console.log('Seed complete.');
  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
