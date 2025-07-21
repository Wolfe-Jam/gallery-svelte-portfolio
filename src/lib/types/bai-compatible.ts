/**
 * 🔥 FUEL: bAI Interface Compatibility Layer
 * This allows drop-in updates from theblockchain-ai-svelte
 * CHANGE FUEL, NOT ENGINE!
 */

// ============================================
// bAI COMPONENT INTERFACE (FUEL - Easy Updates)
// ============================================

export interface Component {
  id: string;
  name: string;
  slug?: string;
  tagline?: string;
  description?: string;
  
  // Multi-audience naming (bAI standard)
  formal_name?: string;
  fintech_name?: string;
  api_name?: string;
  consumer_tagline?: string;
  
  // Pricing in cents (bAI standard)
  price_individual: number;
  price_team: number;
  price_enterprise: number;
  
  // Search & categorization
  category: ComponentCategory;
  tags: string[];
  keywords?: string[];
  tech_stack?: string[];
  
  // Display configuration (bAI FlipCard compatible)
  flip_card_theme?: FlipCardTheme;
  flip_card_color?: string;
  flip_card_size?: FlipCardSize;
  
  // Typography (HEXTRA + bAI extensions)
  titleFont?: string;
  titleWeight?: number;
  taglineFont?: string;
  taglineWeight?: number;
  
  // Gallery-specific extensions
  colors?: string[];
  image?: string;
  
  // Feature lists (bAI FlipCard compatibility)
  developer_features?: string[];
  consumer_features?: string[];
  
  // Quality metrics
  rating?: number;
  download_count?: number;
  
  // Status flags
  featured?: boolean;
  is_active?: boolean;
  is_published?: boolean;
  
  created_at?: string;
}

// ============================================
// bAI MATHEMATICAL SIZE SYSTEM (FUEL)
// ============================================

// Re-export centralized sizing system for backward compatibility
export { BAI_SIZES, MASTER_SIZE, type SizeKey as BAI_Size } from '$lib/constants/sizing.js';

// ============================================
// bAI THEME SYSTEM (FUEL)
// ============================================

export type ComponentCategory = 
  | 'payment-processing'
  | 'gallery'
  | 'color-intelligence'
  | 'blockchain-integration'
  | 'ui-components'
  | 'data-visualization'
  | 'authentication'
  | 'analytics'
  | 'developer-tools'
  | 'apparel'
  | 'accessories'
  | 'home-living'
  | 'business-office'
  | 'tech-electronics'
  | 'seasonal-holiday'
  | 'specialty-items';

export type FlipCardTheme = 
  | 'professional'
  | 'gradient'
  | 'gallery'
  | 'wallet'
  | 'nft'
  | 'minimal'
  | 'premium'
  | 'api';

export type FlipCardSize = 
  | 'square'
  | 'story'
  | 'pinterest'
  | 'twitter'
  | 'standard'
  | 'compact'
  | 'hero'
  | 'mobile'
  | 'desktop'
  | 'coinbase'
  | 'opensea'
  | 'github';

// ============================================
// GALLERY-SPECIFIC EXTENSIONS (ENGINE)
// ============================================

export interface GalleryProduct {
  id: string;
  name: string;
  image: string;
  colors: string[];
  brand?: string;
  category?: string;
  price?: number;
  tags?: string[];
  // 🖼️ Image Gallery Structure
  gallery?: {
    blank_images?: string[];
    hero_image?: string;
  };
  blank_images?: string[]; // Direct array for some products
  // API integration extensions (generic)
  external_product_id?: string;
  product_type?: 'apparel' | 'accessories' | 'home' | 'business' | 'tech' | 'seasonal' | 'specialty';
  variants?: ProductVariant[];
  material?: string;
  available_sizes?: string[];
  inventory_count?: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  available: boolean;
  options: {
    color?: string;
    size?: string;
    material?: string;
  };
}

// Convert Gallery product to bAI Component
export function galleryToBaiComponent(product: GalleryProduct): Component {
  // Create consumer tagline from brand and category, with fallback
  let consumerTagline = 'Professional Product';
  if (product.brand && product.category) {
    consumerTagline = `${product.brand} ${product.category}`;
  } else if (product.brand) {
    consumerTagline = product.brand;
  } else if (product.category) {
    consumerTagline = product.category;
  }

  // Generate gradient from product colors or use defaults
  let flipCardColor = 'from-cyan-400 to-blue-500'; // Default professional gradient
  
  if (product.colors && product.colors.length >= 2) {
    // Use first two colors to create a gradient
    flipCardColor = `linear-gradient(135deg, ${product.colors[0]}, ${product.colors[1]})`;
  } else if (product.colors && product.colors.length === 1) {
    // Use single color with a lighter variant
    flipCardColor = `linear-gradient(135deg, ${product.colors[0]}, #22d3ee)`;
  }

  // Determine category based on product type
  let componentCategory: ComponentCategory = 'gallery';
  if (product.product_type) {
    switch (product.product_type) {
      case 'apparel': componentCategory = 'apparel'; break;
      case 'accessories': componentCategory = 'accessories'; break;
      case 'home': componentCategory = 'home-living'; break;
      case 'business': componentCategory = 'business-office'; break;
      case 'tech': componentCategory = 'tech-electronics'; break;
      case 'seasonal': componentCategory = 'seasonal-holiday'; break;
      case 'specialty': componentCategory = 'specialty-items'; break;
    }
  } else if (product.category?.toLowerCase().includes('payment')) {
    componentCategory = 'payment-processing';
  } else if (product.category?.toLowerCase().includes('auth')) {
    componentCategory = 'authentication';
  }

  // 🖼️ CRITICAL FIX: Get the best available image
  let bestImage = product.image; // Default fallback
  
  // Priority: gallery.blank_images[0] > blank_images[0] > image
  if (product.gallery?.blank_images && product.gallery.blank_images.length > 0) {
    bestImage = product.gallery.blank_images[0];
  } else if (product.blank_images && product.blank_images.length > 0) {
    bestImage = product.blank_images[0];
  }

  return {
    id: product.id,
    name: product.name,
    consumer_tagline: consumerTagline,
    price_individual: product.price || 19900,
    price_team: (product.price || 19900) * 2.5,
    price_enterprise: (product.price || 19900) * 7.5,
    category: componentCategory,
    tags: product.tags || [],
    tech_stack: ['svelte', 'color-intelligence', 'gallery'],
    colors: product.colors,
    image: bestImage, // 🖼️ Now uses the best available image!
    flip_card_theme: 'gallery',
    flip_card_color: flipCardColor // Add the gradient!
  };
}

// ============================================
// HEXTRA CLIENT COMPATIBILITY (ENGINE)
// ============================================

export interface HextraConfig {
  client: {
    id: string;
    name: string;
    tier: 'enterprise' | 'professional' | 'startup';
    internal?: boolean;
  };
  features: {
    colorIntelligence: boolean;
    aiGeneration: boolean;
    brandDNA: boolean;
    professionalAPI: boolean;
  };
  branding: {
    primaryColor: string;
    secondaryColor: string;
    accent: string;
  };
  api?: {
    baseUrl: string;
    rateLimit: string;
  };
}

// ============================================
// EVENT SYSTEM (FUEL - bAI Compatible)
// ============================================

export interface FlipCardEvents {
  flip: { isFlipped: boolean; productId: string };
  colorSelect: { color: string; productId: string };
  addToCart: { component: Component; count: number };
  love: { component: Component; isLoved: boolean };
  buyNow: { component: Component; tier: 'individual' | 'team' | 'enterprise' };
}
