import ProductPage from "@/components/ProductPage";
import { products } from "@/config/products";
import { pageMeta } from "@/lib/seo";

const product = products.find((p) => p.slug === "private-beach-horse-photoshoot")!;

export const metadata = pageMeta({
  title: product.metaTitle,
  description: product.metaDescription,
  path: product.path,
  og: product.og,
  keywords: product.keywords,
});

export default function Page() {
  return <ProductPage product={product} />;
}
