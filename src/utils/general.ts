export const mapPosts = (posts) => {
    return posts.map(p => ({
        url: p.url,
        ...p.frontmatter
    })).sort(
        (a, b) =>
        new Date(b.pubDate).valueOf() -
        new Date(a.pubDate).valueOf()
    ); 
}
