// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { CreditCard, Lock, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
// import { useCart } from '../../contexts/CartContext';
// import { useCurrency } from '../../contexts/CurrencyContext';
// import { useAuth } from '../../contexts/AuthContext';
// import { toast } from 'react-hot-toast';

// interface CheckoutPageProps {
//   onPageChange: (page: string) => void;
// }

// const CheckoutPage: React.FC<CheckoutPageProps> = ({ onPageChange }) => {
//   const { items, getTotalPrice, clearCart } = useCart();
//   const { formatPrice } = useCurrency();
//   const { user, isAuthenticated } = useAuth();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [orderComplete, setOrderComplete] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [showCvv, setShowCvv] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [focusedField, setFocusedField] = useState<string>('');
  
//   const [formData, setFormData] = useState({
//     email: user?.email || '',
//     firstName: '',
//     lastName: '',
//     address: '',
//     city: '',
//     country: '',
//     zipCode: '',
//     cardNumber: '',
//     expiryDate: '',
//     cvv: '',
//     nameOnCard: '',
//     saveCard: false,
//     agreeTerms: false
//   });

//   const steps = [
//     { id: 1, title: 'Contact', icon: '📧' },
//     { id: 2, title: 'Shipping', icon: '🚚' },
//     { id: 3, title: 'Payment', icon: '💳' }
//   ];

//   const validateField = (name: string, value: string) => {
//     const newErrors = { ...errors };
    
//     switch (name) {
//       case 'email':
//         if (!/\S+@\S+\.\S+/.test(value)) {
//           newErrors[name] = 'Please enter a valid email address';
//         } else {
//           delete newErrors[name];
//         }
//         break;
//       case 'cardNumber':
//         const cleanCard = value.replace(/\s/g, '');
//         if (cleanCard.length < 16) {
//           newErrors[name] = 'Card number must be 16 digits';
//         } else {
//           delete newErrors[name];
//         }
//         break;
//       case 'expiryDate':
//         if (!/^\d{2}\/\d{2}$/.test(value)) {
//           newErrors[name] = 'Please enter MM/YY format';
//         } else {
//           const [month, year] = value.split('/');
//           const currentYear = new Date().getFullYear() % 100;
//           const currentMonth = new Date().getMonth() + 1;
          
//           if (parseInt(month) < 1 || parseInt(month) > 12) {
//             newErrors[name] = 'Invalid month';
//           } else if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
//             newErrors[name] = 'Card has expired';
//           } else {
//             delete newErrors[name];
//           }
//         }
//         break;
//       case 'cvv':
//         if (value.length < 3) {
//           newErrors[name] = 'CVV must be 3-4 digits';
//         } else {
//           delete newErrors[name];
//         }
//         break;
//       default:
//         if (!value.trim()) {
//           newErrors[name] = 'This field is required';
//         } else {
//           delete newErrors[name];
//         }
//     }
    
//     setErrors(newErrors);
//   };

//   const formatCardNumber = (value: string) => {
//     const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
//     const matches = v.match(/\d{4,16}/g);
//     const match = matches && matches[0] || '';
//     const parts = [];
//     for (let i = 0, len = match.length; i < len; i += 4) {
//       parts.push(match.substring(i, i + 4));
//     }
//     if (parts.length) {
//       return parts.join(' ');
//     } else {
//       return v;
//     }
//   };

//   const formatExpiryDate = (value: string) => {
//     const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
//     if (v.length >= 2) {
//       return v.substring(0, 2) + '/' + v.substring(2, 4);
//     }
//     return v;
//   };

//   const getCardType = (number: string) => {
//     const cleanNumber = number.replace(/\s/g, '');
//     if (cleanNumber.startsWith('4')) return 'visa';
//     if (cleanNumber.startsWith('5')) return 'mastercard';
//     if (cleanNumber.startsWith('3')) return 'amex';
//     return 'unknown';
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Validate all fields
//     Object.keys(formData).forEach(key => {
//       if (key !== 'saveCard' && key !== 'agreeTerms') {
//         validateField(key, formData[key as keyof typeof formData] as string);
//       }
//     });

//     if (!formData.agreeTerms) {
//       toast.error('Please agree to the terms and conditions');
//       return;
//     }

//     if (Object.keys(errors).length > 0) {
//       toast.error('Please fix all errors before proceeding');
//       return;
//     }

//     setIsProcessing(true);

//     // Simulate payment processing with steps
//     const processingSteps = [
//       'Validating payment information...',
//       'Processing payment...',
//       'Confirming transaction...',
//       'Finalizing order...'
//     ];

//     for (let i = 0; i < processingSteps.length; i++) {
//       await new Promise(resolve => setTimeout(resolve, 800));
//       toast.loading(processingSteps[i], { id: 'processing' });
//     }

//     setTimeout(() => {
//       setIsProcessing(false);
//       setOrderComplete(true);
//       clearCart();
//       toast.dismiss('processing');
//       toast.success('Order placed successfully!');
//     }, 1000);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     let formattedValue = value;

