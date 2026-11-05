# City Church Project

A one-page website for City Church Project, a nonprofit equipping churches and ministries to transform cities together.

Tagline: **One Body. One Mission. One Kingdom.**

## Structure

```
index.html            # The whole one-page site
css/styles.css        # Design system (gold #E9A664 from the logo, cream, navy)
js/main.js            # Nav, scrollspy, What We Do tabs, reveal, forms
assets/
  logo-full-cream.png # Full logo, as used in the hero
  logo-mark-cream.png # Logo mark, as used in the header/footer
  jamie-lindsay.jpg   # Founder photo
```

No build step. No framework. Open `index.html` locally, or deploy the repo as-is.

## Deploy

- **GitHub Pages:** Repo Settings → Pages → Deploy from a branch → `main` / `/ (root)`. The site is live at `https://<owner>.github.io/city-church-project/`.
- **Vercel / Netlify / Cloudflare Pages:** import this repo, no build command, publish directory is the repo root.

## Forms

The site has three calls to action, all in `index.html` with handling in `js/main.js`:

- **Book a Call** — name, email, church/ministry, topic, notes
- **Sign Up to Partner** — name, email, interest, city
- **Newsletter** — first name + email, at the bottom of the page

They are prepared, not yet live. In `js/main.js`, set `FORM_ENDPOINTS` (`call`, `signup`, `newsletter`) to real endpoints — Formspree / Netlify Forms for call + signup, ConvertKit / Mailchimp / Buttondown / Resend for the newsletter — then test one submission of each. Until then, submitting shows plainly that the form isn't connected yet and nothing is sent.

## Still needed before public launch

- Podcast URL (the Connect card currently says "Coming soon")
- Newsletter provider + list, and form endpoints (above)
- Contact email / phone / location (none in the source document)
- Fiscal-sponsorship terms, eligibility, and application steps (not in the source — deliberately not stated on the page yet)
- Nonprofit legal name, EIN, and 501(c)(3) wording, if a Give button is ever added (no donation platform is named in the source, so none is published)
- Domain, if you want one instead of the GitHub Pages address

## Source

Content — mission, vision, the four What We Do pillars (Fiscal Sponsorship, Shared Kingdom Purpose, Supportive Services, Biblical Teaching), and founder Jamie Lindsay's bio — comes from the Website Content document provided for this project. Gold `#E9A664` is sampled from the logo itself.
