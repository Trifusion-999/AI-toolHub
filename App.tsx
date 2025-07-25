// import React, { useState } from 'react';
// import { Toaster } from 'react-hot-toast';
// import { ThemeProvider } from './contexts/ThemeContext';
// import { AuthProvider } from './contexts/AuthContext';
// import { CartProvider } from './contexts/CartContext';
// import { CurrencyProvider } from './contexts/CurrencyContext';
// import Header from './components/layout/Header';
// import Footer from './components/layout/Footer';
// import HomePage from './components/pages/HomePage';
// import AIToolsPage from './components/pages/AIToolsPage';
// import CoursesPage from './components/pages/CoursesPage';
// import AuthPage from './components/pages/AuthPage';
// import CartPage from './components/pages/CartPage';
// import ContactPage from './components/pages/ContactPage';
// import ProfilePage from './components/pages/ProfilePage';
// import AdminPage from './components/pages/AdminPage';
// import CheckoutPage from './components/pages/CheckoutPage';

// function App() {
//   const [currentPage, setCurrentPage] = useState('home');

//   const renderPage = () => {
//     switch (currentPage) {
//       case 'home':
//         return <HomePage onPageChange={setCurrentPage} />;
//       case 'ai-tools':
//         return <AIToolsPage />;
//       case 'courses':
//         return <CoursesPage />;
//       case 'auth':
//         return <AuthPage />;
//       case 'cart':
//         return <CartPage onPageChange={setCurrentPage} />;
//       case 'contact':
//         return <ContactPage />;
//       case 'profile':
//         return <ProfilePage />;
//       case 'admin':
//         return <AdminPage />;
//       case 'checkout':
//         return <CheckoutPage onPageChange={setCurrentPage} />;
//       default:
//         return <HomePage onPageChange={setCurrentPage} />;
//     }
//   };

//   return (
//     <ThemeProvider>
//       <AuthProvider>
//         <CartProvider>
//           <CurrencyProvider>
//             <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
//               <Header currentPage={currentPage} onPageChange={setCurrentPage} />
//               <main>{renderPage()}</main>
//               <Footer />
//               <Toaster
//                 position="top-right"
//                 toastOptions={{
//                   duration: 3000,
//                   style: {
//                     background: 'var(--toast-bg)',
//                     color: 'var(--toast-color)',
//                   },
//                 }}
//               />
//             </div>
//           </CurrencyProvider>
//         </CartProvider>
//       </AuthProvider>
//     </ThemeProvider>
//   );
// }

// export default App;


// update footer navigation


// App.tsx
import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './components/pages/HomePage';
import AIToolsPage from './components/pages/AIToolsPage';
import CoursesPage from './components/pages/CoursesPage';
import AuthPage from './components/pages/AuthPage';
import CartPage from './components/pages/CartPage';
import ContactPage from './components/pages/ContactPage';
import ProfilePage from './components/pages/ProfilePage';
import AdminPage from './components/pages/AdminPage';
import CheckoutPage from './components/pages/CheckoutPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} />;
      case 'ai-tools':
        return <AIToolsPage />;
      case 'courses':
        return <CoursesPage />;
      case 'auth':
        return <AuthPage />;
      case 'cart':
        return <CartPage onPageChange={setCurrentPage} />;
      case 'contact':
        return <ContactPage />;
      case 'profile':
        return <ProfilePage />;
      case 'admin':
        return <AdminPage />;
      case 'checkout':
        return <CheckoutPage onPageChange={setCurrentPage} />;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <CurrencyProvider>
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
              <Header currentPage={currentPage} onPageChange={setCurrentPage} />
              <main>{renderPage()}</main>
              <Footer onPageChange={setCurrentPage} /> {/* Modified line */}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: 'var(--toast-bg)',
                    color: 'var(--toast-color)',
                  },
                }}
              />
            </div>
          </CurrencyProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;