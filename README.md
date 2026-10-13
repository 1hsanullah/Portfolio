# Ihsanullah Sadiq | Portfolio

Personal portfolio of a London-based software engineer, designed as an "engineering terminal meets editorial" site: big Swiss-style type, a live ASCII render engine, and a shell you can actually type into.

[View live website](https://portfolio-alpha-lime-62.vercel.app/)

## Highlights

- **Boot sequence**: a terminal-style preloader that counts to 100% and wipes away (once per visit; skipped for reduced-motion users).
- **Crosshair cursor**: a blend-mode cursor with a live coordinate readout that grows into labels (`Open ↗`, `Drag`, `Decode`, `Copy`) over interactive elements.
- **ASCII torus**: a real-time port of `donut.c` drawn to canvas in the hero. Move the mouse to tilt it, drag to spin it.
- **Scatter portrait**: a small ASCII portrait whose characters scatter away from the cursor and spring back.
- **Selected work**: seven featured projects, public and private. Hovering one opens a floating terminal that types a short session for that repo; private repos answer `fatal: repository is private`. Smaller and older work lives in an `ls ~/archive` list below.
- **`git log` experience**: roles rendered as commits on a branch graph, each expandable.
- **Interactive shell**: `help`, `projects`, `neofetch`, `cat about.txt`, `goto contact`, `theme`… and a few hidden ones (try `sudo hire-me`).
- **Motion everywhere, politely**: Lenis smooth scrolling, masked text reveals, scroll-linked word highlighting, a scroll-velocity marquee, magnetic buttons, text scrambles. All of it respects `prefers-reduced-motion`.
- **Dark / light themes**, persisted per visitor, and fully responsive down to small phones.

## Stack

React 18 · Vite · Framer Motion · Lenis · EmailJS · Geist, Geist Mono & Instrument Serif (self-hosted via Fontsource). Plain CSS with design tokens and no UI framework.

## Editing content

Everything the site says lives in [`src/data/content.js`](src/data/content.js): profile, about copy, stats, featured projects, the archive, experience, education, skills and certifications.

- **Résumé:** drop a PDF into `public/` and set `profile.resume` to e.g. `'/resume.pdf'` and a download link appears in the contact section.
- **Projects:** set `visibility` to `'public'` and add a `url` to link a project; private projects show their description only. `tree` and `commits` feed the hover terminal.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run lint
```

## Deployment

Deployed on Vercel; every push to `main` triggers a new deployment.

## Author

**Ihsanullah Sadiq** · [LinkedIn](https://www.linkedin.com/in/ihsanullah-sadiq-624a5b201/) · [GitHub](https://github.com/1hsanullah)
