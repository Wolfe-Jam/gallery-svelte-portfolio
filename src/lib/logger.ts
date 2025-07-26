/**
 * Safe logging utility - only logs in development
 * Prevents console logs from appearing in production builds
 */

const isDev = import.meta.env.DEV;

export const logger = {
  log: (...args: any[]) => {
    if (isDev) console.log(...args);
  },
  
  warn: (...args: any[]) => {
    if (isDev) console.warn(...args);
  },
  
  error: (...args: any[]) => {
    if (isDev) console.error(...args);
  },
  
  info: (...args: any[]) => {
    if (isDev) console.info(...args);
  },
  
  debug: (...args: any[]) => {
    if (isDev) console.debug(...args);
  }
};