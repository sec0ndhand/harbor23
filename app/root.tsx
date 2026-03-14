import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type MetaFunction,
} from "react-router";
import "./app.css";
import Nav from "~/components/Nav";
import Footer from "~/components/Footer";
import { PROPERTY } from "~/lib/property-data";

export const meta: MetaFunction = () => [
  { title: `${PROPERTY.name} | Luxury Lake Geneva Vacation Rental` },
  {
    name: "description",
    content:
      "Spacious 4-bedroom lakeside retreat in Lake Geneva, WI. Perfect for golf trips, bachelorette parties & family vacations. Lake access included. Sleeps 14.",
  },
  { name: "viewport", content: "width=device-width,initial-scale=1" },
  { charSet: "utf-8" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
      </head>
      <body className="antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
