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
            "You can start a booking on this site by choosing your date, number of guests and add-ons and paying the deposit, or by messaging us on WhatsApp. The deposit starts your booking: we then confirm availability and your final price, and send you your booking confirmation with the total. Until you receive that confirmation, your booking is a request. Prices on this site are starting prices; the final price depends on date, location, number of guests and the add-ons you choose.",
          ],
        },
        {
          h: "Deposit and payment",
          p: [
            "Prices are published in US dollars. A deposit starts your booking: 40% for the Exclusive Ranch Wedding Reception, and 50% for private experiences and accommodation, calculated on the starting price of the experience you choose. We confirm the final amounts and the balance with you after the deposit.",
            "The balance and the cancellation and refund conditions are set out in the contract for your booking. All services are subject to availability, and packages are customized to your needs. Destination rates may apply and are confirmed in your custom quote.",
            "Where online payment is available, you can pay the deposit by card on our deposit page. Card payments are processed by Stripe in US dollars, and your bank may apply its own currency conversion or foreign transaction fees.",
            "For ranch estimates built with our quote calculator, prices are shown in Mexican pesos and the deposit is charged in US dollars at the exchange rate shown when you pay.",
          ],
        },
        {
          h: "Changes and cancellations",
          p: [
            "Date changes, cancellations and refunds follow the conditions of your contract. Contact us as soon as you know about a change and we will do our best to accommodate it, subject to the availability of the ranch and our suppliers.",
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
