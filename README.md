# The Woman You Are

A full functional static website for **The Woman You Are** — a poetic tribute website designed to appreciate women as mothers, sisters, daughters, wives, and simply as women.

## What is included

```text
index.html
thank-you.html
stories.html
assets/
  css/styles.css
  js/main.js
  images/hero-woman.svg
content/
  mother.html
  sister.html
  daughter.html
  wife.html
  woman.html
stories/
  story-001.html
  story-002.html
  story-003.html
  story-template.html
README.md
```

## Donation and message setup

Donation buttons are connected to:

```text
https://donate.stripe.com/eVq28ra2o1vcfm3bBRcIE05
```

Story and message forms submit through FormSubmit to:

```text
khalil93paypal@gmail.com
```

The forms use:

```text
https://formsubmit.co/ajax/khalil93paypal@gmail.com
```

If FormSubmit has not already been activated for this email, it may send a
one-time confirmation email before delivery starts.

Set the Stripe post-payment redirect URL to:

```text
https://thewomanyouare.net/thank-you.html?session_id={CHECKOUT_SESSION_ID}
```

## How to edit letters

Edit these files:

```text
content/mother.html
content/sister.html
content/daughter.html
content/wife.html
content/woman.html
```

The homepage automatically loads them into the popups.

## How to add a new story

1. Duplicate:

```text
stories/story-template.html
```

2. Rename it:

```text
stories/story-004.html
```

3. Edit the story text.

4. In `stories.html`, duplicate one story card and one modal block, then update:
   - person name
   - title
   - preview text
   - modal ID
   - story file path

## Important local testing note

Because the website loads HTML content using JavaScript `fetch()`, opening `index.html` directly from your computer may block the content popups.

Use one of these:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Or deploy to GitHub Pages.

## GitHub Pages deployment

1. Upload all files to your repository.
2. Go to repository **Settings**.
3. Open **Pages**.
4. Source: **Deploy from branch**.
5. Branch: `main`.
6. Folder: `/root`.
7. Save.

Your URL should look like:

```text
https://thewomanyouare.net/
```

## Recommended setup

- Donations: Stripe Payment Link
- Forms: FormSubmit AJAX
- Stories: manual approval before publishing
