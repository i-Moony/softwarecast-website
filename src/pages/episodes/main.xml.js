import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
    const episodes = await getCollection("episodes");
    const sorted = episodes.sort(
        (a, b) => b.data.episode_number - a.data.episode_number,
    );
    return rss({
        title: "Эпизоды - СофтварьКаст",
        description: "Здесь собраны все обновления, связанные с сайтом.",
        site: context.site,
        xmlns: {
            media: "http://search.yahoo.com/mrss/",
        },
        items: sorted.map((episode) => ({
            title: episode.data.title,
            pubDate: episode.data.release_date,
            description: episode.data.description,
            link: `/episode/${episode.id}`,
            categories: ["software", "софтварькаст", "эпизод", "подкаст"],
            customData: `<media:content
                type="image/${episode.data.preview.format}"
                width="${episode.data.preview.width}"
                height="${episode.data.preview.height}"
                medium="image"
                url="${context.site + episode.data.preview.src}" />
            `,
        })),
        trailingSlash: false,
    });
}
