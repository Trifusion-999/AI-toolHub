import React, { createContext, useContext, useState } from 'react';

export type Currency = 'INR' | 'USD' | 'EUR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (price: number, fromCurrency?: Currency) => number;
  formatPrice: (price: number) => string;
}

// Mock exchange rates (in a real app, fetch from API)
const exchangeRates: Record<Currency, number> = {
  USD: 1,      // Base currency
  INR: 83.50,  // 1 USD = 83.50 INR
  EUR: 0.92    // 1 USD = 0.92 EUR
};

const currencySymbols: Record<Currency, string> = {
  USD: '$',
  INR: '₹',
  EUR: '€'
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('INR');

  const convertPrice = (price: number, fromCurrency: Currency = 'USD'): number => {
    // Convert from source currency to USD first
    const priceInUSD = price / exchangeRates[fromCurrency];
    // Then convert from USD to target currency
    return priceInUSD * exchangeRates[currency];
  };

  const formatPrice = (price: number): string => {
    const convertedPrice = convertPrice(price);
    return `${currencySymbols[currency]}${convertedPrice.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{
      currency,
      setCurrency,
      convertPrice,
      formatPrice
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};