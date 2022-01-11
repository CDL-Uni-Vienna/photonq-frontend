import { createPortableTextComponent } from "next-sanity";
import { cmsConfig } from "../../cms/cms.config";
import { serializers } from "../../cms/serializers";

export const PortableText: (props: { blocks: any }) => JSX.Element =
  createPortableTextComponent({
    ...cmsConfig,
    // Serializers passed to @sanity/block-content-to-react
    // (https://github.com/sanity-io/block-content-to-react)
    serializers,
  });