//     if (name === 'cardNumber') {
//       formattedValue = formatCardNumber(value);
//     } else if (name === 'expiryDate') {
//       formattedValue = formatExpiryDate(value);
//     } else if (name === 'cvv') {
//       formattedValue = value.replace(/[^0-9]/g, '').substring(0, 4);
//     }

//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : formattedValue
//     }));

//     if (type !== 'checkbox') {
//       validateField(name, formattedValue);
//     }
//   };

//   const nextStep = () => {
//     if (currentStep < 3) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="text-center bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
//         >
//           <Lock className="w-16 h-16 text-blue-600 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
//             Please sign in to checkout
//           </h2>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => onPageChange('auth')}
//             className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
//           >
//             Sign In
//           </motion.button>
//         </motion.div>
//       </div>
//     );
//   }

//   if (items.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="text-center bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
//         >
//           <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
//             <span className="text-2xl">🛒</span>
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
//             Your cart is empty
//           </h2>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => onPageChange('ai-tools')}
//             className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
//           >
//             Continue Shopping
//           </motion.button>
//         </motion.div>
//       </div>
//     );
//   }

//   if (orderComplete) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="text-center max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
//         >
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
//           >
//             <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
//           </motion.div>
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
//           >
//             Order Complete!
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6 }}
//             className="text-gray-600 dark:text-gray-400 mb-8"
//           >
//             Thank you for your purchase. You'll receive an email confirmation shortly.
//           </motion.p>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.8 }}
//             className="space-y-4"
//           >
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => onPageChange('profile')}
//               className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
//             >
//               View Orders
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => onPageChange('home')}
//               className="w-full px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
//             >
//               Continue Browsing
//             </motion.button>
//           </motion.div>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-8"
//         >
//           <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
//             Secure Checkout
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             Complete your purchase with confidence
//           </p>
//         </motion.div>

//         {/* Progress Steps */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="mb-8"
//         >
//           <div className="flex justify-center">
//             <div className="flex items-center space-x-4">
//               {steps.map((step, index) => (
//                 <div key={step.id} className="flex items-center">
//                   <motion.div
//                     whileHover={{ scale: 1.1 }}
//                     className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
//                       currentStep >= step.id
//                         ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
//                         : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
//                     }`}
//                   >
//                     {step.icon}
//                   </motion.div>
//                   <div className="ml-2 hidden sm:block">
//                     <div className={`text-sm font-medium ${
//                       currentStep >= step.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
//                     }`}>
//                       {step.title}
//                     </div>
//                   </div>
//                   {index < steps.length - 1 && (
//                     <div className={`w-8 h-0.5 mx-4 transition-all duration-300 ${
//                       currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
//                     }`} />
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Checkout Form */}
//           <div className="lg:col-span-2">
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.2 }}
//               className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
//             >
//               <form onSubmit={handleSubmit} className="space-y-8">
//                 <AnimatePresence mode="wait">
//                   {/* Step 1: Contact Information */}
//                   {currentStep === 1 && (
//                     <motion.div
//                       key="contact"
//                       initial={{ opacity: 0, x: 20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: -20 }}
//                       className="space-y-6"
//                     >
//                       <div className="flex items-center mb-6">
//                         <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
//                           <span className="text-white text-sm">📧</span>
//                         </div>
//                         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//                           Contact Information
//                         </h2>
//                       </div>
                      
//                       <div className="relative">
//                         <input
//                           type="email"
//                           name="email"
//                           required
//                           value={formData.email}
//                           onChange={handleInputChange}
//                           onFocus={() => setFocusedField('email')}
//                           onBlur={() => setFocusedField('')}
//                           className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
//                             errors.email
//                               ? 'border-red-500 focus:border-red-500'
//                               : focusedField === 'email'
//                               ? 'border-blue-500 shadow-lg'
//                               : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
//                           }`}
//                           placeholder="Email address"
//                         />
//                         {errors.email && (
//                           <motion.div
//                             initial={{ opacity: 0, y: -10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             className="flex items-center mt-2 text-red-500 text-sm"
//                           >
//                             <AlertCircle className="w-4 h-4 mr-1" />
//                             {errors.email}
//                           </motion.div>
//                         )}
//                       </div>
//                     </motion.div>
//                   )}

//                   {/* Step 2: Shipping Address */}
//                   {currentStep === 2 && (
//                     <motion.div
//                       key="shipping"
//                       initial={{ opacity: 0, x: 20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: -20 }}
//                       className="space-y-6"
//                     >
//                       <div className="flex items-center mb-6">
//                         <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
//                           <span className="text-white text-sm">🚚</span>
//                         </div>
//                         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//                           Shipping Address
//                         </h2>
//                       </div>

