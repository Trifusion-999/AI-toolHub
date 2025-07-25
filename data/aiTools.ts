// update images 


export interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  isPaid: boolean;
  price?: number;
  rating: number;
  image: string;
}

export const aiToolsData: AITool[] = [
  // General Purpose
  {
    id: '1',
    name: 'Perplexity',
    description: 'AI-powered search engine that provides accurate, real-time answers with sources.',
    category: 'General Purpose',
    url: 'https://www.perplexity.ai/',
    isPaid: false,
    rating: 4.8,
    image: 'https://i.pinimg.com/736x/4a/c0/2c/4ac02cd1d6777266426dfc803a774762.jpg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '2',
    name: 'Claude',
    description: 'Advanced AI assistant by Anthropic for complex reasoning and analysis.',
    category: 'General Purpose',
    url: 'https://claude.ai/new',
    isPaid: true,
    price: 20,
    rating: 4.9,
    image: 'https://claude.ai/images/claude_ogimage.png?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '3',
    name: 'Grok',
    description: 'AI chatbot by xAI with real-time internet access and humor.',
    category: 'General Purpose',
    url: 'https://www.x.ai/grok',
    isPaid: true,
    price: 16,
    rating: 4.5,
    image: 'https://i.pinimg.com/1200x/0a/17/fd/0a17fddeb8eadebaeacff0e9424b352f.jpg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '4',
    name: 'ChatGPT',
    description: 'OpenAI\'s conversational AI for various tasks and creative writing.',
    category: 'General Purpose',
    url: 'https://chat.openai.com/',
    isPaid: true,
    price: 20,
    rating: 4.7,
    image: 'https://i.pinimg.com/736x/ef/bb/d6/efbbd6d33b8e81acf73d72e1f9013ef0.jpg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '5',
    name: 'Gemini',
    description: 'Google\'s AI assistant for productivity and creative tasks.',
    category: 'General Purpose',
    url: 'https://gemini.google.com/',
    isPaid: false,
    rating: 4.6,
    image: 'https://it.wisc.edu/wp-content/uploads/Google-Gemini-1080x480-News-Image.jpg?auto=compress&cs=tinysrgb&w=300'
  },

  // Writing Code
  {
    id: '6',
    name: 'Cursor',
    description: 'AI-powered code editor with intelligent suggestions and pair programming.',
    category: 'Writing Code',
    url: 'https://cursor.com/',
    isPaid: true,
    price: 20,
    rating: 4.8,
    image: 'https://cursor.com/en/twitter-image.png?375711d39ab904b7?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '7',
    name: 'Replit',
    description: 'Collaborative online IDE with AI-powered coding assistance.',
    category: 'Writing Code',
    url: 'https://replit.com/',
    isPaid: true,
    price: 7,
    rating: 4.5,
    image: 'https://refine-web.imgix.net/blog/2025-02-17-replit/social.png?w=1788?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '8',
    name: 'Windsurf AI',
    description: 'AI-powered development environment for modern web development.',
    category: 'Writing Code',
    url: 'https://windsurf.ai/',
    isPaid: true,
    price: 15,
    rating: 4.7,
    image: 'https://analyticsindiamag.com/wp-content/uploads/2025/04/windsurf-featured.png?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '9',
    name: 'GitHub Copilot',
    description: 'AI pair programmer that helps you write code faster.',
    category: 'Writing Code',
    url: 'https://github.com/features/copilot',
    isPaid: true,
    price: 10,
    rating: 4.6,
    image: 'https://i.pinimg.com/736x/5b/e1/0f/5be10f1ea3625480288bfd567b68bba8.jpg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '10',
    name: 'Tabnine',
    description: 'AI code completion tool that learns from your coding patterns.',
    category: 'Writing Code',
    url: 'https://www.tabnine.com/',
    isPaid: true,
    price: 12,
    rating: 4.4,
    image: 'https://turbine.ai/wp-content/uploads/2025/04/Turbine-logo-06-scaled.jpg?auto=compress&cs=tinysrgb&w=300'
  },

  // Productivity
  {
    id: '11',
    name: 'Adobe PDF Chat',
    description: 'AI-powered PDF assistant for document analysis and questions.',
    category: 'Productivity',
    url: 'https://www.adobe.com/in/acrobat/online/ai-chat-pdf.html',
    isPaid: true,
    price: 22.99,
    rating: 4.3,
    image: 'https://i.pinimg.com/736x/3c/a3/1c/3ca31c3f0d55b672504c92d8f0d9c3fc.jpg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '12',
    name: 'Gamma',
    description: 'AI-powered presentation maker that creates beautiful slides instantly.',
    category: 'Productivity',
    url: 'https://gamma.app/',
    isPaid: true,
    price: 8,
    rating: 4.5,
    image: 'https://cdn.mos.cms.futurecdn.net/cfo9wrPuw9H2NXugivFUJh.jpg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '13',
    name: 'WisprFlow',
    description: 'Effortless voice dictation in every application, 4x faster than typing, AI commands and auto-edits',
    category: 'Productivity',
    url: 'https://wisprflow.ai/',
    isPaid: true,
    price: 25,
    rating: 4.2,
    image: 'https://i.pinimg.com/736x/b1/8b/19/b18b192dc158f1df67de92ebac0a59f0.jpg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '14',
    name: 'Granola',
    description: 'AI-powered meeting notes and productivity assistant.',
    category: 'Productivity',
    url: 'https://www.granola.ai/',
    isPaid: true,
    price: 10,
    rating: 4.4,
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/03/73/df/0373df9a-b61d-435f-a2b4-85bf0a1c4bb2/AppIcon-0-1x_U007emarketing-0-0-0-8-0-0-sRGB-85-220-0.png/1200x630wa.png?auto=compress&cs=tinysrgb&w=300'
  },

  // Audience Building
  {
    id: '15',
    name: 'Delphi',
    description: 'AI-powered audience insights and engagement platform.',
    category: 'Audience Building',
    url: 'https://www.delphiai.com/',
    isPaid: true,
    price: 39,
    rating: 4.1,
    image: 'https://i.pinimg.com/736x/a6/1e/5b/a61e5bc0b9947b2e022539069839efec.jpg?auto=compress&cs=tinysrgb&w=300' // edit
  },
  {
    id: '16',
    name: 'HeyGen',
    description: 'AI video generation platform for personalized content creation.',
    category: 'Audience Building',
    url: 'https://www.heygen.com/',
    isPaid: true,
    price: 24,
    rating: 4.6,
    image: 'https://dynamic.heygen.ai/www/Marketing-Page/SIZZLE_0410_FNL.mp4/ik-thumbnail.jpg?updatedAt=1744327781856?auto=compress&cs=tinysrgb&w=300' 
  },
  {
    id: '17',
    name: 'Persona',
    description: 'AI-driven persona development for targeted marketing.',
    category: 'Audience Building',
    url: 'https://www.persona.co/',
    isPaid: true,
    price: 49,
    rating: 4.3,
    image: 'https://personainc.ai/wp-content/uploads/2025/05/PersonaAI-logo.jpg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '18',
    name: 'Captions',
    description: 'Generate and edit talking videos with AI.',
    category: 'Audience Building',
    url: 'https://www.captions.ai/',
    isPaid: true,
    price: 16,
    rating: 4.4,
    image: 'https://cdn.prod.website-files.com/61e75b706cf5aa711b66c13e/6480fa5d11a49048cbf8b5a8_captionai-standalone-free-ai-caption-generator.jpg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '19',
    name: 'OpusClips',
    description: 'AI video editor that turns long videos into viral short clips.',
    category: 'Audience Building',
    url: 'https://www.opus.pro/',
    isPaid: true,
    price: 9.5,
    rating: 4.5,
    image: 'https://netolink.com/wp-content/uploads/2024/10/OpusClip.png?auto=compress&cs=tinysrgb&w=300'
  },

  // Creativity
  {
    id: '20',
    name: 'ElevenLabs',
    description: 'AI voice synthesis and text-to-speech technology.',
    category: 'Creativity',
    url: 'https://elevenlabs.io/',
    isPaid: true,
    price: 5,
    rating: 4.7,
    image: 'https://miro.medium.com/v2/resize:fit:1400/1*Vg9okOmVT4WEtnDXBSiVrQ.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '21',
    name: 'Bolt',
    description: 'Create stunning apps & websites by chatting with AI.',
    category: 'Creativity',
    url: 'https://bolt.new/',
    isPaid: true,
    price: 10,
    rating: 4.8,
    image: 'https://miro.medium.com/v2/resize:fit:1400/1*8JkXPJ1jQyeQRskRArptXQ.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '22',
    name: 'Suno AI',
    description: 'AI music generation platform for creating original songs.',
    category: 'Creativity',
    url: 'https://suno.ai/',
    isPaid: true,
    price: 8,
    rating: 4.6,
    image: 'https://www.billboard.com/wp-content/uploads/2024/05/suno-logo-2024-billboard-1548.jpg?w=942&h=623&crop=1?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '23',
    name: 'Krea',
    description: 'AI-powered creative tool for image and video generation.',
    category: 'Creativity',
    url: 'https://www.krea.ai/',
    isPaid: true,
    price: 24,
    rating: 4.4,
    image: 'https://aiperceiver.com/wp-content/uploads/2024/07/Krea-AI.jpg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '24',
    name: 'Photoroom',
    description: 'AI background removal and photo editing for e-commerce.',
    category: 'Creativity',
    url: 'https://www.photoroom.com/',
    isPaid: true,
    price: 9.99,
    rating: 4.5,
    image: 'https://i.pinimg.com/1200x/3f/44/68/3f4468b78c6db249a167e92cbd1f420f.jpg?auto=compress&cs=tinysrgb&w=300'
  },

  // Learning and Growth
  {
    id: '25',
    name: 'Particle News',
    description: 'AI-curated news summaries for staying informed efficiently.',
    category: 'Learning and Growth',
    url: 'https://particle.news/',
    isPaid: false,
    rating: 4.2,
    image: 'https://i.pinimg.com/1200x/47/d9/d7/47d9d785c9113324da2fb0d8a08252de.jpg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '26',
    name: 'Rosebud',
    description: 'AI-powered journaling for personal growth and reflection.',
    category: 'Learning and Growth',
    url: 'https://rosebud.ai/',
    isPaid: true,
    price: 15,
    rating: 4.3,
    image: 'https://cdn-1.webcatalog.io/catalog/rosebud/rosebud-social-preview.png?v=1719461184099?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '27',
    name: 'NotebookLM',
    description: 'Google\'s AI-powered research and note-taking assistant.',
    category: 'Learning and Growth',
    url: 'https://notebooklm.google/',
    isPaid: false,
    rating: 4.5,
    image: 'https://i.pinimg.com/1200x/17/d3/12/17d312c391d5f729eaf0266f17db44b5.jpg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '28',
    name: 'GoodInside',
    description: 'AI-powered parenting guidance and child development insights.',
    category: 'Learning and Growth',
    url: 'https://www.goodinside.com/',
    isPaid: true,
    price: 11.99,
    rating: 4.4,
    image: 'https://i.pinimg.com/736x/f4/6b/c9/f46bc9b1bba1f478e2b33d9e9b01865e.jpg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '29',
    name: 'Ash',
    description: 'first AI designed for therapy',
    category: 'Mental Health',
    url: 'https://www.talktoash.com/',
    isPaid: true,
    price: 9,
    rating: 4.1,
    image: 'https://i.pinimg.com/736x/a6/51/88/a65188354dd888db89eba2bf89fa1567.jpg?auto=compress&cs=tinysrgb&w=300' // edit
  }
];

export const categories = [
  'All',
  'General Purpose',
  'Mental Health',
  'Writing Code',
  'Productivity',
  'Audience Building',
  'Creativity',
  'Learning and Growth'
];