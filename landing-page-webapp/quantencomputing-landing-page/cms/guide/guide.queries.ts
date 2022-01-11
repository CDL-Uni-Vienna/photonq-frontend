import { groq } from "next-sanity";
import { i18n } from "../../next-i18next.config";
import { GuideCategory } from "../../components/GuideFilter/GuideFilter";

export const getLocalizedGuideBySlugQuery = (
  locale = i18n.defaultLocale
) => groq`
    *[_type == "guide" && slug.current == $slug]
    { 
        ...,
        "title": title.${locale},
        "subtitle": subtitle.${locale},
        "teaser": teaser.${locale},
        "category": category->title,
        "content_type": type->title,
        "body": body.${locale},
    }
    [0]
`;

export const getLocalizedGuidePreviewsQuery = (
  locale = i18n.defaultLocale
) => groq`
    *[_type == "guide"]
    { 
        slug,
        publishedAt,
        mainImage,
        "title": title.${locale},
        "teaser": teaser.${locale},
        "category": category->title,
        "content_type": type->title,
    }
`;

export const getLocalizedGuidePreviewsByCategoryQuery = (
  locale = i18n.defaultLocale,
  category: GuideCategory
) => groq`
    *[_type == "guide"${
      category !== GuideCategory.All
        ? ` && category->title == "${category}"`
        : ""
    }]
    { 
        slug,
        publishedAt,
        mainImage,
        "title": title.${locale},
        "teaser": teaser.${locale},
        "category": category->title,
        "content_type": type->title,
    }
`;

export const getLocalizedHomePageGuidePreviewsQuery = (
  locale = i18n.defaultLocale
) => groq`
    *[_type == "guide" && showOnHomePage == true] 
    {
        slug,
        publishedAt,
        mainImage,
        "title": title.${locale},
        "teaser": teaser.${locale},
        "category": category->title,
        "content_type": type->title,
    }
`;

export const getGuideSlugsQuery = () => groq`
    *[_type == "guide"]
    { 
      slug
    }
`;