//                       <div className="grid grid-cols-2 gap-4">
//                         {['firstName', 'lastName'].map((field) => (
//                           <div key={field} className="relative">
//                             <input
//                               type="text"
//                               name={field}
//                               required
//                               value={formData[field as keyof typeof formData] as string}
//                               onChange={handleInputChange}
//                               onFocus={() => setFocusedField(field)}
//                               onBlur={() => setFocusedField('')}
//                               className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
//                                 errors[field]
//                                   ? 'border-red-500'
//                                   : focusedField === field
//                                   ? 'border-blue-500 shadow-lg'
//                                   : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
//                               }`}
//                               placeholder={field === 'firstName' ? 'First name' : 'Last name'}
//                             />
//                             {errors[field] && (
//                               <motion.div
//                                 initial={{ opacity: 0, y: -10 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 className="flex items-center mt-2 text-red-500 text-sm"
//                               >
//                                 <AlertCircle className="w-4 h-4 mr-1" />
//                                 {errors[field]}
//                               </motion.div>
//                             )}
//                           </div>
//                         ))}
//                       </div>

//                       {['address', 'city', 'zipCode'].map((field) => (
//                         <div key={field} className="relative">
//                           <input
//                             type="text"
//                             name={field}
//                             required
//                             value={formData[field as keyof typeof formData] as string}
//                             onChange={handleInputChange}
//                             onFocus={() => setFocusedField(field)}
//                             onBlur={() => setFocusedField('')}
//                             className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
//                               errors[field]
//                                 ? 'border-red-500'
//                                 : focusedField === field
//                                 ? 'border-blue-500 shadow-lg'
//                                 : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
//                             }`}
//                             placeholder={field === 'address' ? 'Street address' : field === 'city' ? 'City' : 'ZIP code'}
//                           />
//                           {errors[field] && (
//                             <motion.div
//                               initial={{ opacity: 0, y: -10 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               className="flex items-center mt-2 text-red-500 text-sm"
//                             >
//                               <AlertCircle className="w-4 h-4 mr-1" />
//                               {errors[field]}
//                             </motion.div>
//                           )}
//                         </div>
//                       ))}

//                       <select
//                         name="country"
//                         required
//                         value={formData.country}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                       >
//                         <option value="">Select country</option>
//                         <option value="US">United States</option>
//                         <option value="CA">Canada</option>
//                         <option value="UK">United Kingdom</option>
//                         <option value="IN">India</option>
//                       </select>
//                     </motion.div>
//                   )}

//                   {/* Step 3: Payment Information */}
//                   {currentStep === 3 && (
//                     <motion.div
//                       key="payment"
//                       initial={{ opacity: 0, x: 20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: -20 }}
//                       className="space-y-6"
//                     >
//                       <div className="flex items-center mb-6">
//                         <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
//                           <CreditCard className="w-4 h-4 text-white" />
//                         </div>
//                         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//                           Payment Information
//                         </h2>
//                       </div>

//                       <div className="relative">
//                         <input
//                           type="text"
//                           name="nameOnCard"
//                           required
//                           value={formData.nameOnCard}
//                           onChange={handleInputChange}
//                           onFocus={() => setFocusedField('nameOnCard')}
//                           onBlur={() => setFocusedField('')}
//                           className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
//                             focusedField === 'nameOnCard'
//                               ? 'border-blue-500 shadow-lg'
//                               : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
//                           }`}
//                           placeholder="Name on card"
//                         />
//                       </div>

//                       <div className="relative">
//                         <input
//                           type="text"
//                           name="cardNumber"
//                           required
//                           value={formData.cardNumber}
//                           onChange={handleInputChange}
//                           onFocus={() => setFocusedField('cardNumber')}
//                           onBlur={() => setFocusedField('')}
//                           className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-16 ${
//                             errors.cardNumber
//                               ? 'border-red-500'
//                               : focusedField === 'cardNumber'
//                               ? 'border-blue-500 shadow-lg'
//                               : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
//                           }`}
//                           placeholder="1234 5678 9012 3456"
//                           maxLength={19}
//                         />
//                         <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
//                           <motion.div
//                             initial={{ scale: 0 }}
//                             animate={{ scale: 1 }}
//                             className={`w-8 h-6 rounded flex items-center justify-center text-xs font-bold ${
//                               getCardType(formData.cardNumber) === 'visa'
//                                 ? 'bg-blue-600 text-white'
//                                 : getCardType(formData.cardNumber) === 'mastercard'
//                                 ? 'bg-red-600 text-white'
//                                 : getCardType(formData.cardNumber) === 'amex'
//                                 ? 'bg-green-600 text-white'
//                                 : 'bg-gray-300 text-gray-600'
//                             }`}
//                           >
//                             {getCardType(formData.cardNumber) === 'visa' && 'VISA'}
//                             {getCardType(formData.cardNumber) === 'mastercard' && 'MC'}
//                             {getCardType(formData.cardNumber) === 'amex' && 'AMEX'}
//                             {getCardType(formData.cardNumber) === 'unknown' && '💳'}
//                           </motion.div>
//                         </div>
//                         {errors.cardNumber && (
//                           <motion.div
//                             initial={{ opacity: 0, y: -10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             className="flex items-center mt-2 text-red-500 text-sm"
//                           >
//                             <AlertCircle className="w-4 h-4 mr-1" />
//                             {errors.cardNumber}
//                           </motion.div>
//                         )}
//                       </div>

