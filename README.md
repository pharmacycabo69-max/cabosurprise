# Cabo Surprise

Landing pages for cabosurprise.com (Google Ads / Meta Ads). Next.js 15, TypeScript, Tailwind, framer-motion. No backend.

```bash
npm install
cp .env.example .env.local   # tracking IDs
npm run dev
```

## Pages
`/` · `/proposals/` · `/birthday/` · `/bachelorette/` · `/honeymoon/` · `/packages/` · `/privacy/` · `/terms/` (`/legal/` redirects to `/terms/`)

## Where to edit
- Phone, email, Instagram, packages and prices, FAQ, deposit/cancellation numbers: `src/config/site.ts`
- Service landing copy, galleries and WhatsApp messages: `src/config/services.ts`
- Photos: `public/photos/` (see its README)

## Tracking
Set in `.env.local` / Vercel: `NEXT_PUBLIC_GOOGLE_ADS_ID` (AW-…), `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`, `NEXT_PUBLIC_META_PIXEL_ID`.
Events: `whatsapp_click` (+ Meta `Contact` and the Google Ads conversion), `instagram_click`, `package_click`. UTMs are appended to the WhatsApp text.

Google Ads conversion snippet (already wired; this is what it sends):
```js
gtag('event', 'conversion', { send_to: 'AW-XXXXXXXXXX/CONVERSION_LABEL' });
```

## Domain
Canonical host is `https://www.cabosurprise.com`. The app 301-redirects `cabosurprise.com` to `www`; also set the apex-to-www redirect in Vercel Domains.

## Deposits (Stripe Checkout)
`/deposit/` collects name, email, date and package, then `/api/checkout/` creates a Stripe Checkout Session (amount always computed server-side) and redirects to Stripe. `/deposit/success/` confirms the payment and fires Meta `Purchase` and Google `purchase`.
1. Put `STRIPE_SECRET_KEY` in `.env.local` and in Vercel (use `sk_test_…` first; test card 4242 4242 4242 4242).
2. Deposit % and amounts: `policy.depositPercent` in `src/config/site.ts`; custom amount limits in `src/config/payments.ts`.
3. Payments appear in the Stripe dashboard with the service, event date and venue in the metadata.
