import { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

const currencyMap = {
  GBP: { symbol: '£', label: 'GB £ GBP', rate: 1 },
  USD: { symbol: '$', label: 'US $ USD', rate: 1.25 },
  EUR: { symbol: '€', label: 'EU € EUR', rate: 1.15 },
  JPY: { symbol: '¥', label: 'JP · JPY', rate: 190 },
  AUD: { symbol: '$', label: 'AU $ AUD', rate: 1.90 },
  CAD: { symbol: '$', label: 'CA $ CAD', rate: 1.70 },
  NZD: { symbol: '$', label: 'NZ $ NZD', rate: 2.10 },
  PLN: { symbol: 'Zł', label: 'PL Zł PLN', rate: 5.10 },
  SGD: { symbol: '$', label: 'SG $ SGD', rate: 1.68 },
  AED: { symbol: 'د.إ', label: 'AE AED', rate: 4.60 },
  ZAR: { symbol: 'R', label: 'ZA R ZAR', rate: 24.50 }
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(localStorage.getItem('currency') || 'GBP');
  const [rates, setRates] = useState({
    GBP: 1, USD: 1.25, EUR: 1.15, JPY: 190, 
    AUD: 1.90, CAD: 1.70, NZD: 2.10, PLN: 5.10, 
    SGD: 1.68, AED: 4.60, ZAR: 24.50
  });

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  const convertPrice = (priceInGBP, toCurrency = currency) => {
    const rate = rates[toCurrency] || 1;
    const converted = priceInGBP * rate;
    return converted.toFixed(2);
  };

  const formatPrice = (priceInGBP) => {
    const converted = convertPrice(priceInGBP);
    const symbol = currencyMap[currency]?.symbol || '£';
    return `${symbol}${converted}`;
  };

  const getSymbol = () => currencyMap[currency]?.symbol || '£';
  const getLabel = () => currencyMap[currency]?.label || 'GB £ GBP';

  return (
    <CurrencyContext.Provider value={{
      currency,
      setCurrency,
      currencies: Object.keys(currencyMap),
      currencyMap,
      convertPrice,
      formatPrice,
      getSymbol,
      getLabel
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};
