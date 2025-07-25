// import React, { useState } from 'react';
// import { useTheme } from '../../contexts/ThemeContext';
// import { useAuth } from '../../contexts/AuthContext';
// import { useCart } from '../../contexts/CartContext';
// import { useCurrency } from '../../contexts/CurrencyContext';
// import { Moon, Sun, ShoppingCart, User, Menu, X, Globe } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// interface HeaderProps {
//   currentPage: string;
//   onPageChange: (page: string) => void;
// }

// const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
//   const { isDark, toggleTheme } = useTheme();
//   const { user, logout, isAuthenticated } = useAuth();
//   const { getTotalItems } = useCart();
//   const { currency, setCurrency } = useCurrency();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
//   const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);

//   const navigationItems = [
//     { name: 'Home', id: 'home' },
//     { name: 'AI Tools', id: 'ai-tools' },
//     { name: 'Courses', id: 'courses' },
//     { name: 'Contact Us', id: 'contact' }
//   ];

//   const currencies = ['USD', 'INR', 'EUR'] as const;

//   return (
//     <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               className="flex items-center space-x-2 cursor-pointer"
//               onClick={() => onPageChange('home')}
//             >
//               <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-lg">AI</span>
//               </div>
//               <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 ToolHub
//               </span>
//             </motion.div>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex space-x-8">
//             {navigationItems.map((item) => (
//               <motion.button
//                 key={item.id}
//                 whileHover={{ y: -2 }}
//                 onClick={() => onPageChange(item.id)}
//                 className={`px-3 py-2 text-sm font-medium transition-colors ${
//                   currentPage === item.id
//                     ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
//                     : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
//                 }`}
//               >
//                 {item.name}
//               </motion.button>
//             ))}
//           </nav>

//           {/* Right Side Controls */}
//           <div className="flex items-center space-x-4">
//             {/* Currency Selector */}
//             <div className="relative">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
//                 className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
//               >
//                 <Globe className="w-4 h-4" />
//                 <span>{currency}</span>
//               </motion.button>

//               <AnimatePresence>
//                 {isCurrencyMenuOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="absolute right-0 mt-2 w-24 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
//                   >
//                     {currencies.map((curr) => (
//                       <button
//                         key={curr}
//                         onClick={() => {
//                           setCurrency(curr);
//                           setIsCurrencyMenuOpen(false);
//                         }}
//                         className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${
//                           currency === curr ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
//                         }`}
//                       >
//                         {curr}
//                       </button>
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* Theme Toggle */}
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={toggleTheme}
//               className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
//             >
//               {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//             </motion.button>

//             {/* Cart */}
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               onClick={() => onPageChange('cart')}
//               className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
//             >
//               <ShoppingCart className="w-5 h-5" />
//               {getTotalItems() > 0 && (
//                 <motion.span
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
//                 >
//                   {getTotalItems()}
//                 </motion.span>
//               )}
//             </motion.button>

//             {/* User Menu */}
//             <div className="relative">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
//                 className="flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
//               >
//                 <User className="w-5 h-5" />
//                 {isAuthenticated && <span className="hidden sm:inline text-sm">{user?.username}</span>}
//               </motion.button>

//               <AnimatePresence>
//                 {isUserMenuOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
//                   >
//                     {isAuthenticated ? (
//                       <>
//                         <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-200 dark:border-gray-700">
//                           {user?.email}
//                         </div>
//                         <button
//                           onClick={() => {
//                             onPageChange('profile');
//                             setIsUserMenuOpen(false);
//                           }}
//                           className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
//                         >
//                           Profile
//                         </button>
//                         {user?.role === 'admin' && (
//                           <button
//                             onClick={() => {
//                               onPageChange('admin');
//                               setIsUserMenuOpen(false);
//                             }}
//                             className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
//                           >
//                             Admin Dashboard
//                           </button>
//                         )}
//                         <button
//                           onClick={() => {
//                             logout();
//                             setIsUserMenuOpen(false);
//                           }}
//                           className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
//                         >
//                           Sign Out
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <button
//                           onClick={() => {
//                             onPageChange('auth');
//                             setIsUserMenuOpen(false);
//                           }}
//                           className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
//                         >
//                           Sign In
//                         </button>
//                         <button
//                           onClick={() => {
//                             onPageChange('auth');
//                             setIsUserMenuOpen(false);
//                           }}
//                           className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
//                         >
//                           Sign Up
//                         </button>
//                       </>
//                     )}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* Mobile Menu Button */}
//             <motion.button
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="md:hidden p-2 text-gray-700 dark:text-gray-300"
//             >
//               {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//             </motion.button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         <AnimatePresence>
//           {isMobileMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               className="md:hidden border-t border-gray-200 dark:border-gray-700"
//             >
//               <div className="py-4 space-y-2">
//                 {navigationItems.map((item) => (
//                   <button
//                     key={item.id}
//                     onClick={() => {
//                       onPageChange(item.id);
//                       setIsMobileMenuOpen(false);
//                     }}
//                     className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
//                       currentPage === item.id
//                         ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
//                         : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
//                     }`}
//                   >
//                     {item.name}
//                   </button>
//                 ))}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </header>
//   );
// };

// export default Header;

