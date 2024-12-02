import { defineCollection, z } from "astro:content";

const writings = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { writings };
