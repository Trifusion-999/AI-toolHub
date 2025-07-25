// import React, { useState, useMemo } from 'react';
// import { motion } from 'framer-motion';
// import { Search, Filter, Star, ExternalLink, ShoppingCart, Heart } from 'lucide-react';
// import { aiToolsData, categories, AITool } from '../../data/aiTools';
// import { useCart } from '../../contexts/CartContext';
// import { useCurrency } from '../../contexts/CurrencyContext';
// import { toast } from 'react-hot-toast';

// const AIToolsPage: React.FC = () => {
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showPaidOnly, setShowPaidOnly] = useState(false);
//   const [sortBy, setSortBy] = useState('name');
//   const { addToCart } = useCart();
//   const { formatPrice } = useCurrency();

//   const filteredTools = useMemo(() => {
//     let filtered = aiToolsData.filter(tool => {
//       const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
//       const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                            tool.description.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesPaid = !showPaidOnly || tool.isPaid;
      
//       return matchesCategory && matchesSearch && matchesPaid;
//     });

//     // Sort tools
//     filtered.sort((a, b) => {
//       switch (sortBy) {
//         case 'name':
//           return a.name.localeCompare(b.name);
//         case 'rating':
//           return b.rating - a.rating;
//         case 'price':
//           return (a.price || 0) - (b.price || 0);
//         default:
//           return 0;
//       }
//     });

//     return filtered;
//   }, [selectedCategory, searchTerm, showPaidOnly, sortBy]);

//   const handleAddToCart = (tool: AITool) => {
//     if (tool.isPaid && tool.price) {
//       addToCart({
//         id: tool.id,
//         title: tool.name,
//         price: tool.price,
//         currency: 'USD',
//         type: 'tool',
//         category: tool.category,
//         image: tool.image
//       });
//     } else {
//       toast.success(`${tool.name} is free! Visit the official website to get started.`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-12"
//         >
//           <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
//             AI Tools Directory
//           </h1>
//           <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
//             Discover cutting-edge AI tools to supercharge your productivity and creativity
//           </p>
//         </motion.div>

//         {/* Filters */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
//         >
//           <div className="flex flex-col lg:flex-row gap-4 items-center">
//             {/* Search */}
//             <div className="relative flex-1 max-w-md">
//               <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search AI tools..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//               />
//             </div>

//             {/* Category Filter */}
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//             >
//               {categories.map(category => (
//                 <option key={category} value={category}>{category}</option>
//               ))}
//             </select>

//             {/* Sort */}
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//             >
//               <option value="name">Sort by Name</option>
//               <option value="rating">Sort by Rating</option>
//               <option value="price">Sort by Price</option>
//             </select>

//             {/* Paid Only Filter */}
//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 checked={showPaidOnly}
//                 onChange={(e) => setShowPaidOnly(e.target.checked)}
//                 className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//               />
//               <span className="text-sm text-gray-700 dark:text-gray-300">Paid only</span>
//             </label>
//           </div>
//         </motion.div>

//         {/* Tools Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {filteredTools.map((tool, index) => (
//             <motion.div
//               key={tool.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.05 }}
//               whileHover={{ y: -5 }}
//               className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
//             >
//               <div className="relative">
//                 <img
//                   src={tool.image}
//                   alt={tool.name}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="absolute top-4 right-4">
//                   <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center"
//                   >
//                     <Heart className="w-4 h-4 text-gray-600" />
//                   </motion.button>
//                 </div>
//                 {!tool.isPaid && (
//                   <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
//                     FREE
//                   </div>
//                 )}
//               </div>

//               <div className="p-6">
//                 <div className="flex items-start justify-between mb-2">
//                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                     {tool.name}
//                   </h3>
//                   <div className="flex items-center">
//                     <Star className="w-4 h-4 text-yellow-500 fill-current" />
//                     <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
//                       {tool.rating}
//                     </span>
//                   </div>
//                 </div>

//                 <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
//                   {tool.category}
//                 </p>

//                 <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
//                   {tool.description}
//                 </p>

//                 <div className="flex items-center justify-between">
//                   <div className="text-lg font-bold text-gray-900 dark:text-white">
//                     {tool.isPaid && tool.price ? formatPrice(tool.price) : 'Free'}
//                   </div>
//                   <div className="flex space-x-2">
//                     <motion.a
//                       href={tool.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       whileHover={{ scale: 1.05 }}
//                       className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
//                     >
//                       <ExternalLink className="w-4 h-4" />
//                     </motion.a>
//                     {tool.isPaid && tool.price && (
//                       <motion.button
//                         onClick={() => handleAddToCart(tool)}
//                         whileHover={{ scale: 1.05 }}
//                         className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                       >
//                         <ShoppingCart className="w-4 h-4" />
//                       </motion.button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {filteredTools.length === 0 && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center py-12"
//           >
//             <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
//               No tools found
//             </h3>
//             <p className="text-gray-500 dark:text-gray-500">
//               Try adjusting your search criteria or filters
//             </p>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AIToolsPage;










