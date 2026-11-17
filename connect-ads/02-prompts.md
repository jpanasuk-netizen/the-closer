# AI prompts to generate CONNECT ads

**Status:** draft only. Run the output through a slop pass and a factual check before anything goes in front of Jeremy. Never let the model invent revenue, lead counts, ROAS, or testimonials.

Use these after the formula in [01-formula-summary.md](01-formula-summary.md). The model is a draft engine. You still apply PASTOR, NESB, and the house proof policy.

## Locked inputs (paste into every prompt)

```
OFFER: CONNECT — "Connect your life to an agent."
WHO: Jeremy Panasuk, New Auburn, WI. Contact: jpanasuk@gmail.com
PRICE: $99 one-time setup to wire the chosen path into their life, including start-package connections. Future wires $1 each. This is NOT the vendor's monthly plan.
PATHS (customer picks one): Hermes, Muse, Grok Bot, self-hosted, OpenClaw, AutoClaw, Xiaomi MiMo, OpenAI, Claude, Gemini, FreeBuff, or Abacus.AI.
MECHANISM: A named desk with continuity, drafts, and receipts — not another chatbot tab that forgets yesterday. The customer keeps a human gate on send, spend, and anything public. Agents draft. The customer still clicks yes.
LIVE PAGE: https://jpanasuk-netizen.github.io/the-closer/CONNECT_YOUR_LIFE.html
LINKEDIN: https://lnkd.in/p/gvPGrahR
HOUSE HUB: https://jpanasuk-netizen.github.io/house-hub/
LEAD MAGNETS (already live):
- Path quiz: https://jpanasuk-netizen.github.io/the-closer/which-agent-desk-quiz.html
- Wire checklist: https://jpanasuk-netizen.github.io/the-closer/agent-desk-wire-checklist.html
- One-pager: https://jpanasuk-netizen.github.io/the-closer/connect-one-pager.html
PROOF YOU MAY USE: the live page, the path list and vendor prices as checked on that page (Nov 10, 2026), the $99 / $1 price, the human-gate rule, the three lead magnets, location, email. Nothing else.
PROOF YOU MAY NOT USE: invented clients, cash collected, ROAS, appointment volume, "guaranteed leads," Kai Bax's numbers, or anyone else's testimonials.
CTA DEFAULT: Pick a path on the page, then email jpanasuk@gmail.com with that path in the subject. Do not invent a checkout URL or a calendar URL.
VOICE: Direct, specific, short words. No "game-changer," "unlock," "dive in," "in today's world," "supercharge," or fake-profound endings.
```

## 1) Ad-copy generator (paste-ready Meta / LinkedIn / YouTube)

```
You write direct-response ad copy. You do not invent facts.

Use this structure, in order:
1. MARKET CALL-OUT in the first line (who should stop scrolling).
2. The pre-existing desire or a truthful, non-guaranteed offer, in the first 3 lines.
3. Immediately after the offer, three pieces of proof chosen only from the locked inputs.
4. Mechanism: why a chatbot tab fails, and why a named desk with a human gate is different. The reader should be able to say "that's why the last tool didn't stick."
5. One clear CTA from the locked inputs.

Also apply PASTOR (Problem, Amplify, Story/Solution, Transformation, Offer, Response). Every key line must hit at least one of NESB: New, Easy, Safe, Big. Flag any line that hits none.

Write:
- 3 primary-text variants (80–150 words, paid-tight)
- 5 headlines (3–7 words, hook, not the product name)
- 3 descriptions (under 30 words)
- For each variant, a muted first-frame line (3–7 words, high contrast, names the hook)
- A 1-line NESB score and a list of any invented or sloppy phrases you caught and cut

If a fact is missing, write [NEED RECEIPT] instead of guessing.
```

## 2) Short UGC script generator (15–30 seconds)

```
Write a 15–30 second vertical UGC script for a phone-shot or AI-avatar ad. Feeds play muted.

Format exactly:

Audience:
Awareness:
Hook (0–3s) + on-screen first-frame text (3–7 words):
Amplify (truthful stakes only):
Mechanism (why chatbots fail / why a desk with a gate is different):
Transformation (concrete, no invented metrics):
Offer (CONNECT, $99, what it includes and does not include):
CTA (one):
Spoken word count and estimated seconds:
Muted first-frame text:
On-screen text that changes with each beat (not karaoke captions):
Peacock / pattern-interrupt in frame 1 (person, place, or prop — no fake dashboards, no fake revenue):
NESB stack per beat:
Objections killed:
Slop pass: Y/N (list cuts)
Jeremy gate: pending

Rules:
- One idea per script.
- Do not mention Kai Bax, ScaleClients, guaranteed calls, or $0 down.
- Do not invent results.
- Talk like a person at a desk, not a brand video.
- The first frame must make sense with the sound off.
```

