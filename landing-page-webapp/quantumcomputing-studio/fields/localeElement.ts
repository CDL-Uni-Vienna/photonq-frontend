import Tabs from "sanity-plugin-tabs";
import { TabsContainer } from "../inputs/TabsContainer";

// Since schemas are code, we can programmatically build
// fields to hold translated values. We'll use this array
// of languages to determine which fields to define.
export const supportedLanguages = [
  { id: "de", title: "🇦🇹 German", isDefault: true },
  { id: "en", title: "🇺🇸 English" },
];

export const baseLanguage = supportedLanguages.find((l) => l.isDefault);

export enum LocaleElementType {
  String = "string",
  Text = "text",
  BlockContent = "blockContent",
}

/**
 * Type to be used for referencing.
 *
 * @param source
 * @returns
 */
export function getLocaleRefType(source: LocaleElementType) {
  return `locale${source[0].toUpperCase()}${source.slice(1)}`;
}

/**
 * Small utility to build the locale containers in 'schema.ts'.
 *
 * @param props
 * @returns
 */
export function getLocaleElement(props: {
  type: LocaleElementType;
  title?: string;
}) {
  return {
    title: props.title || `Localized ${props.type}`,
    name: getLocaleRefType(props.type),
    type: "object",

    inputComponent: TabsContainer,
    options: {
      // setting layout to object will group the tab content in an object fieldset border.
      // ... Useful for when your tab is in between other fields inside a document.
      layout: "object"
    },

    fieldsets: supportedLanguages.map((lang) => ({
      title: lang.title,
      name: lang.id,
      validation: (Rule) => Rule.required(),
    })),

    // Dynamically define one field per language
    fields: supportedLanguages.map((lang) => ({
      title: props.title || `Localized ${props.type}`,
      name: lang.id,
      type: props.type,
      fieldset: lang.id,
    })),
  };
}
