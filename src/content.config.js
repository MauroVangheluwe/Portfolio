import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";


const skills = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/skills" }),
  // Only require a name field per your request
  schema: z.object({
    name: z.string(),
  }),
});

// Export a single `collections` object to register your collection(s)
export const collections = { skills };

