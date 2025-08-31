import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const episodes = defineCollection({
    loader: glob({
        pattern: "**/*.md",
        base: "./src/data/episodes",
    }),
    schema: z.object({
        episode_number: z.number(),
        title: z.string(),
        release_date: z.date(),
        video_length: z.string(),
        audio_length: z.string(),
        youtube_id: z.string(),
    }),
});

export const collections = {
    episodes,
};
