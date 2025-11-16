import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z
      .object({
        url: z.string(),
        alt: z.string(),
      })
      .optional(),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/notes" }),
  schema: z.object({
    title: z.string(),
    author: z.string().optional(),
    date: z.string().optional(),
    place: z.string().optional(),
  }),
});

// Export a single `collections` object to register your collection(s)
export const collections = { projects, notes };

