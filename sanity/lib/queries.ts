import { groq } from "next-sanity";

export const SITE_CONFIG_QUERY = groq`
  *[_type == "siteConfig"][0] {
    _id,
    name,
    tagline,
    bio,
    resumeUrl,
    email,
    phone,
    website,
    address,
    locationLabel,
    avatar,
    "avatarUrl": avatar.asset->url,
    heroSkills,
    socials[] {
      platform,
      url
    },
    brands[] {
      name,
      logo,
      "logoUrl": logo.asset->url,
      url
    }
  }
`;

export const EXPERIENCES_QUERY = groq`
  *[_type == "experience"] | order(order asc) {
    _id,
    role,
    company,
    startDate,
    endDate,
    description,
    order
  }
`;

export const EDUCATION_QUERY = groq`
  *[_type == "education"] | order(order asc) {
    _id,
    degree,
    institution,
    startYear,
    endYear,
    order
  }
`;

export const PROJECTS_QUERY = groq`
  *[_type == "project"] | order(order asc, date desc) {
    _id,
    title,
    slug,
    category,
    date,
    image,
    "imageUrl": image.asset->url,
    description,
    url,
    featured,
    order
  }
`;

export const FEATURED_PROJECTS_QUERY = groq`
  *[_type == "project" && featured == true] | order(order asc, date desc) {
    _id,
    title,
    slug,
    category,
    date,
    image,
    "imageUrl": image.asset->url,
    description,
    url,
    featured,
    order
  }
`;

export const FEATURED_PROJECT_QUERY = groq`
  *[_type == "project" && featured == true] | order(order asc, date desc)[0] {
    _id,
    title,
    slug,
    category,
    date,
    image,
    "imageUrl": image.asset->url,
    description,
    url,
    featured,
    order
  }
`;

export const SERVICES_QUERY = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    subtitle,
    description,
    skills,
    image,
    "imageUrl": image.asset->url,
    featured,
    order
  }
`;

export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial"] | order(order asc) {
    _id,
    quote,
    author,
    role,
    company,
    avatar,
    "avatarUrl": avatar.asset->url,
    rating,
    order
  }
`;

export const FAQS_QUERY = groq`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    order
  }
`;
