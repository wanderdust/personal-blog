export const mapPosts = (posts) => {
    return posts.map(p => ({
        url: p.url,
        ...p.frontmatter
    })).sort(
        (a, b) =>
        new Date(b.frontmatter.pubDate).valueOf() -
        new Date(a.frontmatter.pubDate).valueOf()
    ); 
}
