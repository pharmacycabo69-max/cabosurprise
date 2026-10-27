import LegalPage from "@/components/LegalPage";
import { policy, site } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Terms & Conditions | Cabo Surprise",
  description: "Booking, deposit, date changes, cancellation and weather terms for Cabo Surprise setups in Los Cabos.",
  path: "/terms/",
  og: "og.jpg",
});

export default function Page() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="October 2026"
      sections={[
        {
          h: "Bookings",
          p: [
            "All bookings are made by WhatsApp. We send you options and a price in US dollars, and your date is held once you confirm and pay the deposit. Prices on this site are starting prices; the final quote depends on date, location, number of guests and the add-ons you choose.",
          ],
        },
        {
          h: "Deposit and payment",
          p: [
            `A ${policy.depositPercent}% deposit secures your date. The balance is due before the setup. We confirm the amounts and accepted payment methods with you on WhatsApp.`,
          ],
        },
        {
          h: "Changing your date",
          p: [
            `You can move your date free of charge with at least ${policy.freeChangeDays} days' notice, subject to our availability and that of the suppliers involved. Later changes may carry extra costs.`,
          ],
        },
        {
          h: "Cancellations and refunds",
          p: [
            `If you cancel more than ${policy.fullRefundDays} days before the event, we refund your deposit. Between ${policy.freeChangeDays} and ${policy.fullRefundDays} days before, the deposit is credited to a new date within 12 months. Within ${policy.freeChangeDays} days, or once flowers, cakes and other custom items have been ordered, the deposit is not refundable. Refunds are returned by the original payment method.`,
          ],
        },
        {
          h: "Weather at the beach",
          p: [
            "Beach setups depend on wind, tide and weather. If conditions are unsafe or the setup cannot be held, we will offer a covered or alternate location, a different time the same day, or a new date at no extra charge. If none of those works for you, we refund the part of your payment for services not yet delivered.",
          ],
        },
        {
          h: "Hotels, villas and venues",
          p: [
            "We coordinate access with your hotel, villa or venue, and you agree to share the reservation name, check-in time and any access details we need. Some properties require approval, a delivery window or a fee, and some do not allow open flames or balloons. We will tell you what applies, and we may adapt the setup to follow the property's rules.",
          ],
        },
        {
          h: "Suppliers and add-ons",
          p: [
            "Photographers, chefs, mariachi, bartenders, massage therapists, entertainers and other add-ons are provided by independent suppliers we coordinate. Flowers, cakes and decor may vary slightly from photos according to seasonal availability.",
          ],
        },
        {
          h: "Contact",
          p: [`Questions about these terms? Message us on WhatsApp at ${site.phoneDisplay} or write to ${site.email}.`],
        },
      ]}
    />
  );
}
