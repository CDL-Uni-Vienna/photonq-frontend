export const typeDocument = {
  name: "content_type",
  title: "Type",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
};
