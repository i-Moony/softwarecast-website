export default function extractTagsFromTitle(title: string): string {
    return title
        .replaceAll(",", "")
        .replaceAll(".", "")
        .replaceAll("?", "")
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll("!", "")
        .replaceAll("/", "")
        .replaceAll(":", "")
        .replaceAll(";", "")
        .replace(/\s\s+/gu, " ")
        .split(" ")
        .join(", ")
        .trim()
        .toLowerCase();
}