//                       <div className="grid grid-cols-2 gap-4">
//                         <div className="relative">
//                           <input
//                             type="text"
//                             name="expiryDate"
//                             required
//                             value={formData.expiryDate}
//                             onChange={handleInputChange}
//                             onFocus={() => setFocusedField('expiryDate')}
//                             onBlur={() => setFocusedField('')}
//                             className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
//                               errors.expiryDate
//                                 ? 'border-red-500'
//                                 : focusedField === 'expiryDate'
//                                 ? 'border-blue-500 shadow-lg'
//                                 : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
//                             }`}
//                             placeholder="MM/YY"
//                             maxLength={5}
//                           />
//                           {errors.expiryDate && (
//                             <motion.div
//                               initial={{ opacity: 0, y: -10 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               className="flex items-center mt-2 text-red-500 text-sm"
//                             >
//                               <AlertCircle className="w-4 h-4 mr-1" />
//                               {errors.expiryDate}
//                             </motion.div>
//                           )}
//                         </div>

//                         <div className="relative">
//                           <input
//                             type={showCvv ? 'text' : 'password'}
//                             name="cvv"
//                             required
//                             value={formData.cvv}
//                             onChange={handleInputChange}
//                             onFocus={() => setFocusedField('cvv')}
//                             onBlur={() => setFocusedField('')}
//                             className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-12 ${
//                               errors.cvv
//                                 ? 'border-red-500'
//                                 : focusedField === 'cvv'
//                                 ? 'border-blue-500 shadow-lg'
//                                 : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
//                             }`}
//                             placeholder="123"
//                             maxLength={4}
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowCvv(!showCvv)}
//                             className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                           >
//                             {showCvv ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                           </button>
//                           {errors.cvv && (
//                             <motion.div
//                               initial={{ opacity: 0, y: -10 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               className="flex items-center mt-2 text-red-500 text-sm"
//                             >
//                               <AlertCircle className="w-4 h-4 mr-1" />
//                               {errors.cvv}
//                             </motion.div>
//                           )}
//                         </div>
//                       </div>

//                       <div className="space-y-4">
//                         <label className="flex items-center">
//                           <input
//                             type="checkbox"
//                             name="saveCard"
//                             checked={formData.saveCard}
//                             onChange={handleInputChange}
//                             className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
//                           />
//                           <span className="text-gray-700 dark:text-gray-300">Save card for future purchases</span>
//                         </label>

//                         <label className="flex items-center">
//                           <input
//                             type="checkbox"
//                             name="agreeTerms"
//                             checked={formData.agreeTerms}
//                             onChange={handleInputChange}
//                             className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
//                           />
//                           <span className="text-gray-700 dark:text-gray-300">
//                             I agree to the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a>
//                           </span>
//                         </label>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 {/* Navigation Buttons */}
//                 <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
//                   {currentStep > 1 ? (
//                     <motion.button
//                       type="button"
//                       onClick={prevStep}
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
//                     >
//                       Previous
//                     </motion.button>
//                   ) : (
//                     <div></div>
//                   )}

//                   {currentStep < 3 ? (
//                     <motion.button
//                       type="button"
//                       onClick={nextStep}
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
//                     >
//                       Next
//                     </motion.button>
//                   ) : (
//                     <motion.button
//                       type="submit"
//                       disabled={isProcessing || !formData.agreeTerms}
//                       whileHover={{ scale: isProcessing ? 1 : 1.02 }}
//                       whileTap={{ scale: isProcessing ? 1 : 0.98 }}
//                       className={`px-8 py-3 rounded-lg font-semibold flex items-center justify-center transition-all duration-300 ${
//                         isProcessing || !formData.agreeTerms
//                           ? 'bg-gray-400 cursor-not-allowed'
//                           : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg'
//                       } text-white`}
//                     >
//                       {isProcessing ? (
//                         <div className="flex items-center">
//                           <motion.div
//                             animate={{ rotate: 360 }}
//                             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                             className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
//                           />
//                           Processing...
//                         </div>
//                       ) : (
//                         <>
//                           <Lock className="w-5 h-5 mr-2" />
//                           Complete Order
//                         </>
//                       )}
//                     </motion.button>
//                   )}
//                 </div>
//               </form>
//             </motion.div>
//           </div>

//           {/* Order Summary */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.3 }}
//             className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 h-fit sticky top-8"
//           >
//             <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
//               Order Summary
//             </h2>

//             <div className="space-y-4 mb-6">
//               {items.map((item, index) => (
//                 <motion.div
//                   key={item.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="flex justify-between items-start p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
//                 >
//                   <div className="flex-1">
//                     <h3 className="text-sm font-medium text-gray-900 dark:text-white">
//                       {item.title}
//                     </h3>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       Qty: {item.quantity}
//                     </p>
//                   </div>
//                   <span className="text-sm font-medium text-gray-900 dark:text-white">
//                     {formatPrice(item.price * item.quantity)}
//                   </span>
//                 </motion.div>
//               ))}
//             </div>

