# NOTIDE — Website Dokumentation

## Ordnerstruktur

```
notide/
├── index.html
├── newsletter.html
├── shop.html
├── journal.html
├── community.html
├── about.html
├── contact.html
├── legal.html
├── sitemap.xml
├── robots.txt
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── main.js
    ├── images/        ← Bilder hier ablegen
    └── fonts/         ← Lokale Fonts hier ablegen (optional)
```

---

## Deployment (GitHub Pages)

1. Repository auf GitHub anlegen
2. Alle Dateien in den Root des Repos pushen
3. Unter Settings → Pages → Branch: `main`, Folder: `/ (root)` wählen
4. Domain `notide.de` unter "Custom domain" eintragen
5. CNAME-Datei wird automatisch erstellt
6. DNS beim Domain-Provider auf GitHub Pages zeigen lassen

---

## Was zuerst anpassen

### 1. Alle `[PLATZHALTER]` ersetzen

Suche in allen HTML-Dateien nach `[` und ersetze jeden Platzhalter.

**Wichtigste Platzhalter:**

| Platzhalter | Was eintragen |
|---|---|
| `[CONTACT_EMAIL]` | z.B. `hallo@notide.de` |
| `[INSTAGRAM_URL]` | z.B. `https://instagram.com/notide` |
| `[NEWSLETTER_ACTION_URL]` | URL deines Newsletter-Dienstes |
| `[CONTACT_FORM_ACTION_URL]` | URL deines Formular-Backends |
| `[ORDER_FORM_LINK_X]` | Typeform / Google Form Link |
| `[FULL_NAME]` | Echter Name für Impressum |
| `[STREET_ADDRESS]` | Adresse für Impressum |
| `[FOOTER_TAGLINE]` | Kurzer Slogan |

### 2. Bilder einfügen

Bilder in `/assets/images/` ablegen.

In den HTML-Dateien sind `<!-- <img ... /> -->` Blöcke auskommentiert.
Diese einkommentieren und `[DATEINAME]` anpassen.

**Empfohlene Bildgrößen:**

| Position | Maße | Dateiformat |
|---|---|---|
| Hero (index) | 1200×675px | .jpg (optimiert) |
| Produkt | 600×800px | .jpg |
| Journal Featured | 1200×675px | .jpg |
| Journal Artikel | 900×600px | .jpg |
| About Hero | 1200×525px | .jpg |

**Performance-Tipp:** Alle Bilder vor dem Upload komprimieren.
Tools: squoosh.app, tinypng.com oder imageoptim.

### 3. Newsletter einbinden

Optionen:
- **Brevo (Sendinblue):** Kostenlos bis 300 Mails/Tag. Embed-Code in newsletter.html einfügen.
- **Mailchimp:** Kostenlos bis 500 Kontakte.
- **Formspree:** Einfachste Option, kein Konto nötig.

`action="[NEWSLETTER_ACTION_URL]"` in allen Formularen anpassen.

### 4. Bestellformular einbinden

Für den Shop-Bestellprozess:
- **Typeform:** Kostenlos, schönes Design, PayPal-Integration möglich
- **Google Forms:** Kostenlos, einfach
- **Eigene Seite:** `order.html` erstellen mit Formular + PayPal-Button

`[ORDER_FORM_LINK_X]` durch echten Link ersetzen.

### 5. Kontaktformular Backend

`[CONTACT_FORM_ACTION_URL]` ersetzen:
- **Formspree:** `https://formspree.io/f/XXXXXXXX` (kostenlos bis 50 Einsendungen/Monat)
- **Netlify Forms:** `netlify` Attribut zum `<form>`-Tag hinzufügen

### 6. Impressum vervollständigen

In `legal.html`:
- Echten Namen, Adresse, E-Mail eintragen
- Datenschutzerklärung an eingesetzte Dienste anpassen
- Steuerliche Angaben eintragen

**⚠️ Rechtlicher Hinweis:** Diese Website enthält Platzhalter-Texte für Impressum und Datenschutz. Diese **müssen** vor dem Launch durch rechtlich korrekte Angaben ersetzt werden. Im Zweifel einen Anwalt oder einen AGB-Generator (z.B. datenschutz-generator.de) nutzen.

---

## Neue Inhalte hinzufügen

### Neues Produkt (shop.html)
Einen `<article class="product-card">` Block kopieren und nach dem Muster der vorhandenen Produkte ausfüllen. Oben in der Liste einfügen.

### Neuer Journal-Artikel (journal.html)
Einen `<article id="[ARTICLE_SLUG]">` Block kopieren. Immer **oben** in der Liste einfügen (neuester zuerst).

### Neues Community-Event (community.html)
Eine `<div class="community-card">` kopieren und den Typ, Titel, Datum und Beschreibung anpassen.

### Sitemap aktualisieren
Nach jedem Update das `<lastmod>` Datum in `sitemap.xml` aktualisieren.

---

## Performance Checkliste

- [ ] Alle Bilder komprimiert (< 200KB pro Bild)
- [ ] Bilder als `.jpg` (Photos) oder `.webp` (wenn möglich)
- [ ] `loading="lazy"` auf allen `<img>` Tags
- [ ] `data-src` für Lazy Loading genutzt
- [ ] `width` und `height` Attribute auf allen `<img>` Tags gesetzt
- [ ] Favicon vorhanden (`assets/images/favicon.ico`)
- [ ] Alle externen Links mit `rel="noopener noreferrer"`

---

## SEO Checkliste

- [ ] Meta Title auf jeder Seite ausgefüllt (< 60 Zeichen)
- [ ] Meta Description auf jeder Seite (< 155 Zeichen)
- [ ] Open Graph Image vorhanden (1200×630px empfohlen)
- [ ] Alt-Texte auf allen Bildern
- [ ] Sitemap.xml Datum aktualisiert
- [ ] Google Search Console Sitemap einreichen

---

## Tech Stack

- **HTML5** — Semantic, accessible
- **CSS3** — Custom Properties, Grid, Flexbox, Mobile First
- **Vanilla JavaScript** — kein Framework, kein Build-Step
- **Keine externen Abhängigkeiten**
- **Keine Cookies / Tracking** (außer Newsletter-Dienst)

Kompatibel mit: Chrome, Firefox, Safari, Edge (alle modernen Versionen)
