import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Funções de formatação consistentes para evitar erros de hidratação
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
}

export function formatNumber(num: number, decimals: number = 2): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num);
}

export function formatPercentage(percentage: number, decimals: number = 2): string {
  const sign = percentage >= 0 ? '+' : '';
  return `${sign}${formatNumber(percentage, decimals)}%`;
}

export function formatMarketCap(value: number): string {
  if (value >= 1e12) {
    return `$${formatNumber(value / 1e12, 2)}T`;
  } else if (value >= 1e9) {
    return `$${formatNumber(value / 1e9, 1)}B`;
  } else if (value >= 1e6) {
    return `$${formatNumber(value / 1e6, 1)}M`;
  }
  return formatPrice(value);
}