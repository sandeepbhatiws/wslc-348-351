import axios from 'axios';

export async function GET() {
  const baseUrl = 'https://acme.com';

  // Fetch dynamic product URLs from API
  let productRoutes = [];
  try {
    const response = await axios.get('https://wscubetech.co/ecommerce-api/products.php', {
      params: { limit: 10 },
    });
    productRoutes = response.data.data.map((product) => `/product-details/${product.id}`);
  } catch (error) {
    console.error('Error fetching product data:', error);
  }

  // Define static routes
  const staticRoutes = ['/', '/about', '/blog'];

  // Combine all routes
  const allRoutes = [...staticRoutes, ...productRoutes];

  // Generate XML format
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allRoutes
      .map(
        (route) => `
      <url>
        <loc>${baseUrl}${route}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>`
      )
      .join('')}
  </urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
