import { defineField, defineType } from "sanity";

export const certificate = defineType({
  name: "certificate",
  title: "Certificate",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "issuer",
      title: "Issuer",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required()
    })
  ],
  orderings: [
    {
      title: "Date",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }]
    }
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "issuer",
      media: "image"
    }
  }
});
