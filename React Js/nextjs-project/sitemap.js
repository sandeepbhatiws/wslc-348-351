import axios from "axios";
import { toast } from "react-toastify";

const staticUrls = [
  {
    url: "http://localhost:3000",
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 1,
  },
  {
    url: "http://localhost:3000/about-us",
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: "http://localhost:3000/catalog",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  },
  {
    url: "http://localhost:3000/cart",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  },
  {
    url: "http://localhost:3000/change-password",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  },
  {
    url: "http://localhost:3000/checkout-address",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  },
  {
    url: "http://localhost:3000/checkout-confirmation",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  },
  {
    url: "http://localhost:3000/checkout-delivery",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  },
  {
    url: "http://localhost:3000/checkout-payment",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  },
  {
    url: "http://localhost:3000/checkout-review",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  },
  {
    url: "http://localhost:3000/contact-us",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  },
  {
    url: "http://localhost:3000/login",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  },
  {
    url: "http://localhost:3000/manage-address",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  },
  {
    url: "http://localhost:3000/order-history",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  },
  {
    url: "http://localhost:3000/order-overview",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  },
  {
    url: "http://localhost:3000/payment-methods",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  },
  {
    url: "http://localhost:3000/profile",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  },
  {
    url: "http://localhost:3000/profile-information",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  },
  {
    url: "http://localhost:3000/register",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  },
  {
    url: "http://localhost:3000/wishlist",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  },
];

export default async function sitemap() {
  try {
    const productsResponse = await axios.get(
      "https://wscubetech.co/ecommerce-api/products.php"
    );

    const products = productsResponse.data.data;
    const productUrls = products.map((product) => ({
      url: `http://localhost:3000/product-overview/${product.category_slug}/${product.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticUrls, ...productUrls];
  } catch (error) {
    toast.error(error);
  }
}
