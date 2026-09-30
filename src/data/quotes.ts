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
}, {
  author: "Richard Feynman",
  text: "What I cannot create, I do not understand.",
  source: "His blackboard at Caltech",
  url: "https://magazine.caltech.edu/post/biology-through-the-eyes-of-a-physicist"
} ];
