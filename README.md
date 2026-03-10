# Resume Build

## Recommended (single command)
```bash
npm run export:resume
```

## What it runs
```bash
npx resumed render resume.json --theme jsonresume-theme-macchiato --output resume.html
python -m weasyprint resume.html resume.pdf
```
### Notes
Left column determines the first page, summary/experience and about-languages must have enough data to only fill 1 page, no more.
