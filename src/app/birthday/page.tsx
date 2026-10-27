import ServicePage from "@/components/ServicePage";
import { services } from "@/config/services";
import { pageMeta } from "@/lib/seo";

const s = services.birthday;

export const metadata = pageMeta({
  title: s.metaTitle,
  description: s.metaDescription,
  path: s.path,
  og: s.og,
  keywords: s.keywords,
});

export default function Page() {
  return <ServicePage s={s} />;
}
