import { createClient } from "next-sanity";
import { cmsConfig } from "./cms.config";

export const cmsServerCdnClient = createClient({ ...cmsConfig, useCdn: true });

/**
 *
 */
export const cmsServerPreviewClient = createClient({
  ...cmsConfig,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

/**
 *
 * @param usePreview
 */
export const getCmsServerClient = (usePreview?: boolean) =>
  usePreview ? cmsServerPreviewClient : cmsServerCdnClient;
