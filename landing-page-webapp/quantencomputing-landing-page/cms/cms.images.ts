import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { createImageUrlBuilder } from "next-sanity";
import { cmsConfig } from "./cms.config";

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
export const buildCmsImage = (source: SanityImageSource) =>
  createImageUrlBuilder(cmsConfig).image(source);