//             <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
//                 <span className="text-gray-900 dark:text-white">{formatPrice(getTotalPrice())}</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600 dark:text-gray-400">Tax</span>
//                 <span className="text-gray-900 dark:text-white">{formatPrice(getTotalPrice() * 0.1)}</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600 dark:text-gray-400">Shipping</span>
//                 <span className="text-green-600 dark:text-green-400">Free</span>
//               </div>
//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 className="flex justify-between text-lg font-semibold border-t border-gray-200 dark:border-gray-700 pt-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-3 rounded-lg"
//               >
//                 <span className="text-gray-900 dark:text-white">Total</span>
//                 <span className="text-gray-900 dark:text-white">{formatPrice(getTotalPrice() * 1.1)}</span>
//               </motion.div>
//             </div>

//             <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
//               <div className="flex items-center text-green-800 dark:text-green-200">
//                 <Lock className="w-4 h-4 mr-2" />
//                 <span className="text-sm">256-bit SSL encrypted payment</span>
//               </div>
//             </div>

//             <div className="mt-4 text-center">
//               <div className="flex justify-center space-x-2 opacity-60">
//                 <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
//                 <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
//                 <div className="w-8 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">AMEX</div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;





// update validations



// src/components/pages/CheckoutPage.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Lock, CheckCircle, AlertCircle, Eye, EyeOff, User, Mail, Home, MapPin, Globe, Calendar, Key, Info } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useCurrency } from '../../contexts/CurrencyContext';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext'; // Import useTheme
import { toast } from 'react-hot-toast';

interface CheckoutPageProps {
  onPageChange: (page: string) => void;
}

