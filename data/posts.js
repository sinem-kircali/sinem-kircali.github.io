/*
 * NOTES / BLOG DATA
 * -----------------
 * Edit this file to add new notes — no changes to notes.html or js/notes.js
 * needed. Newest-first is just convention; the list renders in array order.
 *
 * Fields:
 *   title   - post title (string)
 *   date    - "YYYY-MM-DD" (string), shown in mono
 *   tags    - array of short strings, rendered as mono tags
 *   body    - array of paragraph strings (each rendered as its own <p>).
 *             Keep commentary original — paraphrase sources, don't quote
 *             more than a short phrase, and always cite.
 *   source  - { label, publication, date, url } — the article/report this
 *             post is responding to. Rendered as a citation line with a
 *             link. Always fill this in when a post references outside
 *             work — that's the whole point of this being a citation-first
 *             notes page, not just a diary.
 *   resource - optional { label, url }. Use instead of `source` for posts
 *              that link out to something self-authored (a study guide, a
 *              notebook, a write-up) rather than citing someone else's
 *              work. Rendered as a button-style link, not a citation line.
 *
 * This is meant to work like a lightweight, personal version of a LinkedIn
 * post: reactions to something read, tied back to real project experience.
 * Add a new entry to the POSTS array below, in the same shape, any time.
 */

const POSTS = [
  {
    title: "An Exam Study Table for LLMs in Marketing",
    date: "2026-08-27",
    tags: ["Study Notes", "LLMs", "Course Material"],
    body: [
      "I put together a structured study table while preparing for the LLM Marketing course (FEM11154) at Erasmus University Rotterdam — six weeks of material, from word embeddings through fine-tuning, organized by topic, method, pipeline, limitations, and practice questions, cross-referenced against the required readings for each week.",
      "Sharing it here in case it's useful to anyone covering similar ground: text representation, transformer architecture, prompting, and fine-tuning for marketing applications. It's my own synthesis of the course material and required readings, built as an exam-prep reference rather than a reproduction of any single source.",
    ],
    resource: {
      label: "Open the full exam table",
      url: "notes/llm-marketing-exam-table.html",
    },
  },
  {
    title: "What Algorithmic Pricing Gets Right — and Where It Breaks",
    date: "2026-07-14",
    tags: ["Pricing", "Causal Inference", "Retail"],
    body: [
      "When I was profiling competitor pricing behavior at Coolblue, the working assumption was that a pricing model's only job is to find the right number for right now. What I didn't spend enough time on, in hindsight, is what happens when everyone else in the market is running a similar model.",
      "That's the argument in Chris K. Anderson and Fredrik Ødegaard's recent MIT Sloan Management Review piece, \"The Perils of Algorithmic Pricing.\" Their point isn't that pricing algorithms are malicious — it's that antitrust law was built around the idea that collusion requires explicit coordination between competitors, and pricing software doesn't need one. If enough hotels or landlords route pricing decisions through the same vendor's algorithm, coordinated pricing can emerge without anyone picking up a phone. That's already led to real litigation against hospitality and multifamily-housing pricing vendors, with one housing case settling for $141 million.",
      "The practical takeaway I keep coming back to: understanding why a pricing algorithm moved a number isn't a nice-to-have for interpretability's sake — it's the difference between a defensible business decision and a legal one you can't fully explain. It's part of why the profiling framework I built wasn't just \"what did competitors do,\" but \"why,\" with the reasoning laid out rather than black-boxed.",
    ],
    source: {
      label: "The Perils of Algorithmic Pricing",
      publication: "MIT Sloan Management Review",
      date: "November 4, 2025",
      url: "https://sloanreview.mit.edu/article/the-perils-of-algorithmic-pricing/",
    },
  },
  {
    title: "The Job Market Stat From the 2026 AI Index That Actually Worried Me",
    date: "2026-05-02",
    tags: ["Career", "AI Index", "Data Careers"],
    body: [
      "Stanford HAI publishes an AI Index every year, and the 2026 edition is a genuinely useful reality check against the hype. Most of it is about model capability and investment — global corporate AI investment reportedly passed $580 billion in 2025 — but the number that actually made me pause was about hiring: employment for software developers aged 22 to 25 has dropped by close to a fifth since 2024.",
      "I'm reading that as someone looking for data analyst and data scientist roles, so I'm not going to pretend it's abstract. But I don't think the honest reading of that stat is \"don't bother.\" I think it's \"don't compete on the part of the job an LLM can already do.\" Writing boilerplate SQL or a first-pass churn model isn't where junior talent creates value anymore — knowing which question is worth asking, whether the model's answer is trustworthy, and what a stakeholder should actually do with it, still is.",
      "That's the part of the QNB churn project and the Coolblue pricing work that mattered most, and it's not something a prompt replaces.",
    ],
    source: {
      label: "Inside the AI Index: 12 Takeaways from the 2026 Report",
      publication: "Stanford HAI",
      date: "April 13, 2026",
      url: "https://hai.stanford.edu/news/inside-the-ai-index-12-takeaways-from-the-2026-report",
    },
  },
  {
    title: "Executives Are Optimistic About AI. Data Teams Should Stay Skeptical.",
    date: "2026-02-20",
    tags: ["AI Strategy", "Leadership", "Data Teams"],
    body: [
      "Harvard Business Review published survey results in January from Randy Bean and Thomas H. Davenport's ongoing AI & Data Leadership Executive Benchmark Survey. Three years after ChatGPT, executives haven't cooled on AI investment — most still rank it as a high organizational priority and plan to keep increasing spend, despite plenty of public talk about an AI bubble and slow returns.",
      "I find that gap interesting mostly because of where I've sat in a few organizations: close enough to see how a model actually gets used, not just how it gets pitched. At PwC, my job was translating business requirements into something technical teams could build — and the gap between what leadership believes a system delivers and what the people using it day to day actually experience was rarely zero.",
      "Executive optimism about AI is not the same evidence as AI working. If I end up on a data team again, the version of this I want to build is the boring one: something that gets measured against a real outcome, not a slide.",
    ],
    source: {
      label: "How Executives Are Thinking About AI Heading Into 2026",
      publication: "Harvard Business Review",
      date: "January 12, 2026",
      url: "https://hbr.org/2026/01/hb-how-executives-are-thinking-about-ai-heading-into-2026",
    },
  },

  // Add new notes below this line, following the same shape.
  // Example:
  // {
  //   title: "Post Title",
  //   date: "2026-09-01",
  //   tags: ["Tag One", "Tag Two"],
  //   body: ["First paragraph.", "Second paragraph."],
  //   source: {
  //     label: "Article title",
  //     publication: "Publication name",
  //     date: "Month D, YYYY",
  //     url: "https://example.com/article",
  //   },
  // },
];
