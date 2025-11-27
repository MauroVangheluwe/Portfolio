import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";




const skills = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/skills" }),
  schema: z.object({
    name: z.string(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    name: z.string(),
    headImg: z.string(),
    img: z.string(),
    description: z.string(),
    creativeField: z.array(z.string()),
    duration: z.string(),
    year: z.number(),
    client: z.string(),
    software: z.array(z.string()),
    imgs: z.array(z.string()).optional(),
    websiteImgIndexes: z.array(z.number()).optional(),
    iframes: z.array(z.object({
      src: z.string(),
      width: z.number().optional(),
      height: z.number().optional(),
    })).optional(),
    iframeIndexes: z.array(z.number()).optional(),
  }),
});

// Export a single `collections` object to register your collection(s)
export const collections = { skills, projects };