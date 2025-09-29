// Currency conversion rates (approximate, you may want to use a real-time API in production)
export const currencyRates: Record<string, number> = {
  usd: 1, // Base currency
  eur: 0.85, // 1 USD = 0.85 EUR
  gbp: 0.73, // 1 USD = 0.73 GBP
  jpy: 110, // 1 USD = 110 JPY
  aud: 1.35, // 1 USD = 1.35 AUD
  cad: 1.25, // 1 USD = 1.25 CAD
  chf: 0.92, // 1 USD = 0.92 CHF
  cny: 6.45, // 1 USD = 6.45 CNY
  npr: 119.5, // 1 USD = 119.5 NPR
  inr: 74.5, // 1 USD = 74.5 INR
};

/**
 * Convert a price from one currency to USD
 * @param price - The price amount
 * @param fromCurrency - The source currency code (lowercase)
 * @returns The equivalent price in USD
 */
export const convertToUSD = (price: number, fromCurrency: string): number => {
  const rate = currencyRates[fromCurrency.toLowerCase()];
  if (!rate) {
    console.warn(`Unknown currency: ${fromCurrency}`);
    return price; // Return original price if currency not found
  }
  return price / rate;
};

/**
 * Convert a price from USD to another currency
 * @param usdPrice - The price in USD
 * @param toCurrency - The target currency code (lowercase)
 * @returns The equivalent price in the target currency
 */
export const convertFromUSD = (usdPrice: number, toCurrency: string): number => {
  const rate = currencyRates[toCurrency.toLowerCase()];
  if (!rate) {
    console.warn(`Unknown currency: ${toCurrency}`);
    return usdPrice; // Return original price if currency not found
  }
  return usdPrice * rate;
};

/**
 * Get the minimum price in a specific currency (equivalent to $3 USD)
 * @param currency - The currency code (lowercase)
 * @returns The minimum price in the specified currency
 */
export const getMinimumPrice = (currency: string): number => {
  const MINIMUM_USD = 3;
  return convertFromUSD(MINIMUM_USD, currency);
};

/**
 * Validate if a price meets the minimum requirement ($3 USD equivalent)
 * @param price - The price to validate
 * @param currency - The currency code (lowercase)
 * @returns Object with isValid boolean and minimumPrice for the currency
 */
export const validateMinimumPrice = (price: number, currency: string): { isValid: boolean; minimumPrice: number; usdEquivalent: number } => {
  const usdEquivalent = convertToUSD(price, currency);
  const minimumPrice = getMinimumPrice(currency);
  const isValid = usdEquivalent >= 3;
  
  return {
    isValid,
    minimumPrice,
    usdEquivalent
  };
}; 