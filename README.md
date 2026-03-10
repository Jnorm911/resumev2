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