// 2nd part edit for paid only and free only update 

// import React, { useState, useMemo } from 'react';
// import { motion } from 'framer-motion';
// import { Search, Filter, Star, ExternalLink, ShoppingCart, Heart } from 'lucide-react';
// import { aiToolsData, categories, AITool } from '../../data/aiTools';
// import { useCart } from '../../contexts/CartContext';
// import { useCurrency } from '../../contexts/CurrencyContext';
// import { toast } from 'react-hot-toast';

// const AIToolsPage: React.FC = () => {
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showPaidOnly, setShowPaidOnly] = useState(false);
//   const [showFreeOnly, setShowFreeOnly] = useState(false);
//   const [sortBy, setSortBy] = useState('name');
//   const { addToCart } = useCart();
//   const { formatPrice } = useCurrency();

//   const filteredTools = useMemo(() => {
//     let filtered = aiToolsData.filter(tool => {
//       const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
//       const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                            tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      
//       // Handle pricing filters
//       let matchesPricing = true;
//       if (showPaidOnly && showFreeOnly) {
//         // If both are selected, show all tools
//         matchesPricing = true;
//       } else if (showPaidOnly) {
//         // Show only paid tools
//         matchesPricing = tool.isPaid;
//       } else if (showFreeOnly) {
//         // Show only free tools
//         matchesPricing = !tool.isPaid;
//       }
      
//       return matchesCategory && matchesSearch && matchesPricing;
//     });

//     // Sort tools
//     filtered.sort((a, b) => {
//       switch (sortBy) {
//         case 'name':
//           return a.name.localeCompare(b.name);
//         case 'rating':
//           return b.rating - a.rating;
//         case 'price':
//           return (a.price || 0) - (b.price || 0);
//         default:
//           return 0;
//       }
//     });

//     return filtered;
//   }, [selectedCategory, searchTerm, showPaidOnly, showFreeOnly, sortBy]);

//   const handleAddToCart = (tool: AITool) => {
//     if (tool.isPaid && tool.price) {
//       addToCart({
//         id: tool.id,
//         title: tool.name,
//         price: tool.price,
//         currency: 'USD',
//         type: 'tool',
//         category: tool.category,
//         image: tool.image
//       });
//     } else {
//       toast.success(`${tool.name} is free! Visit the official website to get started.`);
//     }
//   };

//   const handlePaidOnlyChange = (checked: boolean) => {
//     setShowPaidOnly(checked);
//     if (checked && showFreeOnly) {
//       setShowFreeOnly(false);
//     }
//   };

//   const handleFreeOnlyChange = (checked: boolean) => {
//     setShowFreeOnly(checked);
//     if (checked && showPaidOnly) {
//       setShowPaidOnly(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-12"
//         >
//           <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
//             AI Tools Directory
//           </h1>
//           <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
//             Discover cutting-edge AI tools to supercharge your productivity and creativity
//           </p>
//         </motion.div>

//         {/* Filters */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
//         >
//           <div className="flex flex-col lg:flex-row gap-4 items-center">
//             {/* Search */}
//             <div className="relative flex-1 max-w-md">
//               <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search AI tools..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//               />
//             </div>

//             {/* Category Filter */}
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//             >
//               {categories.map(category => (
//                 <option key={category} value={category}>{category}</option>
//               ))}
//             </select>

//             {/* Sort */}
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//             >
//               <option value="name">Sort by Name</option>
//               <option value="rating">Sort by Rating</option>
//               <option value="price">Sort by Price</option>
//             </select>

//             {/* Pricing Filters */}
//             <div className="flex gap-4">
//               {/* Free Only Filter */}
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={showFreeOnly}
//                   onChange={(e) => handleFreeOnlyChange(e.target.checked)}
//                   className="rounded border-gray-300 text-green-600 focus:ring-green-500"
//                 />
//                 <span className="text-sm text-gray-700 dark:text-gray-300">Free only</span>
//               </label>

//               {/* Paid Only Filter */}
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={showPaidOnly}
//                   onChange={(e) => handlePaidOnlyChange(e.target.checked)}
//                   className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                 />
//                 <span className="text-sm text-gray-700 dark:text-gray-300">Paid only</span>
//               </label>
//             </div>
//           </div>
//         </motion.div>

//         {/* Tools Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {filteredTools.map((tool, index) => (
//             <motion.div
//               key={tool.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.05 }}
//               whileHover={{ y: -5 }}
//               className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
//             >
//               <div className="relative">
//                 <img
//                   src={tool.image}
//                   alt={tool.name}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="absolute top-4 right-4">
//                   <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center"
//                   >
//                     <Heart className="w-4 h-4 text-gray-600" />
//                   </motion.button>
//                 </div>
//                 {!tool.isPaid && (
//                   <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
//                     FREE
//                   </div>
//                 )}
//               </div>

