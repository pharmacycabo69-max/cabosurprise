import WellnessPageView from "@/components/WellnessPageView";
import { wellnessPages } from "@/config/wellness";
import { pageMeta } from "@/lib/seo";

const s = wellnessPages["consultations"];

export const metadata = pageMeta({
  title: s.metaTitle,
  description: s.metaDescription,
  path: s.path,
  og: s.og,
  keywords: s.keywords,
});

export default function Page() {
  return <WellnessPageView s={s} />;
}
