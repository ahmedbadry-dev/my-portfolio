import { defineField, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
      description: "Leave empty to display Present."
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required()
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
      title: "role",
      subtitle: "company"
    }
  }
});
