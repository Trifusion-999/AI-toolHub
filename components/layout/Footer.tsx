// import React from 'react';
// import { motion } from 'framer-motion';
// import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

// const Footer: React.FC = () => {
//   const currentYear = new Date().getFullYear();

//   const socialLinks = [
//     { icon: Github, href: 'https://github.com/avinash-25', label: 'GitHub' },
//     { icon: Twitter, href: '#', label: 'Twitter' },
//     { icon: Linkedin, href: 'https://www.linkedin.com/in/rajesh-kumar-nayak-9851b1206/', label: 'LinkedIn' },
//     { icon: Mail, href: 'mailto:amankumar95056@gmail.com', label: 'Email' }
//   ];

//   const footerLinks = {
//     'AI Tools': ['General Purpose', 'Writing Code', 'Productivity', 'Creativity'],
//     'Courses': ['Programming', 'AI/ML', 'Cybersecurity', 'Data Science'],
//     'Company': ['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'],
//     'Support': ['Help Center', 'Documentation', 'API', 'Status']
//   };

//   return (
//     <footer className="bg-gray-900 dark:bg-black text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
//           {/* Brand */}
//           <div className="lg:col-span-2">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="flex items-center space-x-2 mb-4"
//             >
//               <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-lg">AI</span>
//               </div>
//               <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//                 ToolHub
//               </span>
//             </motion.div>
//             <p className="text-gray-400 mb-6 max-w-md">
//               Your one-stop platform for discovering cutting-edge AI tools and mastering new skills through expert-curated courses.
//             </p>
//             <div className="flex space-x-4">
//               {socialLinks.map(({ icon: Icon, href, label }) => (
//                 <motion.a
//                   key={label}
//                   href={href}
//                   whileHover={{ scale: 1.1, y: -2 }}
//                   className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
//                   aria-label={label}
//                 >
//                   <Icon className="w-5 h-5" />
//                 </motion.a>
//               ))}
//             </div>
//           </div>

//           {/* Links */}
//           {Object.entries(footerLinks).map(([category, links]) => (
//             <div key={category}>
//               <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
//                 {category}
//               </h3>
//               <ul className="space-y-2">
//                 {links.map((link) => (
//                   <li key={link}>
//                     <motion.a
//                       href="#"
//                       whileHover={{ x: 4 }}
//                       className="text-gray-400 hover:text-white transition-colors text-sm"
//                     >
//                       {link}
//                     </motion.a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         {/* Bottom */}
//         <div className="border-t border-gray-800 mt-12 pt-8">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <p className="text-gray-400 text-sm">
//               © {currentYear} AI ToolHub. All rights reserved.
//             </p>
//             <motion.p 
//               className="text-gray-400 text-sm flex items-center mt-4 md:mt-0"
//               whileHover={{ scale: 1.02 }}
//             >
//               Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> for the AI community
//             </motion.p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


// update footer navigation


// Footer.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

interface FooterProps {
  onPageChange: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onPageChange }) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/trifusion-999', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/rajesh-kumar-nayak-9851b1206/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:trifusion999@gmail.com', label: 'Email' }
  ];

  const footerLinks = {
    'AI Tools': ['General Purpose', 'Writing Code', 'Productivity', 'Creativity','Mental Health'],
    'Courses': ['Programming','AI/ML','Ethical Hacking','Cyber Security','Network Security','Dsa','Git'],
    'Company': ['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'],
    'Support': ['Help Center', 'Documentation', 'API', 'Status']
  };

  const getPageIdForLink = (category: string, link: string): string => {
    if (category === 'AI Tools') return 'ai-tools';
    if (category === 'Courses') return 'courses';
    if (link === 'Contact') return 'contact';
    // Fallback for other links that don't have dedicated pages in App.tsx
    return 'home';
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-4">AI ToolHub</h2>
            <p className="text-gray-400 text-sm mb-6">
              Your ultimate destination for cutting-edge AI tools and comprehensive courses.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <motion.button
                      onClick={() => onPageChange(getPageIdForLink(category, link))}
                      whileHover={{ x: 4 }}
                      className="text-gray-400 hover:text-white transition-colors text-sm text-left w-full focus:outline-none focus:ring-0"
                    >
                      {link}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} AI ToolHub. All rights reserved.
            </p>
            <motion.p
              className="text-gray-400 text-sm flex items-center mt-4 md:mt-0"
              whileHover={{ scale: 1.02 }}
            >
              Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> for the AI community
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;