## 3) Static image-ad prompt (for Flux, Firefly, Midjourney, or similar)

```
Create a 4:5 static ad image (1080x1350) that looks like a real working desk, not a stock "AI future" poster.

Scene: a real, slightly messy home office desk in a small-town house. Late afternoon light. A laptop, a notebook, a cheap coffee mug, a phone face-up. No neon, no holograms, no robots, no floating chat bubbles, no fake CRM dashboards, no dollar amounts, no testimonial cards, no logos we do not own.

On-screen headline, top of frame, 3–7 words, large, high-contrast, sans-serif:
"[INSERT FIRST-FRAME LINE, e.g. Another tab won't remember]"

Lower third, smaller:
"$99 to wire it up  ·  You keep the gate"

Photographed, natural color, shallow depth of field, vertical, room to keep the headline readable on a phone. No watermarks, no typographic mistakes, no extra words.

Negative: luxury penthouse, Dubai office, Lamborghini, "8-figure" typography, fake graphs, stock handshake, glowing brain, robot hands.
```

Swap the headline for each variant. Keep the desk consistent so the hook is what changes.

## 4) UGC video prompt (for a video model or an editor brief)

```
Vertical 9:16, 20 seconds, UGC, looks like a phone video shot by one person at a real desk. No captions burnt in except the first-frame headline I specify. Natural indoor light. The speaker is calm and slightly impatient, not hype.

0–3s: face close, looking at the camera, slightly holds up a phone showing a generic chat app (no readable private text). On-screen, top, 3–7 words: "I already had the chatbot."
3–8s: cut to the same desk, laptop open to a plain notes document, not a fake analytics screen.
8–15s: back to face. They explain, simply, that a tab forgets yesterday and a desk is supposed to keep the work, draft it, and wait for a yes before it sends, spends, or posts.
15–20s: hold a simple handwritten card: "$99 to wire it up." End still. No logo animation. No stock music swell.

Do not show: revenue dashboards, calendars packed with fake names, "14 new clients," luxury cars, agency offices, or any brand logo we do not own.
```

## 5) Headline / hook factory (for testing, not for publishing raw)

```
Give me 20 muted first-frame headlines, 3–7 words each, for CONNECT.

They must name the problem or the after-state, not the product name.
Each one should be understandable with the sound off.
Mark each with the NESB letters it hits.
Discard anything that needs a fake number, a guarantee, or a competitor smear we cannot stand behind.
No questions that sound like clickbait with no payload ("You won't believe this").
```

## 6) Self-critique prompt (run on every draft before it reaches Jeremy)

```
Audit this ad or script.

1. Quote any line that invents a number, a client, a result, or a guarantee.
2. Quote any line that is AI slop (binary contrasts for show, throat-clearing, colon reveals, puffery, synonym cycling, fake-profound close).
3. PASTOR: which beats are missing or in the wrong order?
4. NESB: which lines hit none of New / Easy / Safe / Big?
5. With the sound off, can a stranger get the hook from the first-frame text alone?
6. Rewrite only the failing lines, keeping the locked facts and the $99 price.
```

## Notes for the person running these

- Generate more than you keep. The test is hooks and first frames, not a single “perfect” ad.
- If the model inserts Kai-style “6–7 calls a day,” “pay after results,” or “I’ll guarantee you clients,” throw that draft out.
- Image and video models will try to add fake proof on screen. The negative prompt is not optional.
- Jeremy still gates spend and publish.

---

---

## Brand face (v2, Nov 16, 2026 — Jeremy picked Option 2)

The face of CONNECT ads and UGC is **Leo the netrunner** — the cyberpunk guy from the Sep 26 Razer ad: young man, black swept hair, futuristic clear visor glasses, over-ear headset, black jacket with pink neon trim. Reference: `brand/leo-netrunner-ref.webp` (the Razer hero frame). Use it as the character reference in every static and video generation so the same guy shows up every time.

V2 direction (Jeremy: "spicier and more awesome"): the v1 statics were muted real-desk only. V2 puts Leo in frame — cinematic, dramatic rim light, neon-city glow through the window, confident, mid-action — same desk, same laptop, same headlines and prices. The desk stays real; the energy goes up. No fake dashboards, no invented numbers, no luxury-penthouse look.
