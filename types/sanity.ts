import type { Image, Slug } from "sanity";

export type ProjectCategory = "ui-ux" | "branding" | "web" | "mobile";

export type SocialPlatform = "facebook" | "instagram" | "linkedin" | "x" | "dribbble" | "behance";

export type SanityImage = Image;

export type SocialLink = Readonly<{
  platform: SocialPlatform;
  url: string;
}>;

export type Brand = Readonly<{
  name: string;
  logo?: SanityImage;
  logoUrl?: string;
  url?: string;
}>;

export type SiteConfig = Readonly<{
  _id: string;
  name: string;
  tagline: string;
  bio: string;
  resumeUrl: string;
  email: string;
  phone?: string;
  website?: string;
  address?: string;
  locationLabel?: string;
  avatar?: SanityImage;
  avatarUrl?: string;
  heroImage?: SanityImage;
  heroImageUrl?: string;
  skills?: readonly string[];
  heroSkills?: readonly string[];
  socials?: readonly SocialLink[];
  brands?: readonly Brand[];
}>;

export type Experience = Readonly<{
  _id: string;
  role: string;
  company: string;
  startDate: string;
  endDate?: string | null;
  description: string;
  order: number;
}>;

export type Education = Readonly<{
  _id: string;
  degree: string;
  institution: string;
  startYear: number;
  endYear: number;
  order: number;
}>;

export type Certificate = Readonly<{
  _id: string;
  title: string;
  issuer: string;
  date: string;
  imageUrl?: string;
  aspectRatio?: number;
}>;

export type Project = Readonly<{
  _id: string;
  title: string;
  slug: Slug;
  category: ProjectCategory;
  date: string;
  image: SanityImage;
  imageUrl: string;
  description: string;
  url?: string;
  featured: boolean;
  order: number;
}>;

export type Service = Readonly<{
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  skills: readonly string[];
  image?: SanityImage;
  imageUrl?: string;
  featured: boolean;
  order: number;
}>;

export type Testimonial = Readonly<{
  _id: string;
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: SanityImage;
  avatarUrl?: string;
  rating: number;
  order: number;
}>;

export type Faq = Readonly<{
  _id: string;
  question: string;
  answer: string;
  order: number;
}>;
