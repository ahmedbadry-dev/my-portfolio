import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./schemas";
import { getSanityDataset, getSanityProjectId } from "./lib/env";

const projectId = getSanityProjectId();
const dataset = getSanityDataset();

export default defineConfig({
  name: "portfolio",
  title: "Ahmed Badry Portfolio CMS",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes
  }
});
