import LegalPage from "@/components/LegalPage";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy Policy | Cabo Surprise",
  description: "How Cabo Surprise collects, uses and deletes the information you share when planning a surprise in Los Cabos.",
  path: "/privacy/",
  og: "og.jpg",
});

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="October 2026"
      sections={[
        {
          h: "Who we are",
          p: [`Cabo Surprise plans surprises and celebrations in Los Cabos, Mexico. You can reach us on WhatsApp at ${site.phoneDisplay} or at ${site.email}.`],
        },
        {
          h: "What we collect",
          p: [
            "This website has no accounts, forms or checkout. We do not collect information from you directly on the site.",
            "When you message us on WhatsApp we receive your phone number, the name on your profile, and what you tell us: the occasion, date, hotel or villa name, reservation name, guest preferences and any photos or notes you send.",
            "The site also uses the Google tag and the Meta Pixel to measure advertising. They collect standard technical data such as pages viewed, clicks on our WhatsApp, Instagram and package buttons, device and browser type, approximate location and the ad campaign that brought you here (UTM parameters).",
          ],
        },
        {
          h: "How we use it",
          p: [
            "We use your messages only to quote, confirm and deliver your setup, and to follow up about your booking.",
            "We use advertising data to understand which ads and pages work and to show our ads to people who may be interested.",
            "We share the details a supplier needs (florist, chef, photographer, mariachi, hotel or villa staff) so they can do their part. We do not sell your information.",
          ],
        },
        {
          h: "Cookies and third parties",
          p: [
            "Google and Meta may set cookies or similar identifiers through their tags. You can block them in your browser settings or with the ad controls in your Google and Meta accounts. WhatsApp is operated by Meta and has its own privacy policy. The site is hosted on Vercel.",
          ],
        },
        {
          h: "How long we keep it",
          p: ["We keep booking conversations for as long as needed to run your event and handle any follow-up, and delete them when you ask."],
        },
        {
          h: "Access and deletion",
          p: [`To see, correct or delete the information we hold about you, message us on WhatsApp at ${site.phoneDisplay} or write to ${site.email}. We will confirm once it is done.`],
        },
      ]}
    />
  );
}
