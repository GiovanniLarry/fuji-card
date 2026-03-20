import { useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import './CurrencySelector.css';

const CurrencySelector = () => {
  const { currency, setCurrency, currencies, currencyMap } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const currentLabel = currencyMap[currency]?.label || 'GB £ GBP';

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    setIsOpen(false);
  };

  return (
    <div className="currency-dropdown-wrapper">
      <div className="currency-selector-box" onClick={() => setIsOpen(!isOpen)}>
        <span className="current-currency-label">{currentLabel}</span>
        <i className={`fa-solid fa-chevron-down ${isOpen ? 'open' : ''}`}></i>
      </div>

      {isOpen && (
        <ul className="currency-options-list">
          {currencies.map((curr) => (
            <li 
              key={curr} 
              className={`currency-option-item ${curr === currency ? 'active' : ''}`}
              onClick={() => handleCurrencyChange(curr)}
            >
              {currencyMap[curr].label}
            </li>
          ))}
        </ul>
      )}

      {isOpen && <div className="currency-overlay-click" onClick={() => setIsOpen(false)}></div>}
    </div>
  );
};

export default CurrencySelector;
