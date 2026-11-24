# SA Government RFQ Margin Calculator

A standalone browser calculator for estimating landed costs, bid pricing, margin, and SBD 3.1 figures for South African government RFQs.

## Run locally

Open `index.html` in a modern browser. No build step or server is required.

## Deploy

This is a static site. Vercel can serve the repository root directly with no build command and no output directory. On its first visit while online, the app installs a service worker that caches the planner shell and Tailwind CSS for offline use. The offline cache requires HTTPS (or localhost during development); open the app online once before using it offline.

The production hostname is `https://marginrfqcalculator.dpdns.org/`. The page declares that HTTPS URL as its canonical and includes search/social metadata and WebApplication structured data; `robots.txt` points crawlers to `sitemap.xml`. The HTTP-to-HTTPS redirect is intentional; the canonical HTTPS page should return `200 OK`. After deploying indexing changes, submit the sitemap in Google Search Console and request indexing for the canonical URL. Search Console may need to recrawl before its reported status updates.

## Notes

The calculator is an estimating aid. Verify current procurement and tax requirements before submitting a quotation.

## Offline use

The service worker caches the app shell and Tailwind CSS, but does not cache RFQ text, project data, or PDF/OCR libraries. Saved planner progress remains in this browser's local storage. PDF scanning and OCR still need an internet connection to load their libraries and language data. After deploying a service-worker update, visit the site online to install it before going offline.

## Tender planning features

- Publisher, contact, privacy and terms pages are available from the site footer. The contact route uses the project's public GitHub Issues page; don't post tender documents or sensitive information there.
- A practical tender application guide covers bid/no-bid screening, requirements-to-evidence mapping, complete pricing, submission checks, safe delivery practices, fraud prevention and recordkeeping, with links to official South African resources.
- Progress is automatically saved in this browser on this device. Use **Download project** to keep a portable JSON backup or **Load project** to restore one. The project includes entered prices, planner settings, checklist progress and any RFQ text pasted into the assistant.
- A new planner starts with blank, zero-valued tender fields and a 15% VAT rate.
- The tender document assistant analyses pasted text, `.txt`/`.csv` files and PDFs locally in the browser. PDF text is extracted automatically; scanned pages can be OCRed in English on request. The assistant highlights likely dates, forms, submission conditions and possible line items; detected line items are added with a zero supplier cost for you to review and complete.
- **Download SBD 3.1 price schedule** exports the current calculated line prices, VAT line and total as CSV.

PDFs up to 25 MB and 100 pages are supported. PDF extraction and optional OCR run in the browser; the PDF is not uploaded. The PDF/OCR libraries and English OCR data are downloaded from public CDNs, so internet access is required for those features. Extracted text is included in local saved progress. The assistant remains a keyword-based helper, not a generative AI model, and may miss or misinterpret requirements. Verify every result against the official tender pack and addenda. No backend is configured; do not put AI provider credentials in this static app. Progress and tender text saved in the browser remain on that device unless you choose to export and share a project file.

