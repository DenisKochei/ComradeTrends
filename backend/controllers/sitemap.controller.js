import Post from "../models/post.model.js";

export const  siteMap = async (req, res) => {
  try {
    const posts = await Post.find({}, "slug updatedAt").lean();

    const baseUrl = "https://comradetrends.com";

    const urls = posts.map(
      (post) => `
    <url>
    <loc>${baseUrl}/post/${post.slug}</loc>
    <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    </url>`
    );

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${baseUrl}/</loc>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
    ${urls.join("\n")}
    </urlset>`;

    res.header("Content-Type", "application/xml");
    res.status(200).send(sitemap);
  } catch (err) {
    console.error("Error generating sitemap:", err);
    res.status(500).send("Sitemap generation failed");
  }
};