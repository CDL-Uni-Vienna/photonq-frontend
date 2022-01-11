export interface SanitySlug {
  type: "_slug";
  current: string;
}

/**
 * A shared type among all entities that
 * is used for 'getStaticPaths' where only
 * the slugs are required.
 */
export interface AtomicSlugItem {
  slug: SanitySlug;
}

export interface SanityLocaleMap<T> {
  en: T;
  de: T;
}

// This is just an alias until a valid
// type for block content is available.
export type SanityBlockContent = any;
