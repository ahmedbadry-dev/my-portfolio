const placeholderProjectId = "your_project_id";
const buildSafeProjectId = "your-project-id";

export function getSanityProjectId() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? placeholderProjectId;

  if (projectId === placeholderProjectId) {
    return buildSafeProjectId;
  }

  return projectId;
}

export function getSanityDataset() {
  return process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
}
