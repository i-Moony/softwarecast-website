import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
    const blog = await getCollection("blog");
    return rss({
        title: "Блог обновлений сайта - СофтварьКаст",
        description: "Здесь собраны все обновления, связанные с сайтом.",
        site: context.site,
        items: blog.map((post) => ({
            title: post.data.title,
            pubDate: post.data.date,
            description: post.data.brief,
            link: `/blog/${post.id}`,
            categories: ["software", "софтварькаст", "блог"],
        })),
        trailingSlash: false,
    });
}
