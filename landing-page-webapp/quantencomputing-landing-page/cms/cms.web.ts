import PicoSanity from "picosanity";
import { cmsConfig } from "./cms.config";

export const cmsWebCdnClient = new PicoSanity({ ...cmsConfig, useCdn: true });

export const cmsWebPreviewClient = new PicoSanity({
  ...cmsConfig,
  useCdn: false,
});

export const getCmsWebClient = (usePreview?: boolean) =>
  usePreview ? cmsWebPreviewClient : cmsWebCdnClient;
