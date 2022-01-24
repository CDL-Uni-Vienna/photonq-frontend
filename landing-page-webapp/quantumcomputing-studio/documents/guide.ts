import { getLocaleRefType, LocaleElementType } from "../fields/localeElement";

export const guideDocument = {
  name: "guide",
  title: "Guide / Documentation",
  type: "document",
  fields: [
    {
      name: "showOnHomePage",
      title: "Show on Home Page",
      type: "boolean",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "title",
      title: "Title",
      type: getLocaleRefType(LocaleElementType.String),
      validation: (Rule) => Rule.required(),
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: getLocaleRefType(LocaleElementType.String),
      validation: (Rule) => Rule.required(),
    },
    {
      name: "teaser",
      title: "Teaser",
      type: getLocaleRefType(LocaleElementType.String),
      validation: (Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: { type: "category" },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "type",
      title: "Type",
      type: "reference",
      to: { type: "content_type" },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.en",
        maxLength: 96,
      },
      description: "Takes the English 'Title'-input when pressing 'Generate'.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "body",
      title: "Body",
      description: "Text content for the blog post.",
      type: getLocaleRefType(LocaleElementType.BlockContent),
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title.en",
      teaser: "teaser.en",
      mainImage: "mainImage",
      category: "category.title",
      content_type: "type.title",
      publishedAt: "publishedAt",
    },
  },
};
