import { createClient } from "next-sanity";

import { getSanityDataset, getSanityProjectId } from "./env";

const projectId = getSanityProjectId();
const dataset = getSanityDataset();

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production"
});

type SanityFetchOptions = Readonly<{
  query: string;
  params?: Record<string, unknown>;
  tags?: readonly string[];
  revalidate?: number;
}>;

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 3600
}: SanityFetchOptions): Promise<T> {
  try {
    return await client.fetch<T>(query, params, {
      next: {
        revalidate,
        tags: [...tags]
      }
    });
  } catch {
    return undefined as T;
  }
}
