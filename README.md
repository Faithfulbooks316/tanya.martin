# Crystal Clear Cleaners — Tanya Martin

Static two-page site for Crystal Clear Cleaners.

**Live URL (after Pages is enabled):** https://faithfulbooks316.github.io/tanya.martin/

Correct Pages path is `/tanya.martin/`, not `/repo/tanya.martin/`.

## Stack

Semantic HTML, `assets/css/styles.css`, `assets/js/main.js`. No framework. No build step.

## Enable GitHub Pages

1. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Push to `main`. The workflow `.github/workflows/pages.yml` deploys the repo root.
3. First run may ask you to approve the `github-pages` environment.

## Edit the facts

| Item | Where |
|---|---|
| Phone last digit | Search `TODO-PHONE` and `+14013044738X` |
| Email | `tanyaamartin1@gmail.com` |
| Service area | Footer and JSON-LD on `index.html` |
| Testimonials | `index.html` — keep the DRAFT comment until written approval |
| Form inbox | Replace `FORM_ID` in the form action |

## First-month residential offer

Rhode Island 2026 consumer average for a standard house clean is about **$201 per visit**.

This site prices a first-time residential monthly start at **25% of that figure ≈ $50** for month one only. Confirm with Tanya before running ads.

Commercial estimator uses 2026 planning rates:

- Office $0.088–$0.107 / sq ft / visit
- Retail $0.09–$0.11
- Medical $0.15–$0.185
- Warehouse $0.052–$0.065

## Named accounts

Jan Companies has operated nearly 100 Burger King restaurants over time. Rhode Island has about 25–27 BK locations. Do not publish “120 current stores” unless Tanya documents it.

Newport Creamery: 8 locations in 2026 (6 RI, 2 MA).

Vanguard: used as a professional referral name matching the draft quote. No invented property list.

Newport interiors are schematic studies, not photos of The Breakers or other museums.

## Swap in real drone photos

Drop files next to the SVGs:

`assets/img/portfolio/01.webp` and `01.jpg` at 1600×1200.

`<picture>` already looks for the webp source first.

## Custom domain

1. Add a `CNAME` file in the repo root with the domain, one line, no `https://`.
2. Point DNS: `CNAME` record to `faithfulbooks316.github.io`.
3. Wait for TLS in Pages settings.

## TODO checklist

- [ ] Last phone digit
- [ ] Formspree `FORM_ID`
- [ ] Written approval of Vanguard and Solid Surface Care quotes
- [ ] Names and titles in figcaptions
- [ ] Confirm service list
- [ ] Confirm Jan / Creamery / Vanguard / mansion accounts
- [ ] Approve $50 first-month offer
- [ ] Real drone photos
- [ ] Export `og-image.svg` to `og-image.png` at 1200×630 if a platform rejects SVG
- [ ] Pages source set to GitHub Actions

## Local preview

Open `index.html` in a browser, or from this folder:

```bash
python3 -m http.server 8080
```
