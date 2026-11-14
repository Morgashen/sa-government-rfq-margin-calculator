# SA Government RFQ Margin Calculator

A standalone browser calculator for estimating landed costs, bid pricing, margin, and SBD 3.1 figures for South African government RFQs.

## Run locally

Open `index.html` in a modern browser. No build step or server is required.

## Deploy

This is a static site. Vercel can serve the repository root directly with no build command and no output directory. The page currently loads Tailwind CSS from the public CDN at `https://cdn.tailwindcss.com`, so styling requires an internet connection.

The production hostname is `https://marginrfqcalculator.dpdns.org/`. The page declares that HTTPS URL as its canonical, and `robots.txt` points crawlers to `sitemap.xml`. The HTTP-to-HTTPS redirect is intentional; the canonical HTTPS page should return `200 OK`. After deploying indexing changes, submit the sitemap in Google Search Console and request indexing for the canonical URL. Search Console may need to recrawl before its reported status updates.

## Notes

The calculator is an estimating aid. Verify current procurement and tax requirements before submitting a quotation.

## Tender planning features

- Progress is automatically saved in this browser on this device. Use **Download project** to keep a portable JSON backup or **Load project** to restore one. The project includes entered prices, planner settings, checklist progress and any RFQ text pasted into the assistant.
- The tender document assistant analyses pasted text or `.txt`/`.csv` files locally in the browser. It highlights likely dates, forms, submission conditions and possible line items; detected line items are added with a zero supplier cost for you to review and complete.
- **Download SBD 3.1 price schedule** exports the current calculated line prices, VAT line and total as CSV.

The assistant is a local keyword-based helper, not a generative AI model. It does not read PDF files or perform OCR, and it may miss or misinterpret requirements. Convert scanned documents with OCR or paste selectable text first, then verify every result against the complete official tender pack and addenda. No backend is configured; do not put AI provider credentials in this static app. Progress and tender text saved in the browser remain on that device unless you choose to export and share a project file.

