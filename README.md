# antonioeprado.dev

My personal portfolio.

## Running locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Project structure

```
.
├── .github
│   └── workflows
│       ├── cd.yml
│       └── ci.yml
├── public
│   ├── favicon.ico
│   ├── .htaccess
│   ├── manifest.json
│   ├── robots.txt
│   └── sitemap.xml
├── scripts
│   └── prerender.tsx
├── src
│   ├── components
│   │   ├── icons
│   │   │   ├── FlagBR.tsx
│   │   │   ├── FlagUS.tsx
│   │   │   ├── GitHub.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── index.ts
│   │   │   ├── LinkedIn.tsx
│   │   │   ├── Moon.tsx
│   │   │   └── Sun.tsx
│   │   ├── LanguageSelector.tsx
│   │   ├── Layout.tsx
│   │   ├── SocialButton.tsx
│   │   └── ThemeToggle.tsx
│   ├── config
│   │   ├── site.ts
│   │   └── socials.ts
│   ├── hooks
│   │   ├── useCursorRing.ts
│   │   ├── useDecryptText.ts
│   │   ├── useLocale.ts
│   │   └── useTheme.ts
│   ├── locales
│   │   ├── en-us.json
│   │   └── pt-br.json
│   ├── pages
│   │   ├── 403
│   │   │   └── Forbidden.tsx
│   │   ├── 404
│   │   │   └── NotFound.tsx
│   │   ├── 500
│   │   │   └── ServerError.tsx
│   │   ├── home
│   │   │   └── ComingSoon.tsx
│   │   ├── ErrorPage.test.tsx
│   │   ├── ErrorPage.tsx
│   │   └── errors.ts
│   ├── test
│   │   └── setup.ts
│   ├── types
│   │   └── index.ts
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── env.d.ts
│   ├── error.tsx
│   ├── hydration.test.tsx
│   ├── index.css
│   └── main.tsx
├── eslint.config.js
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── rsbuild.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.scripts.json
└── vitest.config.ts
```
