import type { GalleryProduct } from '$lib/types/bai-compatible';

export interface PageData {
  initialProducts: GalleryProduct[];
  loadedAt: string;
  error?: string;
}