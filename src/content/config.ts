import { defineCollection, z } from "astro:content";

const writings = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { writings };
