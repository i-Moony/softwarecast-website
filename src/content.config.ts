import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const app_mentioned = z.object({
    link: z.string(),
    title: z.string(),
});

const learn_more = z.object({
    link: z.string(),
    title: z.string(),
    description: z.string().optional(),
});

const baseCommentSchema = z.object({
    content: z.string(),
    author: z
        .object({
            link: z.string(),
            name: z.string(),
        })
        .optional(),
});

type Comment = z.infer<typeof baseCommentSchema> & {
    respond?: Comment;
};

const commentSchema: z.ZodType<Comment> = baseCommentSchema.extend({
    respond: z.lazy(() => commentSchema).optional(),
});

const unclear_moment = z.object({
    title: z.string(),
    description: z.string(),
});

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
            apps_mentioned: z.array(app_mentioned).optional(),
            learn_more: z.array(learn_more).optional(),
            interesting_comments: z.array(commentSchema).optional(),
            unclear_moments: z.array(unclear_moment).optional(),
        }),
});

const blog = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
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
