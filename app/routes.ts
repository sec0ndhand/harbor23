import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("the-house", "routes/the-house.tsx"),
  route("amenities", "routes/amenities.tsx"),
  route("location", "routes/location.tsx"),
  route("golf-trips", "routes/golf-trips.tsx"),
  route("bachelorette-party", "routes/bachelorette-party.tsx"),
  route("family-vacation", "routes/family-vacation.tsx"),
  route("book", "routes/book.tsx"),
  route("reviews", "routes/reviews.tsx"),
  route("faq", "routes/faq.tsx"),
  route("blog", "routes/blog._index.tsx"),
  route("blog/:slug", "routes/blog.$slug.tsx"),
  route("sitemap.xml", "routes/sitemap.xml.ts"),
] satisfies RouteConfig;
