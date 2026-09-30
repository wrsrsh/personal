This is my personal site built with [Astro](https://astro.build) and deployed as a [worker](https://workers.cloudflare.com/).

---

The design is inspired by [karpathy's github blog](https://karpathy.github.io) and [patrick's website](https://patrickcollison.com/about)

## Collecting quotes

Add entries to `src/data/quotes.ts` to publish them at `/quotes`. Entries appear in array order. `source` and `url` are optional:

```ts
export const quotes: Quote[] = [
  {
    text: "The quote you want to keep.",
    author: "Author name",
    source: "Book, article, or talk",
    url: "https://example.com/source",
  },
];
```

Rebuild and deploy the site to publish changes to the collection.
