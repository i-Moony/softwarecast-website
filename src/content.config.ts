import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const episodes = defineCollection({
    loader: glob({
        pattern: "**/*.md",
        base: "./src/data/episodes",
    }),
    schema: ({ image }) =>
        z.object({
            episode_number: z.number(),
            title: z.string(),
            release_date: z.date(),
            video_length: z.string(),
            audio_length: z.string(),
            youtube_id: z.string(),
            preview: image(),
            description: z.string(),
            bullet_points: z.array(z.string()),
            apps_mentioned: z
                .array(
                    z.object({
                        link: z.string(),
                        title: z.string(),
                    }),
                )
                .optional(),
            learn_more: z
                .array(
                    z.object({
                        link: z.string(),
                        title: z.string(),
                        description: z.string().optional(),
                    }),
                )
                .optional(),
            interesting_comments: z
                .array(
                    z.object({
                        content: z.string(),
                        author: z.string(),
                        link: z.string(),
                        respond: z.string().optional(),
                    }),
                )
                .optional(),
            unclear_moments: z
                .array(
                    z.object({
                        title: z.string(),
                        description: z.string(),
                    }),
                )
                .optional(),
        }),
});

const blog = defineCollection({
    loader: glob({
        pattern: "**/*.md",
        base: "./src/data/blog",
    }),
    schema: z.object({
        title: z.string(),
        date: z.date(),
        brief: z.string(),
    }),
});

export const collections = {
    blog,
    episodes,
};