//               <div className="p-6">
//                 <div className="flex items-start justify-between mb-2">
//                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                     {tool.name}
//                   </h3>
//                   <div className="flex items-center">
//                     <Star className="w-4 h-4 text-yellow-500 fill-current" />
//                     <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
//                       {tool.rating}
//                     </span>
//                   </div>
//                 </div>

//                 <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
//                   {tool.category}
//                 </p>

//                 <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
//                   {tool.description}
//                 </p>

//                 <div className="flex items-center justify-between">
//                   <div className="text-lg font-bold text-gray-900 dark:text-white">
//                     {tool.isPaid && tool.price ? formatPrice(tool.price) : 'Free'}
//                   </div>
//                   <div className="flex space-x-2">
//                     <motion.a
//                       href={tool.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       whileHover={{ scale: 1.05 }}
//                       className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
//                     >
//                       <ExternalLink className="w-4 h-4" />
//                     </motion.a>
//                     {tool.isPaid && tool.price && (
//                       <motion.button
//                         onClick={() => handleAddToCart(tool)}
//                         whileHover={{ scale: 1.05 }}
//                         className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                       >
//                         <ShoppingCart className="w-4 h-4" />
//                       </motion.button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {filteredTools.length === 0 && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center py-12"
//           >
//             <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
//               No tools found
//             </h3>
//             <p className="text-gray-500 dark:text-gray-500">
//               Try adjusting your search criteria or filters
//             </p>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AIToolsPage;





// update on favoright icon

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, ExternalLink, ShoppingCart, Heart } from 'lucide-react';
import { aiToolsData, categories, AITool } from '../../data/aiTools';
import { useCart } from '../../contexts/CartContext';
import { useCurrency } from '../../contexts/CurrencyContext';
import { toast } from 'react-hot-toast';

const AIToolsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPaidOnly, setShowPaidOnly] = useState(false);
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const filteredTools = useMemo(() => {
    let filtered = aiToolsData.filter(tool => {
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Handle pricing filters
      let matchesPricing = true;
      if (showPaidOnly && showFreeOnly) {
        // If both are selected, show all tools
        matchesPricing = true;
      } else if (showPaidOnly) {
        // Show only paid tools
        matchesPricing = tool.isPaid;
      } else if (showFreeOnly) {
        // Show only free tools
        matchesPricing = !tool.isPaid;
      }
      
      return matchesCategory && matchesSearch && matchesPricing;
    });

    // Sort tools
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return (a.price || 0) - (b.price || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedCategory, searchTerm, showPaidOnly, showFreeOnly, sortBy]);

  const handleAddToCart = (tool: AITool) => {
    if (tool.isPaid && tool.price) {
      addToCart({
        id: tool.id,
        title: tool.name,
        price: tool.price,
        currency: 'USD',
        type: 'tool',
        category: tool.category,
        image: tool.image
      });
    } else {
      toast.success(`${tool.name} is free! Visit the official website to get started.`);
    }
  };

  const handlePaidOnlyChange = (checked: boolean) => {
    setShowPaidOnly(checked);
    if (checked && showFreeOnly) {
      setShowFreeOnly(false);
    }
  };

  const handleFreeOnlyChange = (checked: boolean) => {
    setShowFreeOnly(checked);
    if (checked && showPaidOnly) {
      setShowPaidOnly(false);
    }
  };

  const toggleFavorite = (toolId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(toolId)) {
        newFavorites.delete(toolId);
        toast.success('Removed from favorites');
      } else {
        newFavorites.add(toolId);
        toast.success('Added to favorites');
      }
      return newFavorites;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI Tools Directory
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover cutting-edge AI tools to supercharge your productivity and creativity
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search AI tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="name">Sort by Name</option>
              <option value="rating">Sort by Rating</option>
              <option value="price">Sort by Price</option>
            </select>

            {/* Pricing Filters */}
            <div className="flex gap-4">
              {/* Free Only Filter */}
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showFreeOnly}
                  onChange={(e) => handleFreeOnlyChange(e.target.checked)}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Free only</span>
              </label>

              {/* Paid Only Filter */}
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showPaidOnly}
                  onChange={(e) => handlePaidOnlyChange(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Paid only</span>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={tool.image}
                  alt={tool.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <motion.button
                    onClick={() => toggleFavorite(tool.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white/90 transition-colors"
                  >
                    <Heart 
                      className={`w-4 h-4 transition-colors ${
                        favorites.has(tool.id) 
                          ? 'text-red-500 fill-red-500' 
                          : 'text-gray-600 hover:text-red-400'
                      }`} 
                    />
                  </motion.button>
                </div>
                {!tool.isPaid && (
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                    FREE
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {tool.name}
                  </h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                      {tool.rating}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                  {tool.category}
                </p>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {tool.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {tool.isPaid && tool.price ? formatPrice(tool.price) : 'Free'}
                  </div>
                  <div className="flex space-x-2">
                    <motion.a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                    {tool.isPaid && tool.price && (
                      <motion.button
                        onClick={() => handleAddToCart(tool)}
                        whileHover={{ scale: 1.05 }}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No tools found
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Try adjusting your search criteria or filters
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AIToolsPage;