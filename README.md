# Cabo Surprise

Landing for cabosurprise.com. Next.js 15, TypeScript, Tailwind, framer-motion. No backend.

```bash
npm install
cp .env.example .env.local   # add Meta Pixel / Google Ads IDs
npm run dev
```

- Phone, prices, packages and copy: `src/config/site.ts` (**replace the placeholder WhatsApp number**)
- Photos: `public/photos/` (see its README)
- Tracking: every WhatsApp click fires Meta `Contact` + Google Ads conversion/event, and appends session UTMs to the prefilled message (`src/lib/whatsapp.ts`)
- Deploy: import in Vercel and set the `.env.example` variables
