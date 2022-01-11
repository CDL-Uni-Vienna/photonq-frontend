import { SanityDocument, SanityImageAssetDocument } from "@sanity/client";
import { SanityBlockContent, SanityLocaleMap, SanitySlug } from "../types";

export interface BaseGuideDocument extends SanityDocument {
  slug: SanitySlug;
  title: SanityLocaleMap<string>;
  subtitle: SanityLocaleMap<string>;
  teaser: SanityLocaleMap<string>;
  mainImage: SanityImageAssetDocument;
  publishedAt: string;
  category: string;
  content_type: string;
  body: SanityLocaleMap<SanityBlockContent>;
}

export interface GuideDocumentLocalized extends SanityDocument {
  slug: SanitySlug;
  title: string;
  subtitle: string;
  teaser: string;
  mainImage: string;
  publishedAt: string;
  category: string;
  content_type: string;
  body: SanityBlockContent;
}

export interface GuideDocumentLocalizedPreview extends SanityDocument {
  slug: SanitySlug;
  title: string;
  teaser: string;
  mainImage: string;
  publishedAt: string;
  category: string;
  content_type: string;
}
