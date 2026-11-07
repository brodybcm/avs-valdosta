# Audio, Video & Security, Inc. (AVS, Inc.) — Valdosta, GA
### Modern Website Replacement & Technical Audit (`avsinc.us`)

A complete, mobile-first, high-converting website replacement for **Audio, Video & Security, Inc. (AVS)** at `1619 Baytree Rd., Valdosta, GA 31602` (`(229) 244-0200`), owned and operated by **Mike Sheffield, Cris Sheffield, and Steve Boyd** since 2008.

---

## Key Upgrades Over the Legacy 2014 WordPress Site (`http://avsinc.us/`)

1. **Restored All 16 Broken Homepage Images & Full-Resolution Photography:**
   - The legacy homepage pointed all 3 hero slider images, all 4 service category cards, and all 9 brand partner logos to a dead cPanel staging IP (`http://72.249.166.137/~avssys/...`), causing connection timeouts and broken images across the page.
   - All original high-resolution photos and brand assets were recovered from `/wp-content/uploads/2014/01/` and stored locally in [`assets/images/`](./assets/images).
2. **Replaced the Broken `404` Vimeo Embed with an Interactive Smart Scene Simulator:**
   - Allows prospective residential and commercial clients to test 8 real-world automation and security scenes (*"Goodnight" Scene*, *30% Midnight Path*, *Home Theater Premiere*, *"Panic" Deterrence*, *Morning Welcome Scene*, *One-Button Facility Close*, *One-Touch Boardroom*, and *Weekend Activity Alert*).
3. **Eliminated Legacy Tech Debt & Security Warnings:**
   - Replaces end-of-life `PHP 5.4.45` and `WordPress 4.3.33` (2015) with clean, semantic HTML5, modern CSS Grid/Flexbox, and zero-dependency JavaScript.
   - Fixes the WCAG accessibility violation (`user-scalable=no`), duplicate `<title>` tags, Latin *Lorem Ipsum* URLs, and broken outbound partner links (`RS2`, `Marantz`, `Epson`).
4. **Built-In Local SEO & Conversion Architecture:**
   - Includes `HomeAndConstructionBusiness` JSON-LD structured data for Valdosta & South Georgia, tap-to-call `tel:+12292440200` CTAs, interactive **2 Months Free Monitoring** voucher claim forms, and an embedded Google Map for `1619 Baytree Rd., Valdosta, GA 31602`.

---

## Project Structure

- [`index.html`](./index.html) — Homepage with Hero Showcase, Live Smart Scene Simulator, 8-Card Solutions Grid, 2 Months Free Monitoring Configurator, Fleet Spotlight, and 9-Brand Authorized Partner Grid
- [`residential.html`](./residential.html) — Residential Security & 24/7 Monitoring, Video Surveillance, Control4 Home Automation, Smart Lighting, Home Audio/Theater, and Structured Wiring
- [`commercial.html`](./commercial.html) — Commercial Video Surveillance, Managed Access Control, Commercial Intrusion, Cellular Fire Alarm (FACP) Upgrades, Commercial Automation, Business Phone Systems (Allworx/VoIP), and Automated Conference Rooms
- [`about.html`](./about.html) — Company story (founded 2008 by Mike Sheffield, Cris Sheffield & Steve Boyd), Valdosta fleet spotlight, and regional coverage
- [`contact.html`](./contact.html) — Valdosta office details, Google Map embed, General Consultation Form, and 2 Months Free Monitoring Claim Form
- [`AUDIT.md`](./AUDIT.md) — Full technical, UX, security, and SEO audit of the legacy `http://avsinc.us/` website
- [`server.js`](./server.js) — Zero-dependency Node.js preview server with automatic `301` redirects from legacy WordPress URLs

---

## Running Locally

```bash
node server.js
```

Then open **`http://localhost:3000/`** in your browser (or open `index.html` directly).
