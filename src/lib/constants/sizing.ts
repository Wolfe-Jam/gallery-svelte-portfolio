/**
 * 🎯 bAI Mathematical SIZE System - Single Source of Truth
 * 
 * Mathematical precision with golden ratio baseline at SIZE-5 (333px)
 * Used across all FlipCard components and grid systems
 */

// ============================================
// CORE SIZE SYSTEM (Mathematical DNA)
// ============================================

export const BAI_SIZES = {
  1: 88,   // 333 ÷ 4 = Micro Badge
  2: 111,  // 333 ÷ 3 = Tiny Perfect  
  3: 166,  // 333 ÷ 2 = Small Grid
  4: 222,  // 333 × 2/3 = Compact
  5: 333,  // 333 × 1 = Master Baseline ⭐
  6: 444,  // 333 × 4/3 = Large Display
  7: 555,  // 333 × 5/3 = Feature Hero
  8: 777,  // 333 × 7/3 = Showcase
  9: 999   // 333 × 3 = Mega Hero
} as const;

// Master baseline - golden ratio foundation
export const MASTER_SIZE = 333; // SIZE-5 baseline

// Type-safe size keys
export type SizeKey = keyof typeof BAI_SIZES;
export type SizeValue = typeof BAI_SIZES[SizeKey];

// ============================================
// RESPONSIVE GRID CALCULATIONS
// ============================================

/**
 * Calculate optimal grid columns based on card size
 * Ensures efficient viewport usage across all screen sizes
 */
export function getOptimalColumns(size: SizeKey): number {
  const columnMap: Record<SizeKey, number> = {
    1: 9,  // 88px - Maximum density - show all 9 cards!
    2: 8,  // 111px - High density
    3: 6,  // 166px - Medium-high density
    4: 5,  // 222px - Balanced density
    5: 4,  // 333px - Optimal baseline ⭐
    6: 3,  // 444px - Large display
    7: 2,  // 555px - Feature display
    8: 2,  // 777px - Showcase
    9: 1   // 999px - Hero single card
  };
  
  return columnMap[size];
}

/**
 * Get card width in pixels for given size
 */
export function getCardWidth(size: SizeKey): number {
  return BAI_SIZES[size];
}

/**
 * Calculate ImageBox size (2/3 ratio for FlipCards)
 */
export function getImageBoxSize(size: SizeKey): number {
  return Math.round(BAI_SIZES[size] * (2/3));
}

// ============================================
// SPACING CALCULATIONS (Golden Ratio)
// ============================================

/**
 * Enhanced spacing for different densities using golden ratio
 */
export function getOptimalSpacing(size: SizeKey) {
  const cardWidth = BAI_SIZES[size];
  
  return {
    compact: cardWidth * 0.5,      // 50% overlap - tight
    balanced: cardWidth * 0.618,   // Golden ratio - optimal ⭐
    spacious: cardWidth * 0.75     // 75% overlap - loose
  };
}

/**
 * Calculate corner offset for responsive corner buttons
 */
export function getCornerOffset(size: SizeKey): number {
  const cardWidth = BAI_SIZES[size];
  return Math.max(4, Math.round(cardWidth * 0.015)); // Scale with card size
}

/**
 * Calculate top padding (fixed 16px for all sizes)
 */
export function getTopPadding(): number {
  return 16; // Fixed 16px top padding (1rem)
}

// ============================================
// SIZE VALIDATION & UTILITIES
// ============================================

/**
 * Validate if a number is a valid size key
 */
export function isValidSize(size: number): size is SizeKey {
  return size >= 1 && size <= 9 && Number.isInteger(size);
}

/**
 * Get size key from pixel value (approximate match)
 */
export function getSizeFromPixels(pixels: number): SizeKey {
  let closestSize: SizeKey = 5; // Default to baseline
  let minDiff = Infinity;
  
  (Object.keys(BAI_SIZES) as Array<string>).forEach(sizeStr => {
    const size = parseInt(sizeStr) as SizeKey;
    const diff = Math.abs(BAI_SIZES[size] - pixels);
    if (diff < minDiff) {
      minDiff = diff;
      closestSize = size;
    }
  });
  
  return closestSize;
}

/**
 * Get all size keys as array
 */
export function getAllSizes(): SizeKey[] {
  return Object.keys(BAI_SIZES).map(Number) as SizeKey[];
}

// ============================================
// RESPONSIVE BREAKPOINTS
// ============================================

/**
 * Determine if size should show certain features
 */
export const SIZE_FEATURES = {
  showBuyButton: (size: SizeKey) => size >= 4,     // SIZE 4+
  showColorPalette: (size: SizeKey) => size >= 5,  // SIZE 5+  
  showToolbar: (size: SizeKey) => size >= 4,       // SIZE 4+
  showCornerButtons: (size: SizeKey) => size >= 4  // SIZE 4+
} as const;

// ============================================
// EXPORT LEGACY SUPPORT (for migration)
// ============================================

// Support legacy SIZES constant during migration
export const SIZES = BAI_SIZES;

// Export everything for easy importing
export default {
  BAI_SIZES,
  MASTER_SIZE,
  getOptimalColumns,
  getCardWidth,
  getImageBoxSize,
  getOptimalSpacing,
  getCornerOffset,
  getTopPadding,
  isValidSize,
  getSizeFromPixels,
  getAllSizes,
  SIZE_FEATURES
};