// Add this type definition, as Razorpay is loaded globally
declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ onPageChange }) => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { formatPrice, currency } = useCurrency(); // Also destructure currency
  const { user, isAuthenticated } = useAuth();
  const { isDark } = useTheme(); // Use the useTheme hook to get isDark

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showCvv, setShowCvv] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string>('');

  // Explicitly type formData for correct type inference and error-free validation
  const [formData, setFormData] = useState<{
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    country: string;
    zipCode: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    nameOnCard: string;
    saveCard: boolean;
    agreeTerms: boolean;
  }>({
    email: user?.email || '',
    firstName: user?.username?.split(' ')[0] || '',
    lastName: user?.username?.split(' ').slice(1).join(' ') || '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: user?.username || '',
    saveCard: false,
    agreeTerms: false
  });

  useEffect(() => {
    // If user logs in after visiting checkout, pre-fill data
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || prev.email,
        firstName: user.username.split(' ')[0] || prev.firstName,
        lastName: user.username.split(' ').slice(1).join(' ') || prev.lastName,
        nameOnCard: user.username || prev.nameOnCard,
      }));
    }
  }, [isAuthenticated, user]);

  // Validation Logic
  const validateField = (name: string, value: string | boolean): string => {
    let error = '';
    switch (name) {
      case 'firstName':
      case 'lastName':
      case 'nameOnCard':
        if (typeof value !== 'string' || !value.trim()) {
          error = `${name === 'firstName' ? 'First name' : name === 'lastName' ? 'Last name' : 'Name on card'} is required.`;
        } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          error = `${name === 'firstName' ? 'First name' : name === 'lastName' ? 'Last name' : 'Name on card'} can only contain letters and spaces.`;
        }
        break;
      case 'email':
        if (typeof value !== 'string' || !value.trim()) {
          error = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Email is invalid.';
        }
        break;
      case 'address':
      case 'city':
      case 'country':
        if (typeof value !== 'string' || !value.trim()) {
          error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
        }
        break;
      case 'zipCode':
        if (typeof value !== 'string' || !value.trim()) {
          error = 'Zip code is required.';
        } else if (!/^\d{6}$/.test(value)) { // Assuming 6-digit for India
          error = 'Zip code must be a 6-digit number.';
        }
        break;
      case 'cardNumber':
        if (typeof value !== 'string' || !value.trim()) {
          error = 'Card number is required.';
        } else if (!/^\d{16}$/.test(value.replace(/\s/g, ''))) { // Simple 16-digit check
          error = 'Card number must be 16 digits.';
        }
        break;
      case 'expiryDate':
        if (typeof value !== 'string' || !value.trim()) {
          error = 'Expiry date is required.';
        } else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(value)) {
          error = 'Invalid expiry date format (MM/YY).';
        } else {
          const [month, year] = value.split('/').map(Number);
          const currentYear = new Date().getFullYear() % 100; // Last two digits of current year
          const currentMonth = new Date().getMonth() + 1; // 1-indexed month

          if (year < currentYear || (year === currentYear && month < currentMonth)) {
            error = 'Card has expired.';
          }
        }
        break;
      case 'cvv':
        if (typeof value !== 'string' || !value.trim()) {
          error = 'CVV is required.';
        } else if (!/^\d{3,4}$/.test(value)) {
          error = 'CVV must be 3 or 4 digits.';
        }
        break;
      case 'agreeTerms':
        if (typeof value === 'boolean' && !value) {
          error = 'You must agree to the terms and conditions.';
        }
        break;
      default:
        break;
    }
    return error;
  };

  const validateForm = () => {
    let newErrors: Record<string, string> = {};
    (Object.keys(formData) as (keyof typeof formData)[]).forEach((key) => {
      // TypeScript sometimes complains about mixed types, so we use this:
      const value = formData[key];
      const error = validateField(key as string, value);
      if (error) {
        newErrors[key as string] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Live validation
    const error = validateField(name, type === 'checkbox' ? checked : value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocusedField(e.target.name);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocusedField('');
    // Re-validate on blur to show error if any
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      const step1Fields: (keyof typeof formData)[] = [
        'email', 'firstName', 'lastName', 'address', 'city', 'country', 'zipCode'
      ];
      let step1Errors: Record<string, string> = {};
      step1Fields.forEach(field => {
        const error = validateField(field, formData[field]);
        if (error) {
          step1Errors[field] = error;
        }
      });
      setErrors(step1Errors);
      if (Object.keys(step1Errors).length === 0) {
        setCurrentStep(2);
      } else {
        toast.error('Please correct the errors in your shipping details.');
      }
    } else if (currentStep === 2) {
      const step2Fields: (keyof typeof formData)[] = [
        'cardNumber', 'expiryDate', 'cvv', 'nameOnCard', 'agreeTerms'
      ];
      let step2Errors: Record<string, string> = {};
      step2Fields.forEach(field => {
        const error = validateField(field, formData[field]);
        if (error) {
          step2Errors[field] = error;
        }
      });
      setErrors(step2Errors);
      if (Object.keys(step2Errors).length === 0) {
        handlePlaceOrder();
      } else {
        toast.error('Please correct the errors in your payment details.');
      }
    }
  };

  // --- Razorpay Integration Start ---
  const handleRazorpayPayment = async () => {
    setIsProcessing(true);
    toast.loading('Initiating payment...', { id: 'paymentInitiation' });

    const amount = Math.round(getTotalPrice() * 1.1 * 100); // Amount in paisa (smallest currency unit)
    const currencyCode = currency; // Use the selected currency from context

    // In a real application, you would make an API call to your backend
    // to create an order and get an 'order_id' from Razorpay.
    // For this simulation, we'll use a placeholder order ID.
    // Replace this with a real backend call:
    // const response = await fetch('/api/razorpay-order', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ amount, currency: currencyCode })
    // });
    // const orderData = await response.json();
    // const order_id = orderData.order_id;

    // Simulate backend order creation
    const mockOrderId = `order_${Date.now()}`; // Placeholder order ID for demonstration

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_YOUR_KEY_ID', // Replace with your actual Test or Live Key ID
      amount: amount, // Amount is in currency subunits.
      currency: currencyCode,
      name: "AI ToolHub",
      description: "Purchase of AI Tools & Courses",
      order_id: mockOrderId, // This would come from your backend Razorpay Order API
      handler: async function (response: any) {
        // This function is called after successful payment
        toast.dismiss('paymentInitiation');
        toast.loading('Verifying payment...', { id: 'paymentVerification' });

        // In a real application, send `response.razorpay_payment_id`,
        // `response.razorpay_order_id`, `response.razorpay_signature`
        // to your backend for server-side verification.
        // If verification is successful, then clear cart and confirm order.

        // Simulate backend verification
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (response.razorpay_payment_id) {
          clearCart();
          setOrderComplete(true);
          toast.success('Payment successful! Order confirmed.', { id: 'paymentVerification' });
          setIsProcessing(false);
        } else {
          toast.error('Payment verification failed. Please contact support.', { id: 'paymentVerification' });
          setIsProcessing(false);
        }
      },
      prefill: {
        name: formData.nameOnCard || user?.username || '',
        email: formData.email || user?.email || '',
        contact: '9999999999' // User's phone number if available
      },
      notes: {
        address: formData.address + ', ' + formData.city + ', ' + formData.zipCode + ', ' + formData.country,
      },
      theme: {
        color: isDark ? '#6366F1' : '#3B82F6' // Blue-600 or Blue-500
      }
    };

    const rzp1 = new window.Razorpay(options);

    rzp1.on('payment.failed', function (response: any) {
      toast.dismiss('paymentInitiation');
      toast.error(`Payment failed: ${response.error.description || 'Unknown error'}`, { id: 'paymentFailed' });
      console.error('Razorpay Error:', response.error);
      setIsProcessing(false);
    });

    rzp1.open(); // Open Razorpay modal
  };
  // --- Razorpay Integration End ---

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      toast.error('Please correct all validation errors before proceeding.');
      return;
    }

    // If all validations pass, initiate Razorpay payment
    handleRazorpayPayment();
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12"
      >
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
          <AlertCircle className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Your cart is empty!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Please add items to your cart before proceeding to checkout.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onPageChange('ai-tools')}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            Start Shopping
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (orderComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12"
      >
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Order Confirmed!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Thank you for your purchase. Your order has been successfully placed and is being processed.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onPageChange('home')}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            Back to Home
          </motion.button>
        </div>
      </motion.div>
    );
  }

  const inputClasses = (fieldName: string) => `
    mt-1 block w-full px-4 py-2 border rounded-md shadow-sm sm:text-sm
    ${errors[fieldName]
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'}
    ${focusedField === fieldName
      ? 'ring-2 ring-blue-200 dark:ring-blue-700'
      : ''}
    bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
  `;

  const labelClasses = `block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center`;

  const errorTextClasses = `mt-1 text-sm text-red-600 dark:text-red-400`;

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const cleanValue = value.replace(/\D/g, '');
    // Insert space every 4 digits
    return cleanValue.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiryDate = (value: string) => {
    // Remove all non-digit characters
    const cleanValue = value.replace(/\D/g, '');
    let formattedValue = cleanValue;

    if (cleanValue.length > 2) {
      formattedValue = cleanValue.slice(0, 2) + '/' + cleanValue.slice(2, 4);
    }
    return formattedValue;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8"
        >
          <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900 dark:text-white">
            Secure Checkout
          </h1>

          {/* Progress Indicator */}
          <div className="flex justify-between items-center mb-8 relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
              <motion.div
                className="h-full bg-blue-600 dark:bg-blue-400 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: currentStep === 1 ? '0%' : '100%' }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            </div>
            <div className="flex items-center z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300
                ${currentStep >= 1 ? 'bg-blue-600' : 'bg-gray-400'}`}>
                1
              </div>
              <span className={`ml-3 text-lg font-medium ${currentStep >= 1 ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                Shipping
              </span>
            </div>
            <div className="flex items-center z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300
                ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-400'}`}>
                2
              </div>
              <span className={`ml-3 text-lg font-medium ${currentStep >= 2 ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                Payment
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Shipping / Payment Forms */}
            <div className="lg:col-span-2 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-inner dark:shadow-none">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="shipping"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b pb-4 border-gray-200 dark:border-gray-700">
                      Shipping Information
                    </h2>
                    <form className="space-y-5">
                      <div>
                        <label htmlFor="email" className={labelClasses}>
                          <Mail className="w-4 h-4 mr-2" /> Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          className={inputClasses('email')}
                          placeholder="your.email@example.com"
                          required
                        />
                        {errors.email && <p className={errorTextClasses}>{errors.email}</p>}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className={labelClasses}>
                            <User className="w-4 h-4 mr-2" /> First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            className={inputClasses('firstName')}
                            placeholder="John"
                            required
                          />
                          {errors.firstName && <p className={errorTextClasses}>{errors.firstName}</p>}
                        </div>
                        <div>
                          <label htmlFor="lastName" className={labelClasses}>
                            <User className="w-4 h-4 mr-2" /> Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            className={inputClasses('lastName')}
                            placeholder=""
                            required
                          />
                          {errors.lastName && <p className={errorTextClasses}>{errors.lastName}</p>}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="address" className={labelClasses}>
                          <Home className="w-4 h-4 mr-2" /> Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          className={inputClasses('address')}
                          placeholder=""
                          required
                        />
                        {errors.address && <p className={errorTextClasses}>{errors.address}</p>}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="city" className={labelClasses}>
                            <MapPin className="w-4 h-4 mr-2" /> City
                          </label>
                          <input
                            type="text"
                            name="city"
                            id="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            className={inputClasses('city')}
                            placeholder="New Delhi"
                            required
                          />
                          {errors.city && <p className={errorTextClasses}>{errors.city}</p>}
                        </div>
                        <div>
                          <label htmlFor="country" className={labelClasses}>
                            <Globe className="w-4 h-4 mr-2" /> Country
                          </label>
                          <input
                            type="text"
                            name="country"
                            id="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            className={inputClasses('country')}
                            placeholder="India"
                            required
                          />
                          {errors.country && <p className={errorTextClasses}>{errors.country}</p>}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="zipCode" className={labelClasses}>
                          <Info className="w-4 h-4 mr-2" /> Zip Code
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          className={inputClasses('zipCode')}
                          placeholder="123456"
                          maxLength={6} // Enforce max length for visual cues
                          required
                        />
                        {errors.zipCode && <p className={errorTextClasses}>{errors.zipCode}</p>}
                      </div>
                    </form>
                    <motion.button
                      onClick={handleNextStep}
                      className="mt-8 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Continue to Payment'}
                    </motion.button>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b pb-4 border-gray-200 dark:border-gray-700">
                      Payment Information
                    </h2>
                    <form className="space-y-5">
                      <div>
                        <label htmlFor="cardNumber" className={labelClasses}>
                          <CreditCard className="w-4 h-4 mr-2" /> Card Number
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          id="cardNumber"
                          value={formatCardNumber(formData.cardNumber)}
                          onChange={(e) => {
                            // Only allow digits
                            const rawValue = e.target.value.replace(/\D/g, '');
                            setFormData(prev => ({ ...prev, cardNumber: rawValue }));
                            const error = validateField('cardNumber', rawValue);
                            setErrors(prev => ({ ...prev, cardNumber: error }));
                          }}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          className={inputClasses('cardNumber')}
                          placeholder="XXXX XXXX XXXX XXXX"
                          maxLength={19} // 16 digits + 3 spaces
                          required
                        />
                        {errors.cardNumber && <p className={errorTextClasses}>{errors.cardNumber}</p>}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiryDate" className={labelClasses}>
                            <Calendar className="w-4 h-4 mr-2" /> Expiry Date (MM/YY)
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            id="expiryDate"
                            value={formatExpiryDate(formData.expiryDate)}
                            onChange={(e) => {
                              // Allow digits and slash, but store only digits
                              let inputValue = e.target.value;
                              // Format as MM/YY
                              let cleanValue = inputValue.replace(/\D/g, '');
                              let formattedValue = cleanValue;
                              if (cleanValue.length > 2) {
                                formattedValue = cleanValue.slice(0, 2) + '/' + cleanValue.slice(2, 4);
                              }
                              setFormData(prev => ({ ...prev, expiryDate: formattedValue }));
                              const error = validateField('expiryDate', formattedValue);
                              setErrors(prev => ({ ...prev, expiryDate: error }));
                            }}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            className={inputClasses('expiryDate')}
                            placeholder="MM/YY"
                            maxLength={5} // MM/YY
                            required
                          />
                          {errors.expiryDate && <p className={errorTextClasses}>{errors.expiryDate}</p>}
                        </div>
                        <div className="relative">
                          <label htmlFor="cvv" className={labelClasses}>
                            <Key className="w-4 h-4 mr-2" /> CVV
                          </label>
                          <input
                            type={showCvv ? 'text' : 'password'}
                            name="cvv"
                            id="cvv"
                            value={formData.cvv}
                            onChange={(e) => {
                                // Only allow digits
                                const rawValue = e.target.value.replace(/\D/g, '');
                                setFormData(prev => ({ ...prev, cvv: rawValue }));
                                const error = validateField('cvv', rawValue);
                                setErrors(prev => ({ ...prev, cvv: error }));
                            }}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            className={inputClasses('cvv')}
                            placeholder="XXX"
                            maxLength={4} // 3 or 4 digits
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowCvv(!showCvv)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center top-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            aria-label={showCvv ? 'Hide CVV' : 'Show CVV'}
                          >
                            {showCvv ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                          {errors.cvv && <p className={errorTextClasses}>{errors.cvv}</p>}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="nameOnCard" className={labelClasses}>
                          <User className="w-4 h-4 mr-2" /> Name on Card
                        </label>
                        <input
                          type="text"
                          name="nameOnCard"
                          id="nameOnCard"
                          value={formData.nameOnCard}
                          onChange={handleInputChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          className={inputClasses('nameOnCard')}
                          placeholder="John Doe"
                          required
                        />
                        {errors.nameOnCard && <p className={errorTextClasses}>{errors.nameOnCard}</p>}
                      </div>

                      <div className="flex items-center mt-6">
                        <input
                          id="agreeTerms"
                          name="agreeTerms"
                          type="checkbox"
                          checked={formData.agreeTerms}
                          onChange={handleInputChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          className={`h-4 w-4 text-blue-600 rounded
                            ${errors.agreeTerms ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
                            focus:ring-blue-500`}
                          required
                        />
                        <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-900 dark:text-white">
                          I agree to the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>
                        </label>
                      </div>
                      {errors.agreeTerms && <p className={errorTextClasses}>{errors.agreeTerms}</p>}

                      <div className="flex items-center">
                        <input
                          id="saveCard"
                          name="saveCard"
                          type="checkbox"
                          checked={formData.saveCard}
                          onChange={handleInputChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                        />
                        <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-900 dark:text-white">
                          Save card for future purchases
                        </label>
                      </div>
                    </form>
                    <div className="flex gap-4 mt-8">
                      <motion.button
                        onClick={() => setCurrentStep(1)}
                        className="flex-1 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 font-semibold"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isProcessing}
                      >
                        Back to Shipping
                      </motion.button>
                      <motion.button
                        onClick={handleNextStep} // This will now trigger handlePlaceOrder
                        className="flex-1 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-300 font-semibold"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Processing Payment...' : 'Pay Now'}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-fit sticky top-24 border border-gray-100 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b pb-4 border-gray-200 dark:border-gray-700">
                Order Summary
              </h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-gray-700 dark:text-gray-300">
                    <span className="text-sm font-medium">{item.title} x {item.quantity}</span>
                    <span className="text-sm">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between text-gray-700 dark:text-gray-300 mb-2">
                    <span className="text-sm">Subtotal</span>
                    <span className="text-sm">{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 dark:text-gray-300 mb-2">
                    <span className="text-sm">Tax (10%)</span>
                    <span className="text-sm">{formatPrice(getTotalPrice() * 0.1)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t border-gray-200 dark:border-gray-700 pt-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-3 rounded-lg">
                    <span className="text-gray-900 dark:text-white">Total</span>
                    <span className="text-gray-900 dark:text-white">{formatPrice(getTotalPrice() * 1.1)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
                <div className="flex items-center text-green-800 dark:text-green-200">
                  <Lock className="w-4 h-4 mr-2" />
                  <span className="text-sm">256-bit SSL encrypted payment</span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <div className="flex justify-center space-x-2 opacity-60">
                  {/* Payment method icons - added for visual appeal */}
                  <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-6 object-contain" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="MasterCard" className="h-6 object-contain" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png" alt="PayPal" className="h-6 object-contain" />
                  {/* Add Razorpay, UPI logos if you have them locally */}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutPage;