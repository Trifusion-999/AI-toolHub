export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  price: number;
  originalPrice?: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  students: number;
  instructor: string;
  image: string;
  isFree: boolean;
}

export const coursesData: Course[] = [
  // Better Programming
  {
    id: 'course-1',
    title: 'CS50: Introduction to Computer Science',
    description: 'Harvard\'s introduction to computer science and programming.',
    category: 'Programming',
    url: 'https://cs50.harvard.edu/',
    price: 0,
    duration: '2 weeks',
    level: 'Beginner',
    rating: 4.9,
    students: 100000,
    instructor: 'David J. Malan',
    image: 'https://miro.medium.com/v2/resize:fit:700/1*IYCifTCCR2ah-79u94Z3wg.png?auto=compress&cs=tinysrgb&w=400',
    isFree: true
  },
  {
    id: 'course-2',
    title: 'Clean Code Fundamentals',
    description: 'Learn to write maintainable, readable, and efficient code.',
    category: 'Programming',
    url: 'https://cleancoders.com/',
    price: 199,
    originalPrice: 299,
    duration: '8 weeks',
    level: 'Intermediate',
    rating: 4.7,
    students: 15000,
    instructor: 'Robert C. Martin',
    image: 'https://i.pinimg.com/1200x/85/f2/56/85f256a4ff66cc32bb0175eb43e1dc04.jpg?auto=compress&cs=tinysrgb&w=400',
    isFree: false
  },
  {
    id: 'course-3',
    title: 'Data Structures and Algorithms Specialization',
    description: 'Master algorithmic programming techniques and data structures.',
    category: 'DSA',
    url: 'https://www.coursera.org/',
    price: 60,
    duration: '6 months',
    level: 'Intermediate',
    rating: 4.6,
    students: 50000,
    instructor: 'UC San Diego',
    image: 'https://i.pinimg.com/736x/e1/34/fc/e134fc7c5327e0f5784035fc8eece3a9.jpg?auto=compress&cs=tinysrgb&w=400',
    isFree: false
  },
  {
    id: 'course-4',
    title: 'Git & GitHub Complete Guide',
    description: 'Master version control with Git and collaboration on GitHub.',
    category: 'Git',
    url: 'https://docs.github.com/get-started/using-git',
    price: 0,
    duration: '4 weeks',
    level: 'Beginner',
    rating: 4.5,
    students: 75000,
    instructor: 'GitHub Team',
    image: 'https://i.pinimg.com/736x/5b/e1/0f/5be10f1ea3625480288bfd567b68bba8.jpg?auto=compress&cs=tinysrgb&w=400',
    isFree: true
  },
  {
    id: 'course-5',
    title: 'Object-Oriented Programming in Java',
    description: 'Learn OOP concepts and Java programming fundamentals.',
    category: 'Programming',
    url: 'https://docs.oracle.com/javase/tutorial/java/concepts/',
    price: 89,
    originalPrice: 149,
    duration: '10 weeks',
    level: 'Beginner',
    rating: 4.4,
    students: 35000,
    instructor: 'Oracle Corporation',
    image: 'https://i.pinimg.com/1200x/8f/fe/bd/8ffebd10c3041e2b62c1ef41cb4334c4.jpg?auto=compress&cs=tinysrgb&w=400',
    isFree: false
  },

  // AI/ML
  {
    id: 'course-6',
    title: 'Machine Learning by Andrew Ng',
    description: 'The most popular machine learning course taught by Andrew Ng.',
    category: 'AI/ML',
    url: 'https://www.coursera.org/learn/machine-learning',
    price: 49,
    duration: '11 weeks',
    level: 'Intermediate',
    rating: 4.9,
    students: 4000000,
    instructor: 'Andrew Ng',
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=400',
    isFree: false
  },
  {
    id: 'course-7',
    title: 'Deep Learning Specialization',
    description: 'Master deep learning and neural networks with practical projects.',
    category: 'AI/ML',
    url: 'https://www.deeplearning.ai/',
    price: 49,
    duration: '5 months',
    level: 'Advanced',
    rating: 4.8,
    students: 500000,
    instructor: 'Andrew Ng',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    isFree: false
  },
  {
    id: 'course-8',
    title: 'Natural Language Processing Specialization',
    description: 'Learn to process and analyze text data with machine learning.',
    category: 'AI/ML',
    url: 'https://www.coursera.org/specializations/natural-language-processing',
    price: 49,
    duration: '4 months',
    level: 'Advanced',
    rating: 4.6,
    students: 100000,
    instructor: 'DeepLearning.AI',
    image: 'https://images.pexels.com/photos/8566526/pexels-photo-8566526.jpeg?auto=compress&cs=tinysrgb&w=400',
    isFree: false
  },
  {
    id: 'course-9',
    title: 'Machine Learning with Python',
    description: 'Practical machine learning using Python and scikit-learn.',
    category: 'AI/ML',
    url: 'https://www.coursera.org/learn/machine-learning-with-python',
    price: 39,
    originalPrice: 79,
    duration: '6 weeks',
    level: 'Intermediate',
    rating: 4.5,
    students: 250000,
    instructor: 'IBM',
    image: 'https://i.pinimg.com/736x/d8/51/7c/d8517c35a32f56b9ea3ab12af0701743.jpg?auto=compress&cs=tinysrgb&w=400',
    isFree: false
  },
  {
    id: 'course-10',
    title: 'MLOps Specialization',
    description: 'Deploy and maintain machine learning models in production.',
    category: 'AI/ML',
    url: 'https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops',
    price: 49,
    duration: '4 months',
    level: 'Advanced',
    rating: 4.4,
    students: 75000,
    instructor: 'DeepLearning.AI',
    image: 'https://i.pinimg.com/736x/de/28/96/de2896c191c9200a576f098bfe4d21da.jpg?auto=compress&cs=tinysrgb&w=400',
    isFree: false
  },
  {
    id: 'course-11',
    title: 'Generative AI for Everyone',
    description: 'Understand generative AI and its applications across industries.',
    category: 'AI/ML',
    url: 'https://www.deeplearning.ai/courses/generative-ai-for-software-development/',
    price: 0,
    duration: '3 weeks',
    level: 'Beginner',
    rating: 4.7,
    students: 200000,
    instructor: 'Andrew Ng',
    image: 'https://i.pinimg.com/1200x/1b/44/6e/1b446e9ae1552e26b9f0be8125c8fadf.jpg?auto=compress&cs=tinysrgb&w=400',
    isFree: true
  },

  // Ethical Hacking
  {
    id: 'course-12',
    title: 'Certified Ethical Hacker (CEH) v12',
    description: 'Comprehensive ethical hacking and penetration testing course.',
    category: 'Ethical Hacking',
    url: 'https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/',
    price: 500,
    originalPrice: 899,
    duration: '5 months',
    level: 'Advanced',
    rating: 4.6,
    students: 25000,
    instructor: 'EC-Council',
    image: 'https://i.ytimg.com/vi/maO8_0cA7W8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBHnz7qnkWWchsP7FkD9pad4AVI9A?auto=compress&cs=tinysrgb&w=400',
    isFree: false
  },
  {
    id: 'course-13',
    title: 'Cybersecurity Bootcamp',
    description: 'Intensive bootcamp covering all aspects of cybersecurity.',
    category: 'Cyber Security',
    url: 'https://www.eccouncil.org/bootcamp/',
    price: 800,
    originalPrice: 1200,
    duration: '12 weeks',
    level: 'Intermediate',
    rating: 4.5,
    students: 15000,
    instructor: 'EC-Council',
    image: 'https://i.pinimg.com/1200x/81/ad/6f/81ad6f8eb11f82b4ff1a1e27cddadb61.jpg?auto=compress&cs=tinysrgb&w=400',
    isFree: false
  },
  {
    id: 'course-14',
    title: 'Cybersecurity for Business Leaders',
    description: 'Strategic cybersecurity management for executives.',
    category: 'Cyber Security',
    url: 'https://online.hbs.edu/courses/cybersecurity/',
    price: 900,
    originalPrice: 1500,
    duration: '6 weeks',
    level: 'Intermediate',
    rating: 4.3,
    students: 5000,
    instructor: 'Harvard Business School',
    image: 'https://i.pinimg.com/1200x/fa/40/9e/fa409e186253d2d5320f9fd44aac1515.jpg?auto=compress&cs=tinysrgb&w=400',
    isFree: false
  },
  {
    id: 'course-15',
    title: 'Web Application Security Testing',
    description: 'Learn to identify and exploit web application vulnerabilities.',
    category: 'Cyber Security',
    url: 'https://owasp.org/',
    price: 299,
    originalPrice: 399,
    duration: '8 weeks',
    level: 'Advanced',
    rating: 4.4,
    students: 12000,
    instructor: 'OWASP Foundation',
    image: 'https://i.pinimg.com/736x/f6/b7/7f/f6b77f354db412f9bd3c2aad879f1cd1.jpg?auto=compress&cs=tinysrgb&w=400',
    isFree: false
  },
  {
    id: 'course-16',
    title: 'Network Security Fundamentals',
    description: 'Master network security concepts and implementation.',
    category: 'Network Security',
    url: 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html',
    price: 325,
    duration: '10 weeks',
    level: 'Intermediate',
    rating: 4.2,
    students: 30000,
    instructor: 'Cisco Systems',
    image: 'https://i.pinimg.com/1200x/75/6a/a3/756aa3c54d6e62e9ea445745763992b2.jpg?auto=compress&cs=tinysrgb&w=400',
    isFree: false
  }
];

export const courseCategories = [
  'All',
  'Programming',
  'AI/ML',
  'Ethical Hacking',
  'Cyber Security',
  'Network Security',
  'DSA',
  'Git'
];