// Header.tsx
import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useCurrency } from '../../contexts/CurrencyContext';
import { Moon, Sun, ShoppingCart, User, Menu, X, Globe, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { getTotalItems } = useCart();
  const { currency, setCurrency } = useCurrency();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Home', id: 'home' },
    { name: 'AI Tools', id: 'ai-tools' },
    { name: 'Courses', id: 'courses' },
    { name: 'About Us', id: 'about-us' }, // Added About Us
    { name: 'Contact Us', id: 'contact' }
  ];

  const currencies = ['USD', 'INR', 'EUR'] as const;

  const getMenuItemClasses = (pageId: string) =>
    `block px-4 py-2 text-sm font-medium transition-colors duration-200 
    ${currentPage === pageId
      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400'
    }`;

  const iconButtonClasses = `p-2 rounded-full transition-colors duration-200 
    hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 
    focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-700 dark:text-gray-300`;

  const dropdownItemClasses = `block w-full text-left px-4 py-2 text-sm transition-colors duration-200 
    text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm dark:shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <button
              onClick={() => onPageChange('home')}
              className="text-2xl font-bold text-gray-900 dark:text-white flex items-center"
              aria-label="AI ToolHub Home"
            >
              <img src="/logo.png" alt="AI ToolHub Logo" className="h-8 mr-2" /> {/* Assuming you have a logo.png in your public folder */}
              AI ToolHub
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6 lg:space-x-8">
              {navigationItems.map((item) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + navigationItems.indexOf(item) * 0.05 }}
                >
                  <button
                    onClick={() => onPageChange(item.id)}
                    className={`relative text-lg font-medium py-2 px-3 rounded-md transition-colors duration-200 
                    ${currentPage === item.id
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                  >
                    {item.name}
                    {currentPage === item.id && (
                      <motion.span
                        layoutId="underline"
                        className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600 dark:bg-blue-400 rounded-full"
                      />
                    )}
                  </button>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Right Section: Theme Toggle, Cart, User/Auth, Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className={iconButtonClasses}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            {/* Currency Selector */}
            <div className="relative">
              <motion.button
                onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
                className={iconButtonClasses}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Select currency"
              >
                <Globe className="w-5 h-5" />
              </motion.button>
              <AnimatePresence>
                {isCurrencyMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-28 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50"
                  >
                    {currencies.map((curr) => (
                      <button
                        key={curr}
                        onClick={() => {
                          setCurrency(curr);
                          setIsCurrencyMenuOpen(false);
                        }}
                        className={`${dropdownItemClasses} ${currency === curr ? 'bg-gray-50 dark:bg-gray-700 font-semibold' : ''}`}
                      >
                        {curr}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>


            {/* Cart Icon */}
            <motion.button
              onClick={() => onPageChange('cart')}
              className={`${iconButtonClasses} relative`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="View cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center"
                >
                  {getTotalItems()}
                </motion.span>
              )}
            </motion.button>

            {/* User/Auth */}
            <div className="relative">
              <motion.button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={iconButtonClasses}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="User menu"
              >
                <User className="w-5 h-5" />
              </motion.button>
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50"
                  >
                    {isAuthenticated ? (
                      <>
                        <span className="block px-4 py-2 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                          Hello, {user?.username}
                        </span>
                        <button
                          onClick={() => { onPageChange('profile'); setIsUserMenuOpen(false); }}
                          className={dropdownItemClasses}
                        >
                          <User className="inline-block w-4 h-4 mr-2" /> Profile
                        </button>
                        {isAdmin && (
                          <button
                            onClick={() => { onPageChange('admin'); setIsUserMenuOpen(false); }}
                            className={dropdownItemClasses}
                          >
                            <LayoutDashboard className="inline-block w-4 h-4 mr-2" /> Admin Dashboard
                          </button>
                        )}
                        <button
                          onClick={() => { logout(); setIsUserMenuOpen(false); }}
                          className={`${dropdownItemClasses} text-red-600 dark:text-red-400`}
                        >
                          <LogOut className="inline-block w-4 h-4 mr-2" /> Sign Out
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => { onPageChange('auth'); setIsUserMenuOpen(false); }}
                        className={dropdownItemClasses}
                      >
                        Sign In / Sign Up
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>


            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${iconButtonClasses} md:hidden ml-2 text-gray-700 dark:text-gray-300`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-700"
            >
              <div className="py-4 space-y-2">
                {navigationItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      onPageChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors duration-200
                    ${currentPage === item.id
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
                {isAuthenticated ? (
                  <>
                    <motion.button
                      onClick={() => { onPageChange('profile'); setIsMobileMenuOpen(false); }}
                      className={getMenuItemClasses('profile')}
                      whileTap={{ scale: 0.98 }}
                    >
                      Profile
                    </motion.button>
                    {isAdmin && (
                      <motion.button
                        onClick={() => { onPageChange('admin'); setIsMobileMenuOpen(false); }}
                        className={getMenuItemClasses('admin')}
                        whileTap={{ scale: 0.98 }}
                      >
                        Admin Dashboard
                      </motion.button>
                    )}
                    <motion.button
                      onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                      className={`${getMenuItemClasses('')} text-red-600 dark:text-red-400`}
                      whileTap={{ scale: 0.98 }}
                    >
                      Sign Out
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    onClick={() => { onPageChange('auth'); setIsMobileMenuOpen(false); }}
                    className={getMenuItemClasses('auth')}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign In / Sign Up
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;