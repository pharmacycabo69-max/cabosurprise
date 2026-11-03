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

## Ranch quote calculator (`/quote/`)
Pricing, fee (4%) and deposit (40%) live in `src/lib/quote.ts`. The deposit is charged in USD at `MXN_PER_USD` (set it in Vercel; without it the page still quotes in pesos and hides the Pay button). `/api/venue-checkout/` recomputes the quote server-side.

### Stripe webhook
In Stripe > Developers > Webhooks add the endpoint `https://www.cabosurprise.com/api/stripe/webhook/` (use `www` and keep the trailing slash: Stripe does not follow redirects) with events `checkout.session.completed`, `checkout.session.async_payment_succeeded` and `checkout.session.async_payment_failed`. Put its signing secret in `STRIPE_WEBHOOK_SECRET`. Paid deposits are logged by `onDepositPaid` in `src/lib/deposits.ts`; add email/WhatsApp/CRM notifications there.

### Email (Resend)
When Stripe confirms a deposit, `onDepositPaid` (`src/lib/deposits.ts`) emails you (`NOTIFY_EMAIL`) and the customer. Set `RESEND_API_KEY`, `EMAIL_FROM` (an address on a domain verified in Resend) and `NOTIFY_EMAIL` in Vercel. Without `RESEND_API_KEY` emails are skipped and only logged.
