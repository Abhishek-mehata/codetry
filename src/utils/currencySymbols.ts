// Currency code to symbol mapping
export const currencySymbols: Record<string, string> = {
  USD: '$',
  NPR: 'रू', // Nepalese Rupee
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CAD: 'C$',
  AUD: 'A$',
  CHF: 'CHF',
  CNY: '¥',
  INR: '₹',
  KRW: '₩',
  SGD: 'S$',
  HKD: 'HK$',
  SEK: 'kr',
  NOK: 'kr',
  DKK: 'kr',
  PLN: 'zł',
  CZK: 'Kč',
  HUF: 'Ft',
  RUB: '₽',
  BRL: 'R$',
  MXN: '$',
  ARS: '$',
  CLP: '$',
  COP: '$',
  PEN: 'S/',
  UYU: '$',
  VND: '₫',
  THB: '฿',
  MYR: 'RM',
  IDR: 'Rp',
  PHP: '₱',
  TWD: 'NT$',
  AED: 'د.إ',
  SAR: 'ر.س',
  QAR: 'ر.ق',
  KWD: 'د.ك',
  BHD: '.د.ب',
  OMR: 'ر.ع.',
  JOD: 'د.ا',
  LBP: 'ل.ل',
  EGP: 'ج.م',
  MAD: 'د.م.',
  TND: 'د.ت',
  DZD: 'د.ج',
  ZAR: 'R',
  NGN: '₦',
  KES: 'KSh',
  GHS: 'GH₵',
  UGX: 'USh',
  TZS: 'TSh',
  ZMW: 'ZK',
  BWP: 'P',
  NAM: 'N$',
  SZL: 'L',
  LSL: 'L',
  MUR: '₨',
  SCR: '₨',
  CDF: 'FC',
  XAF: 'FCFA',
  XOF: 'CFA',
  GMD: 'D',
  GNF: 'FG',
  KMF: 'CF',
  DJF: 'Fdj',
  ETB: 'Br',
  ERN: 'Nfk',
  SDG: 'ج.س.',
  SOS: 'S',
  SSP: 'SSP',
  TTD: 'TT$',
  BBD: 'Bds$',
  JMD: 'J$',
  HTG: 'G',
  DOP: 'RD$',
  CUP: '$',
  BMD: 'BD$',
  BSD: 'B$',
  KYD: 'CI$',
  AWG: 'Afl.',
  ANG: 'NAf.',
  XCD: 'EC$',
  FJD: 'FJ$',
  PGK: 'K',
  SBD: 'SI$',
  VUV: 'VT',
  WST: 'T',
  TOP: 'T$',
  NZD: 'NZ$',
  XPF: 'CFP',
  CFP: '₣',
  // Add more currencies as needed
};

/**
 * Get currency symbol from currency code
 * @param currencyCode - The currency code (e.g., 'USD', 'NPR')
 * @returns The currency symbol or the original code if symbol not found
 */
export const getCurrencySymbol = (currencyCode: string): string => {
  if (!currencyCode) return '';
  
  const symbol = currencySymbols[currencyCode.toUpperCase()];
  return symbol || currencyCode;
};

/**
 * Format price with currency symbol
 * @param price - The price amount
 * @param currencyCode - The currency code
 * @returns Formatted price string with currency symbol
 */
export const formatPrice = (price: number | string, currencyCode: string): string => {
  const symbol = getCurrencySymbol(currencyCode);
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (isNaN(numericPrice)) return `${symbol} 0`;
  
  return `${symbol} ${numericPrice.toLocaleString()}`;
}; 