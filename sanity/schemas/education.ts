import { defineField, defineType } from "sanity";

export const education = defineType({
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    defineField({
      name: "degree",
      title: "Degree",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "institution",
      title: "Institution",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "startYear",
      title: "Start Year",
      type: "number",
      validation: (rule) => rule.required().integer().min(1900)
    }),
    defineField({
      name: "endYear",
      title: "End Year",
      type: "number",
      validation: (rule) => rule.required().integer().min(1900)
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 0,
      validation: (rule) => rule.required().integer().min(0)
    })
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }]
    }
  ],
  preview: {
    select: {
      title: "degree",
      subtitle: "institution"
    }
  }
});
