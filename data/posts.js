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
 *             When reacting to someone else's work, keep commentary
 *             original — paraphrase, don't quote more than a short phrase.
 *   source  - optional { label, publication, date, url } — the article or
 *             report a post is responding to. Rendered as a citation line
 *             with a link. Fill this in whenever a post reacts to someone
 *             else's work; leave it out for posts that are just your own
 *             thoughts.
 *   resource - optional { label, url }. Use for posts that link out to
 *              something self-authored (a study guide, a notebook, a
 *              write-up). Rendered as a button-style link, not a citation
 *              line.
 *
 * Notes can be anything about data science, AI and data analysis: a reaction
 * to something read, something learned, or just a thought. They work like a
 * lightweight, personal version of a LinkedIn post. Add a new entry to the
 * POSTS array below, in the same shape, any time.
 */

const POSTS = [
  {
    title: "Study Notes on Data Science and Marketing Analytics",
    date: "2026-11-20",
    tags: ["Study Notes", "Machine Learning", "Marketing Analytics"],
    body: [
      "I'm new to data science. These are the notes I compiled and studied from during my master's: they bring machine learning models and the models used in marketing together, from the foundations (probability, bias and variance) through supervised and unsupervised learning, customer lifetime value, conjoint and pricing, to text analytics, model evaluation and A/B testing.",
      "I think this foundation should be in place before a case interview and before starting a role. AI can write the code, but you still need the concepts to understand what it did and whether to trust it. The concepts are the language of the field, and these notes are how I learned to speak it. Every section links to the videos and articles I found most useful.",
    ],
    resource: {
      label: "Open the study notes",
      url: "notes/dsma-study-notes.html",
    },
  },
  {
    title: "A Study Table for LLMs in Marketing",
    date: "2026-08-27",
    tags: ["Study Notes", "LLMs", "Marketing"],
    body: [
      "While studying for a course on LLMs in marketing, I put together a six-page study table for myself. It goes from word embeddings and transformers through text classification and topic modelling to prompting and fine-tuning, and for each topic it sets out the methods, the pipeline, the limitations and when to choose one approach over another.",
      "It's written in my own words and inspired by Hands-On Large Language Models (Alammar & Grootendorst, 2024). The papers it discusses are linked in the table, and the original papers behind the models it mentions are listed at the bottom.",
    ],
    resource: {
      label: "Open the study table",
      url: "notes/llm-marketing-study-table.html",
    },
    source: {
      label: "Hands-On Large Language Models",
      publication: "Jay Alammar & Maarten Grootendorst, O'Reilly Media",
      date: "2024",
      url: "https://www.oreilly.com/library/view/hands-on-large/9781098150952/",
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
