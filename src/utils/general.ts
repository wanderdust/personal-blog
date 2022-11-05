export const mapPosts = (posts) => {
    console.log(posts[0].frontmatter)
    return posts.map(p => ({
        url: p.url,
        ...p.frontmatter
    })).sort(
        (a, b) =>
        new Date(b.frontmatter.pubDate).valueOf() -
        new Date(a.frontmatter.pubDate).valueOf()
    ); 
}
