export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: "golf" | "bachelorette" | "family" | "general" | "local";
  hero_image: string;
  published: boolean;
  published_at: string;
  seo_title?: string;
  seo_description?: string;
  collectionId?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
  platform: "airbnb" | "google" | "direct";
  avatar?: string;
}

export interface Inquiry {
  name: string;
  email: string;
  phone?: string;
  message: string;
  check_in?: string;
  check_out?: string;
  guests?: number;
  event_type?: "golf" | "bachelorette" | "family" | "other";
}

export interface Amenity {
  icon: string;
  label: string;
  category: string;
}

export interface GalleryImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  type?: "website" | "article";
  structuredData?: Record<string, unknown>;
}
