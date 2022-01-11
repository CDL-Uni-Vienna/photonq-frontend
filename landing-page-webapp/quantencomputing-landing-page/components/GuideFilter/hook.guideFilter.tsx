import React, { useEffect, useMemo, useState } from "react";
import { GuideCategory } from "./GuideFilter";
import { GuideDocumentLocalizedPreview } from "../../cms/guide/guide.type";
import { getCmsWebClient } from "../../cms/cms.web";
import { getLocalizedGuidePreviewsByCategoryQuery } from "../../cms/guide/guide.queries";
import { useRouter } from "next/router";
import { buildCmsImage } from "../../cms/cms.images";

export function useGuideFilter(guides: GuideDocumentLocalizedPreview[]) {
  const router = useRouter();
  const client = useMemo(() => getCmsWebClient(), []);
  const [isFirstFetch, setIsFirstFetch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredGuides, setFilteredGuides] = useState(guides);
  const [currentCategory, setCurrentCategory] = useState<GuideCategory>(
    GuideCategory.All
  );

  const fetchGuidesByCategory = async () => {
    setIsLoading(true);
    const guides = await client.fetch<GuideDocumentLocalizedPreview[]>(
      getLocalizedGuidePreviewsByCategoryQuery(router.locale, currentCategory)
    );
    setFilteredGuides(
      guides.map((guide) => ({
        ...guide,
        mainImage: buildCmsImage(guide.mainImage)
          .quality(80)
          .format("webp")
          .size(350, 300)
          .url()!,
      }))
    );
    setIsLoading(() => false);
  };

  useEffect(() => {
    if (!isFirstFetch) {
      fetchGuidesByCategory();
    } else {
      setIsFirstFetch(false);
    }
  }, [currentCategory]);

  return {
    currentCategory,
    setCurrentCategory,
    filteredGuides,
    setFilteredGuides,
    isLoading,
  };
}
