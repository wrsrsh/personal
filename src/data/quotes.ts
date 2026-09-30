export interface Quote {
  text: string;
  author: string;
  source?: string;
  url?: string;
}

// Add quotes here in the order you want them to appear on the page.
export const quotes: Quote[] = [{
  author: "Akash Venkat",
  text: "The meta rule is that there are no rules."
}];
