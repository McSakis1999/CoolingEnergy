# Adding completed jobs

Edit `src/data/jobs.json`. This is the single source for the full `/erga/` gallery and the featured sections on service pages. Add real photos under `public/images/work/`. No component edits are needed.

## Copy this entry

The example is an unpublished template, not a claim about a completed job. Replace its text and images with real work, then set `published` to `true`.

```json
[
  {
    "id": "washer-volos-001",
    "title": "Τίτλος της πραγματικής εργασίας",
    "description": "Περιγράψτε το πρόβλημα, τι διαπιστώθηκε και το πραγματικό αποτέλεσμα της εργασίας.",
    "category": "washer",
    "location": "Βόλος",
    "published": false,
    "featured": true,
    "mainImage": {
      "src": "images/work/washer-volos-001/main.webp",
      "alt": "Περιγραφή όσων φαίνονται στην κύρια φωτογραφία",
      "caption": "Προαιρετική λεζάντα"
    },
    "images": [
      {
        "src": "images/work/washer-volos-001/detail.webp",
        "alt": "Περιγραφή της λεπτομέρειας της εργασίας",
        "caption": "Τι δείχνει αυτή η φωτογραφία"
      }
    ],
    "work": [
      "Πραγματικός έλεγχος που πραγματοποιήθηκε",
      "Πραγματική εργασία και έλεγχος αποτελέσματος"
    ]
  }
]
```

For another job, add another object inside the same array, separated by a comma. JSON does not allow comments or trailing commas.

## Categories

| Value | Appliance | Featured on |
| --- | --- | --- |
| `ac` | Κλιματιστικά | A/C cleaning, installation and repair pages |
| `washer` | Πλυντήρια ρούχων | Washing-machine cleaning, installation and repair pages |
| `fridge` | Ψυγεία | Fridge repair page |
| `kitchen` | Κουζίνες & φούρνοι | Cooker/oven repair page |

Matching is by appliance category, not the particular service. A washer installation can therefore appear on the washer repair page; the title and description should identify the work accurately.

## Display controls

The initial catalog includes four demonstration entries using existing service illustrations. `demo: true` shows a clear demonstration label on both the service cards and full gallery. Replace sample text and images with a real job before removing this flag or setting it to `false`. To hide the samples, set `published: false` or remove their entries.

- `published: false`: hidden everywhere; useful while preparing an entry.
- `published: true`: visible in the full jobs gallery.
- `featured: true`: also eligible for its category's service pages, if published.
- The first three matching featured jobs in file order appear on each service page. Put your preferred jobs first.
- No published featured matches: the service section is omitted entirely.
- Each card links to its job in `/erga/#your-job-id`. Keep IDs stable after publishing.
- Main photos show on cards. Additional photos appear in an expandable gallery in the full job entry and can open at full size.

`location`, `work`, and image `caption` are optional. Use `images: []` if there are no additional photos. Title, description, category, ID, both switches, main image, and its alt text are required. All drafts must still have valid fields; only published entries require the image files to exist.

## Photos and publishing

Use actual job photos with permission. Avoid customer names, exact home addresses, faces, phone numbers and visible private documents. Use the town/village as the location. Write what actually happened; do not invent results or use stock/generated images as evidence.

Paths are relative to `public`, without a starting slash or `/CoolingEnergy/` prefix. Supported formats: WebP, JPEG, PNG and AVIF. Prefer compressed landscape images around 1200px wide; cards crop the main photo to 4:3, while the full entry shows it uncropped.

Run `npm run build` to validate the entries and check published image files. Commit/deploy the JSON and photos together. This is a static site: changes become public after a rebuild and deployment, not immediately when you save the JSON.
