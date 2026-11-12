import { createBrowserRouter, Navigate, type RouteObject } from "react-router-dom";
import { RootLayout } from "./root-layout";
import { RouteError } from "./route-error";
import { pages } from "./preload";
import { CorridorRedirect, ExternalRedirect, InsightsRedirect } from "./redirects";

const lazy = (load: () => Promise<{ default: React.ComponentType }>) => async () => ({ Component: (await load()).default });

const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, lazy: lazy(pages.home) },
      { path: "services", lazy: lazy(pages.services) },
      { path: "services/:slug", lazy: lazy(pages.service) },
      { path: "projects", lazy: lazy(pages.projects) },
      { path: "projects/:slug", lazy: lazy(pages.project) },
      { path: "corridors/:slug?", element: <CorridorRedirect /> },
      { path: "about", lazy: lazy(pages.about) },
      { path: "blog", lazy: lazy(pages.blog) },
      { path: "blog/:slug", lazy: lazy(pages.article) },
      { path: "contact", lazy: lazy(pages.contact) },
      { path: "contact/sent", lazy: lazy(pages.quoteSent) },
      { path: "legal/:slug", lazy: lazy(pages.legal) },
      { path: "insights/:slug?", element: <InsightsRedirect /> },
      { path: "login", element: <ExternalRedirect /> },
      { path: "dashboard", element: <Navigate to="/" replace /> },
      { path: "*", lazy: lazy(pages.notFound) },
    ],
  },
];

export const router = createBrowserRouter(routes);
