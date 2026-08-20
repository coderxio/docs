# CodeRx Design Guide

Use this guide for CodeRx websites, apps, docs, dashboards, marketing PDFs, social posts, generated images, and sales materials.

CodeRx should feel like a modern, credible healthcare data company: technically sharp, clinically grounded, developer-friendly, and refreshingly plainspoken.

Sources for this guide: the live site at [coderx.io](https://coderx.io/), the docs repo implementation (`src/css/custom.css`, `src/pages/`), [The CodeRx Newsletter](https://coderxio.substack.com/), and the [CodeRx LinkedIn](https://www.linkedin.com/company/coderx/posts/) presence.

---

## Brand essence

**CodeRx = drug data, simplified.**

CodeRx turns messy, fragmented public drug data into clean, analytics-ready data marts for healthcare developers, analysts, researchers, and startups. The brand promise is not “more data”; it is **less wrestling with raw data, more useful answers**.

### Core positioning

- Built by pharmacists who code.
- Designed for developers, analysts, healthcare data teams, and pharmacy researchers.
- Makes complex drug data query-ready without requiring RxNorm expertise.
- Unifies sources like RxNorm, FDA, DailyMed, NADAC, RxClass, and CMS.
- Emphasizes open standard identifiers, transparent data modeling, and practical analytics.
- Provides an affordable, modern alternative to legacy enterprise drug databases.

### Plans and how to talk about them

CodeRx sells two things:

| Plan | What it is | How to position it |
|---|---|---|
| **Open** | Free. A single yearly snapshot of three marts (drugs, packages, classes), limited to actively marketed products and a reduced column set. | An on-ramp and an evaluation tool. Never the product. |
| **Enterprise** | Paid annual subscription. The full database, every mart and column, refreshed weekly on CodeRx AWS S3 for customers to pull. | The product. Everything else exists to lead here. |

Rules for writing about Open:

- Always state the yearly refresh cadence, and always state that it goes stale. `Refreshed once a year, so it starts drifting out of date the day it ships.`
- Never imply Open is sufficient for production work, and never call it a "free tier," "starter plan," or anything that implies a peer relationship with Enterprise.
- Do not sell Open's limitations as features. A yearly refresh is not a benefit; it is the constraint you accept in exchange for it being free.
- Keep the sign-up friction low anyway. Open is the top of the funnel, so it should be easy to get and honestly labeled — those are not in tension.

Rules for writing about Enterprise:

- Lead with weekly refresh, full column coverage, and delivery on CodeRx AWS S3 for customers to pull.
- The conversion action is **Book a Demo**, not a self-serve checkout.

### Taglines (approved)

| Context | Line |
|---|---|
| Primary product | **Drug Data, Simplified** |
| Company / LinkedIn | **Drug data, simplified** |
| Docs / product ethos | **Pharmacists engineering pharmacy** |
| Newsletter / community | **The intersection of pharmacists who code and developers who (health)care.** |

### Personality

CodeRx is:

- **Credible** — clinical correctness and data quality matter.
- **Practical** — usable tables, not abstract terminology theory.
- **Developer-native** — SQL, schemas, pipelines, docs, repeatable workflows.
- **Plainspoken** — avoids vendor fog and empty enterprise language.
- **Witty in moderation** — comfortable with pharmacy/data humor when it does not undercut trust.
- **Generous** — teaches how drug data works, even when that complexity is inconvenient.
- **Founder-led** — sounds like a pharmacist-engineer who has lived the pain, not a faceless vendor.

CodeRx is not:

- Corporate, sterile, or buzzword-heavy.
- Overly playful where buyers need confidence.
- Vague about data provenance, update frequency, or limitations.
- Flashy at the expense of clarity.
- Generic “AI healthcare” SaaS.

---

## Visual identity

### Color palette

Canonical brand colors from the live site and logo:

```css
:root {
  /* Brand */
  --coderx-red: #d52d34;
  --coderx-red-dark: #951f24;
  --coderx-red-darker: #7a191d;
  --coderx-red-light: #ea969a;
  --coderx-yellow: #fbcb41;
  --coderx-yellow-dark: #b08e2e;
  --coderx-yellow-light: #fde5a0;
  --coderx-yellow-lightest: #fef1d0;

  /* Surfaces & text (as used on coderx.io) */
  --coderx-ink: #0a0a0a;
  --coderx-charcoal: #1a1a1a;
  --coderx-slate: #525252;
  --coderx-muted: #737373;
  --coderx-border: #e5e5e5;
  --coderx-border-strong: #d4d4d4;
  --coderx-canvas: #f5f5f5;
  --coderx-paper: #ffffff;
  --coderx-on-dark: #a3a3a3;

  /* Soft accents */
  --coderx-soft-red: #fff0f1;
  --coderx-soft-yellow: #fff4c2;

  /* Occasional tertiary (data visuals only) */
  --coderx-teal: #10b981;
}
```

Dark mode (docs / site) brightens red and yellow for contrast: primary `#ff4757`, secondary `#ffd93d`.

#### These values are live

The block above is not documentation of the code — it *is* the code. It is mirrored verbatim into `:root` in `src/css/custom.css`, and every marketing stylesheet consumes it through tokens. There are no hardcoded hex values in `src/pages/*.module.css`. Change a value here, change the matching token in `custom.css`, and it propagates across every page in both color modes.

The implementation has two layers:

| Layer | Example | Rule |
|---|---|---|
| **Raw palette** | `--coderx-red`, `--coderx-ink`, `--coderx-canvas` | Mirrors the table above. Fixed values; identical in light and dark mode. |
| **Semantic** | `--coderx-surface-page`, `--coderx-text-body`, `--coderx-line` | What components actually use. Flips automatically in dark mode. |

Because the semantic layer flips on its own, a component styled with tokens usually needs **no** `[data-theme='dark']` block. If you find yourself writing one, check whether a semantic token already expresses what you want.

Dark bands are a special case: `--coderx-band-*` tokens describe surfaces that stay dark in *both* modes (they lighten slightly in dark mode so they don't disappear into the page). Text on those bands uses `--coderx-band-text` and `--coderx-band-body`, never `--coderx-text-primary`.

Status colors (`--coderx-positive`, `--coderx-negative`) sit deliberately outside the brand palette so a validation error never competes with red-as-CTA.

#### How to use color

| Color | Role |
|---|---|
| **Red `#d52d34`** | Brand signal: logo accents, italic hero emphasis (“Simplified”), featured borders, final CTAs on dark bands, Cal.com brand color, important highlights |
| **Yellow `#fbcb41`** | Warm secondary: labels, icon accents, Open’s staleness note, diagram fills, changelog / construction motifs, optimistic contrast |
| **Ink `#0a0a0a`** | Primary text, dark section backgrounds, hero primary buttons on light canvases |
| **Canvas `#f5f5f5`** | Default light page background (cool neutral — not cream) |
| **Paper `#ffffff`** | Cards, tables, docs surfaces |
| **Teal `#10b981`** | Optional third series color in multi-series data visuals only (e.g. Ingredients card). Do not promote teal to a core brand color. |

#### Color balance

A good CodeRx composition usually follows:

- 70–80% white / canvas / neutral space
- 10–20% ink text and structure
- 5–10% red accents
- 5–10% yellow accents

**Rhythm on marketing pages:** alternate light canvas sections with full-bleed ink (`#0a0a0a`) bands. On the homepage the ink bands are delivery and the closing CTA, with Open (light) between them. Red is reserved for the italic hero word, featured borders, and the demo CTA on ink.

Avoid:

- Large red backgrounds with long white body copy
- Cream / parchment as the default canvas (the live brand is cool gray + black, not warm paper)
- Neon gradients, purple/indigo SaaS themes, or clinical blue as the dominant color
- Flooding UI with red (reserve it for signal moments)

### Typography

Live marketing pages prioritize system display stacks for clarity and speed:

```css
/* Display / headings */
font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

/* Body */
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ui-sans-serif, system-ui, sans-serif;

/* Data, SQL, NDCs, RXCUIs, filenames */
font-family: "SF Mono", "Roboto Mono", "SFMono-Regular", Consolas, "Liberation Mono", Monaco, monospace;
```

Brand asset libraries may also include **Roboto Bold** — acceptable for PDFs, slides, and environments where system SF fonts are unavailable. Prefer one consistent sans across a single artifact; do not mix decorative serifs.

#### Type style

- Headings: bold, compact, tight letter-spacing (`-0.02em` to `-0.03em`), high clarity
- Body: readable, direct, not over-styled
- Favor documentation readability over glossy marketing typography
- Monospace for SQL, schemas, NDCs, RxCUIs, file formats (`CSV`, `Parquet`)
- Italic + red is reserved for the hero word **Simplified** (and rare parallel emphasis moments)

#### Heading behavior

Headings should communicate value quickly:

Good:

- `Drug Data, Simplified`
- `Query-ready drug data marts`
- `No RxNorm expertise required`
- `Built by pharmacists, designed for analytics`

Avoid:

- `Unlock revolutionary healthcare intelligence`
- `The next generation of medication data transformation`
- `An AI-powered paradigm for life sciences enablement`

### Logo

Assets in this repo (`static/img/`):

- Pill / mark: `logo.svg`, `logo.png`
- Wordmarks: `coderx_text_logo_black.svg`, `coderx_text_logo_white.svg`

The mark is a **capsule / pill with code chevrons** (`<` `>`): yellow half + red half, black outline. It literally encodes “code + Rx.”

#### Logo usage

| Use | Treatment |
|---|---|
| Headers, decks, social banners | Combined mark + wordmark |
| Favicons, avatars, app icons | Pill mark alone |
| Light / canvas backgrounds | Black wordmark + color mark |
| Dark / red / image backgrounds | White wordmark + color mark (or white mark) |
| Web / UI | Prefer SVG |
| Email / social / uncertain SVG support | PNG |

Avoid:

- Recoloring outside approved red / yellow / black / white treatments
- Stretching, rotating, or heavy drop shadows
- Placing the red mark on clashing saturated backgrounds
- Using the pill as a decorative bullet everywhere on one screen

The wordmark’s **x** often carries a prescription-style flourish — preserve it; do not redraw as a plain “x.”

### Geometric accents

The site uses simple geometric glyphs as brand texture (not emoji):

- `◈` `◇` `○` — hero badges (`weekly updates`, `analytics-ready`, `open standards`)
- `◆` — product highlight bullets on dark bands

Prefer these (or similar minimal geometry) over emoji in product UI and formal marketing. Emoji are acceptable sparingly on LinkedIn / Substack when the founder voice is clearly social.

---

## Layout and UI

### Overall feel

CodeRx interfaces should feel like:

- A clean technical documentation site
- A trustworthy healthcare analytics product
- A lightweight developer tool
- A founder-led product with personality, not a faceless enterprise vendor

### Layout principles

- Clear sections, strong headings, generous spacing, concrete examples
- Tables, schema snippets, and real-looking field labels make complexity feel manageable
- Make the transformation obvious: raw XML / government files → unified query-ready marts
- Restrained polish: 12–16px card radius, soft shadows, 1px borders, cool neutrals
- Scanability first — value should be obvious in seconds
- On marketing heroes: brand + one headline + one supporting sentence. No buttons. The next section is the proof visual (SQL + result rows).

### Motion

Ship intentional motion, not noise. Patterns already in product:

- Hover lift on mart and pricing cards
- Expand/collapse for pricing feature rows

Keep easing restrained (`cubic-bezier(0.4, 0, 0.2, 1)`), durations ~0.3–0.6s. Prefer presence and hierarchy over decorative flair.

### Components

#### Buttons

On **light** canvases, primary CTAs are often ink (black), with outline secondary — matching the live homepage hero:

```css
.button-primary-light {
  background: #0a0a0a;
  color: #ffffff;
  border-radius: 4px;
  font-weight: 500;
  padding: 1rem 2rem;
}

.button-secondary-light {
  background: transparent;
  color: #0a0a0a;
  border: 1px solid #d4d4d4;
  border-radius: 4px;
}
```

On **dark** bands and conversion footers, primary CTAs flip to brand red:

```css
.button-primary-dark {
  background: #d52d34;
  color: #ffffff;
  border-radius: 4px;
  font-weight: 500;
}

.button-secondary-dark {
  background: transparent;
  color: #ffffff;
  border: 1px solid #404040;
  border-radius: 4px;
}
```

Pricing featured CTAs may also use red on light when the card is the conversion focus.

Preferred labels:

- `Book a Demo`
- `View Pricing`
- `Explore the data marts`
- `Read the docs`
- `Contact Us`

Avoid vague CTAs (`Learn more`, `Transform now`, `Unlock insights`) when a specific action exists.

#### CTA placement: one action, carried by the navbar

**Book a Demo** is the single conversion action across the site, and it lives as a persistent red button in the navbar (`.navbarDemoButton` in `src/css/custom.css`, wired as an `html` navbar item so the Cal.com embed can find its data attributes).

Because the navbar always carries it:

- **Marketing heroes do not need a button cluster.** The homepage hero is headline, one supporting paragraph, and badges. The query below is the visual. Let the hero teach; the CTA is already on screen.
- **Do not stack competing CTAs.** One page should not offer `Book a Demo`, `View Pricing`, and `Get Open` side by side at equal weight — that is three destinations and no decision.
- **Earn the click at the bottom.** The closing dark band is where the in-page demo CTA belongs, in brand red, with `View Pricing` as the quiet secondary.
- **Open is a text link, not a button.** Its entry points should read as an aside (`Get CodeRx Open free →`), never as a primary control competing with the demo.

#### Cards

Use cards for data sources, data marts, audiences, comparisons, and pricing — not as default decoration for every block.

```css
.card {
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  padding: 2rem;
}
```

Featured cards get a red border or soft red shadow (`rgba(213, 45, 52, 0.12)`). Hover: slight lift (`translateY(-2px)` to `-4px`), never loud glow.

#### Tables and data previews

CodeRx sells trust through structure. Show real-looking columns, SQL, and schema examples whenever possible.

Good motifs:

- Query windows and result rows
- NDC → drug mappings
- Ingredient hierarchies
- Weekly update badges
- Source → schema diagrams
- Before/after: raw vs mart

Keep tables legible. Do not over-decorate them.

#### Badges

Small badges for status and provenance:

- `Weekly refresh` / `weekly updates`
- `SQL-ready` / `analytics-ready`
- `Open standards` / `Open identifiers`
- Source names: `RxNorm`, `FDA NDC`, `DailyMed`, `NADAC`
- Formats: `CSV` / `Parquet`

Yellow soft badge (labels / intros):

```css
.badge-yellow {
  background: #fbcb41;
  color: #0a0a0a;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.4rem 0.8rem;
}
```

Red soft badge (plan popularity, alerts of positive emphasis):

```css
.badge-red {
  background: #d52d34;
  color: #ffffff;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.3rem 0.65rem;
}
```

---

## Imagery and illustration

### Prefer

- Simple diagrams of data flow (sources → pipeline → marts)
- Clean product UI / table screenshots
- SQL examples and schema excerpts
- Minimal pharmacy motifs: pill, capsule, label, package, barcode, bottle silhouette
- Construction / changelog visuals for updates or work-in-progress
- Light meme / comic moments **in newsletter and social** when they clarify a point (Charlie Day, “server pharm,” Advil vials) — caption the joke; never let the joke replace the explanation

### Avoid

- Generic doctor-with-tablet stock photography
- Abstract glowing “AI healthcare brain” visuals
- Overly clinical hospital photography
- Imagery that implies CodeRx stores or sells patient-level PHI (the product is drug reference / analytics data)
- Purple nebula / glassmorphism SaaS wallpaper as the main visual idea

### Generated images

When generating images for CodeRx:

1. Anchor on the **pill + chevron mark**, red/yellow/black/white palette, and cool neutrals.
2. Prefer diagrams, labeled packages, query UIs, and “messy files → clean tables” metaphors.
3. Include the wordmark when the image must stand alone as brand.
4. Avoid putting lots of tiny text in the image; put precise claims in surrounding copy.
5. For social: one clear idea per image. For PDFs: leave margins, keep tables crisp, use red sparingly for section rules and CTAs.

---

## Voice and tone

CodeRx voice shifts slightly by channel, but the speaker is always the same: a pharmacist who codes, explaining hard things plainly.

### Channel dial

| Channel | Dial | Notes |
|---|---|---|
| **Website / pricing** | Polished, confident, concise | Problem → product → proof. Short paragraphs. Concrete claims. |
| **Docs / tutorials** | Precise, practical, caveat-aware | Lead with the answer and schema. Explain edge cases after the example. |
| **Substack** | Educational founder essay | Deep dives, narrative, occasional puns in titles, teach the messy middle. |
| **LinkedIn** | Conversational + punchy | Specific numbers, industry absurdity named plainly, soft CTAs, light emoji OK. |
| **Blog (on-site)** | Same as Substack | Often mirrors newsletter posts. |

### Voice attributes

#### 1. Clinically grounded

Sound like you understand pharmacy and drug data quality. Use real terms:

`drug products`, `active and inactive ingredients`, `NDC-to-drug mappings`, `dose forms and strengths`, `brand-to-generic`, `semantic drug concepts`, `pricing history`, `classification systems`, `RXCUI`, `excipients`

Do not pretend drug data is simple. The point is that CodeRx makes it **usable**.

#### 2. Developer-friendly

Prefer concrete technical language: `SQL`, `data marts`, `CSV`, `Parquet`, `schema`, `weekly refresh`, `pre-joined tables`, `S3`, `open standard identifiers`.

Include snippets when useful:

```sql
SELECT ndc, drug_name, ingredient_name, nadac_per_unit
FROM packages
WHERE ingredient_name = 'metformin';
```

#### 3. Plainspoken and specific

Good:

> Raw drug data is public, but it is not easy to use.

Bad:

> Public medication intelligence ecosystems require next-generation transformation enablement.

#### 4. Lightly witty, never unserious

Newsletter and social can play:

- `Open does not mean easy when it comes to drug data.`
- `Last Christmas, I gave you my marts.`
- `Try before you don’t buy.`
- `Asking for a friend…`
- `PDFs as a way to share data should be as dead as pagers.`
- `server pharm` (clearly marked as a joke)

Keep jokes out of accuracy, coverage, security, and pricing reassurance moments.

#### 5. Opinionated about broken defaults

A signature CodeRx move: name healthcare data absurdity with receipts, then show the fix.

Examples from LinkedIn / Substack:

- Open ≠ easy (zip-of-zips XML, RRF tables, inconsistent NADAC filenames)
- Proprietary identifiers vs open standards (GCN / GPI vs RxNorm) with **specific match rates**
- “Idiot index” pricing critique grounded in free public sources
- DEA CSCN published **only** as PDF — then CodeRx turns it into a pipeline

Be sharp, not cruel. Punch up at systems and vendor lock-in, not at practitioners stuck with them.

### Copywriting rules

#### Prefer concrete claims

Use: `Weekly updates`, `Six integrated public data sources`, `Fourteen data marts`, `Pre-joined tables`, `No XML parsing`, `Built by pharmacists`, `Open standard identifiers`, `CSV and Parquet delivery`, `Open / Enterprise`

Avoid: `Best-in-class`, `Revolutionary`, `World-class`, `Seamless end-to-end`, `AI-powered` (unless an actual AI feature is shipping)

Never ship a number without a source. A stat that cannot be traced to the product or a public data source (`95% cost savings`) does more damage to credibility than leaving the slot empty.

#### Make the pain vivid

Name the pain buyers already feel:

- Parsing XML / nested zip files
- Joining inconsistent identifiers
- Learning RxNorm SABs, TTYs, and hierarchies
- Mapping NDCs to clinical drugs
- Tracking marketing status and package changes
- Handling price history and pack size
- Reconciling labels, ingredients, and classifications

#### Show the transformation

Pattern:

> Instead of `[painful raw-data task]`, CodeRx gives you `[ready-to-use outcome]`.

#### Keep paragraphs short

Marketing: 1–3 sentence paragraphs, bullets over dense prose, one idea per section.

Docs: practical answer first, caveats after, source and refresh assumptions explicit.

### Example copy blocks

**Hero (website)**

No CTA cluster — `Book a Demo` is persistent in the navbar.

```md
# Drug Data, Simplified

CodeRx makes open drug data easy to use, at a fraction of the cost of
proprietary drug databases.

◈ weekly updates   ◇ analytics-ready   ○ open standards
```

**CodeRx Open (positioning an on-ramp)**

On the homepage, Open is a quiet on-ramp. Do not sell the plan split here — no “Enterprise” badge, no “the rest of the database,” no “weekly updates come with Enterprise.” Pricing is where Open vs Enterprise is compared.

```md
## Start with CodeRx Open

CodeRx Open is a once-a-year snapshot of three marts, filtered to actively
marketed products. Enough to prototype against a real schema and see how
the data is modeled.

Get CodeRx Open free →
```

**Newsletter / Substack**

```md
## Open does not mean easy

Most of the raw ingredients for a useful drug database are public. That does not
mean they are clean, joined, documented, or ready for analytics. CodeRx exists
for the messy middle between “download the file” and “answer the question.”
```

**LinkedIn (punchy proof)**

```md
99.3% — that's how consistently CodeRx's RxNorm-based Clinical Drug IDs matched
a client's GCN identifiers across every NDC in their wholesaler data.

Open data doesn't mean lower quality. We think it's the better foundation to build on.
```

**Product one-liner (About / LinkedIn)**

```md
CodeRx maintains a comprehensive, analytics-ready drug database that unifies
data from RxNorm, FDA NDC, DailyMed, NADAC, and more into clean, queryable data
marts. Built by pharmacists who understand the complexities of drug data,
designed for developers and analysts who need reliable information without the overhead.
```

---

## Audience framing

### Healthcare data analysts

Emphasize actionable insights, SQL-ready tables, less RxNorm complexity, claims/medication analytics.

> Turn complex drug data into actionable insights. No RxNorm expertise required—just query and analyze.

### Health tech startups

Emphasize enterprise-grade data at startup-friendly cost, no lock-in, fast implementation, clean schemas.

> Get enterprise-grade drug data at a fraction of the cost—no vendor lock-in, no complex contracts, just clean data that works.

### Healthcare developers

Emphasize faster medication features, reliable identifiers, fewer edge-case bugs.

> Build medication features faster with reliable, well-structured data. Query-ready tables mean less code, fewer bugs.

### Pharmacy researchers

Emphasize less file wrangling, more research time, transparent source mapping.

> Stop wrestling with raw government files. Spend your time on insights, not parsing XML and learning RxNorm hierarchies.

---

## Recommended page structure

The homepage is the product page. There is no separate `/product` — that route
redirects to `/`. The pitch is eight sections, in this order:

1. **Hero** — headline, one problem paragraph, badges. No buttons.
2. **Query proof** — a real SQL snippet against the real schema, paired with a result table
3. **Data marts** — six featured marts with docs links
4. **Open drug data is valuable — if you know how to use it** — ink band leading into purpose-built marts: largely public sources, transformed into easy-to-use marts (or unavailable without validated refresh work); hub diagram with the white CodeRx wordmark and yellow lines to six source cards (wordmark at the bottom on mobile); CodeRx coordinates it and keeps building
5. **Purpose-built data marts for pharmacy** — own paper band: four operational groups (label, pricing, packaging, e-prescribing). Product story, not a plan split — no Enterprise badge, no “the rest of the database.”
6. **How it's delivered** — ink band: weekly refresh, CodeRx AWS S3, documented columns, built by pharmacists
7. **CodeRx Open** — a quiet on-ramp. Name the yearly snapshot and that it goes stale. Do not contrast it with Enterprise on this page.
8. **CTA** — Book a Demo in brand red on ink, View Pricing secondary

Supporting pages:

| Route | Job |
|---|---|
| `/pricing` | Open vs Enterprise comparison table. The honest, detailed answer. |
| `/open` | Lead capture. Hero, then the form immediately, then supporting detail. |
| `/contact-us` | Non-demo enquiries. |

Section rhythm alternates light canvas and ink bands. Two ink bands should not sit adjacent.

---

## Medium-specific guidance

### Websites & web apps

- Follow the live cool-neutral + ink band system
- Primary conversion action: **Book a Demo** (Cal.com brand color `#d52d34`)
- Show real field labels (`NDC`, `RXCUI`, `NADAC`) in UI chrome
- Docs should stay denser and more tabular than marketing pages

### Marketing PDFs / one-pagers

- White / canvas background, red rules or yellow callout boxes
- One idea per page; put schema or comparison tables on the page, not decorative stock
- Include logo, one proof point, one CTA URL (`coderx.io`)
- Avoid multi-column newspaper layouts and purple gradient covers

### Generated / social images

- Pill mark + short claim + optional red accent word
- High contrast; readable at phone width
- LinkedIn: can be more narrative; image should still stand alone without tiny paragraphs

### Product UI inside apps

- Prefer paper surfaces, ink text, red for primary destructive-safe brand actions only when meaning is clear
- Yellow for warnings / “in progress” / tips — not errors
- Errors should use a distinct system red if brand red is already primary CTA (label clearly)
- Dense data: monospace IDs, sticky headers, quiet borders

---

## Do / do not

### Do

- Lead with clarity and usefulness
- Use red and yellow as distinctive but restrained accents
- Show tables, schemas, SQL, and source mappings
- Explain where data comes from and how often it refreshes
- Respect the complexity of drug data
- Use pharmacist / developer credibility
- Write like a human founder who knows the problem deeply
- Alternate light and dark bands for marketing rhythm

### Do not

- Default to cream + terracotta “AI brochure” looks, or purple SaaS gradients
- Overuse generic healthcare stock visuals
- Sound like a legacy enterprise vendor
- Make claims without product specifics
- Use AI buzzwords unless directly relevant
- Let puns undercut trust in buyer-critical moments
- Hide complexity behind vague phrases
- Imply patient data custody the product does not have

---

## Quick checklist

Before publishing CodeRx design or copy, verify:

- [ ] Uses CodeRx red `#d52d34` and yellow `#fbcb41` intentionally?
- [ ] Feels credible for healthcare data buyers?
- [ ] Explains practical value in concrete terms?
- [ ] Avoids generic enterprise and AI buzzwords?
- [ ] Makes raw-data complexity visible without making the product feel hard?
- [ ] Includes developer-friendly artifacts where useful (SQL, schemas, marts, sources)?
- [ ] Preserves the founder-led, pharmacist-who-codes voice?
- [ ] Is any humor subtle enough that it does not reduce trust?
- [ ] For visuals: cool neutrals + ink bands, not cream/purple defaults?
- [ ] For standalone images/PDFs: logo treatment correct for the background?
- [ ] Colors via tokens, with no hex literals added to page stylesheets?
- [ ] Exactly one primary action on the page, with Open kept subordinate to it?
- [ ] Every stat traceable to the product or a public source?
- [ ] Open described with its refresh cadence and its staleness, both?

---

## File location

This guide lives at the root of the CodeRx docs / website repository (`docs/DESIGN.md`) so product, marketing, and content work share one source of truth. Implementation references:

- Design tokens and shared components: `src/css/custom.css`
- Homepage (the full product pitch): `src/pages/index.tsx`, `src/pages/index.module.css`
- Plans data, shared by pricing and comparison copy: `src/data/plans.ts`
- Other marketing pages: `src/pages/pricing.*`, `src/pages/open.*`, `src/pages/contact-us.*`
- Navbar, footer, and redirects: `docusaurus.config.ts`
- Cal.com embed bootstrap: `src/clientModules/cal.ts`
- Logos: `static/img/`

When changing anything visual, change it in `custom.css` rather than in a page stylesheet. A hex literal in a `*.module.css` file is a color that can never be rebranded.