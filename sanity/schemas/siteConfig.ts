import { defineArrayMember, defineField, defineType } from "sanity";

export const siteConfig = defineType({
  name: "siteConfig",
  title: "Site Config",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "resumeUrl",
      title: "Resume URL",
      type: "url",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "email",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string"
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url"
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string"
    }),
    defineField({
      name: "locationLabel",
      title: "Footer Location Label",
      type: "string"
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: { hotspot: true }
    }),
    defineField({
      name: "heroSkills",
      title: "Hero Skills",
      type: "array",
      of: [defineArrayMember({ type: "string" })]
    }),
    defineField({
      name: "socials",
      title: "Social Links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: ["facebook", "instagram", "linkedin", "x", "dribbble", "behance"]
              },
              validation: (rule) => rule.required()
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) => rule.required()
            })
          ],
          preview: {
            select: {
              title: "platform",
              subtitle: "url"
            }
          }
        })
      ]
    }),
    defineField({
      name: "brands",
      title: "Brand Logos",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (rule) => rule.required()
            }),
            defineField({
              name: "logo",
              title: "Logo",
              type: "image",
              options: { hotspot: true }
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url"
            })
          ],
          preview: {
            select: {
              title: "name",
              media: "logo"
            }
          }
        })
      ]
    })
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "tagline",
      media: "avatar"
    }
  }
});
