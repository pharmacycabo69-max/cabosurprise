# Photos needed

Drop JPG files here with these exact names. Until a file exists, the site shows a warm gradient placeholder.
Recommended: 2000px wide, under 400 KB each (compress with Squoosh/TinyPNG). Real work from Cabo converts best.

## Hero & social
| File | Ratio | What |
|---|---|---|
| `hero.jpg` | 16:9 + mobile crop (subject centered) | Emotional hero: décor reveal, couple walking into a decorated villa, or sunset setup |
| `proposals-hero.jpg` | 16:9 | Proposal moment (arch + ocean/ranch sunset) |
| `og.jpg` | 1200x630 | Share image for home |
| `og-proposals.jpg` | 1200x630 | Share image for /proposals |

## Packages (4:3)
`welcome.jpg`, `birthday.jpg`, `bachelorette.jpg`, `honeymoon.jpg`, `anniversary.jpg`, `mariachi.jpg`

## Where we set up (4:5 portrait)
`venue-villa.jpg`, `venue-hotel.jpg`, `venue-beach.jpg`, `venue-yacht.jpg`, `venue-ranch.jpg`

## Proposals (4:5 portrait)
`proposal-villa.jpg`, `proposal-beach.jpg`, `proposal-ranch.jpg`

## Gallery (1:1 square)
`gallery-1.jpg` through `gallery-8.jpg`: mix of décor, cakes, flowers, mariachi and reactions.

Names and paths are defined in `src/config/site.ts`.

## Status
All slots filled. AI-generated (no real people, decor scenes): honeymoon, mariachi, venue-villa, venue-hotel, venue-beach, venue-yacht, proposal-beach.
Real photos: hero, proposals-hero, og, og-proposals, welcome, birthday, bachelorette, anniversary, venue-ranch, proposal-villa, proposal-ranch, gallery-1..8.
Replace the AI ones with real Cabo Surprise work as it becomes available.

## Per-page folders (replace with your own photos, same file names)
Each service page has a hero and a 4-photo gallery. They currently hold copies of existing photos so no page is empty.
- `birthday/hero.jpg`, `birthday/gallery-1..4.jpg`
- `bachelorette/hero.jpg`, `bachelorette/gallery-1..4.jpg`
- `honeymoon/hero.jpg`, `honeymoon/gallery-1..4.jpg`
- `packages/hero.jpg`, `packages/gallery-1..4.jpg`
- `proposals/gallery-1..4.jpg` (hero is `proposals-hero.jpg`)
- Share images (1200x630): `og-birthday.jpg`, `og-bachelorette.jpg`, `og-honeymoon.jpg`, `og-packages.jpg`
