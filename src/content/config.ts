import { z, defineCollection } from "astro:content";

const projects = defineCollection({
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
  schema: z.object({
    title: z.string(),
    author: z.string().optional(),
    date: z.string().optional(),
    place: z.string().optional(),
  }),
});

export const collections = { projects, notes };
