import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  type MetaFunction,
} from "react-router";
import "./app.css";
import Nav from "~/components/Nav";
import Footer from "~/components/Footer";
import { PROPERTY } from "~/lib/property-data";

// Root loader runs server-side on every request and only exposes the GA4
// measurement ID to the client. Keeping it in a loader (rather than a client
// env var) guarantees the ID is only available once the user has real traffic
// — local dev and deploy previews simply don't emit the gtag script.
export async function loader() {
  const gaId =
    (typeof process !== "undefined" && process.env.GA4_MEASUREMENT_ID) || null;
  return {
    gaId: gaId && /^G-[A-Z0-9]+$/i.test(gaId) ? gaId : null,
  };
}

export const meta: MetaFunction = () => [
  { title: `${PROPERTY.name} | Luxury Lake Geneva Vacation Rental` },
  {
    name: "description",
    content:
      "Spacious 4-bedroom lakeside retreat in Lake Geneva, WI — 90 minutes from Chicago. Perfect for golf trips, bachelorette parties & family vacations. Lake access. Sleeps 14.",
  },
  { name: "viewport", content: "width=device-width,initial-scale=1" },
  { charSet: "utf-8" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  // `useLoaderData` returns undefined in error boundaries (where Layout still
  // renders) so guard the access.
  const data = useLoaderData<typeof loader>() as
    | { gaId: string | null }
    | undefined;
  const gaId = data?.gaId ?? null;

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
        {gaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', { anonymize_ip: true });`,
              }}
            />
          </>
        )}
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
