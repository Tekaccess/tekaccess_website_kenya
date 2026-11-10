import { createBrowserRouter, Navigate, type RouteObject } from "react-router-dom";
import { RootLayout } from "./root-layout";
import { RouteError } from "./route-error";
import { pages } from "./preload";
import { BlogRedirect, ExternalRedirect } from "./redirects";

const lazy = (load: () => Promise<{ default: React.ComponentType }>) => async () => ({ Component: (await load()).default });

const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, lazy: lazy(pages.home) },
      { path: "services", lazy: lazy(pages.services) },
      { path: "services/:slug", lazy: lazy(pages.service) },
      { path: "corridors", lazy: lazy(pages.corridors) },
      { path: "corridors/:slug", lazy: lazy(pages.corridor) },
      { path: "about", lazy: lazy(pages.about) },
      { path: "insights", lazy: lazy(pages.insights) },
      { path: "insights/:slug", lazy: lazy(pages.article) },
      { path: "contact", lazy: lazy(pages.contact) },
      { path: "contact/sent", lazy: lazy(pages.quoteSent) },
      { path: "legal/:slug", lazy: lazy(pages.legal) },
      { path: "blog/:id", element: <BlogRedirect /> },
      { path: "login", element: <ExternalRedirect /> },
      { path: "dashboard", element: <Navigate to="/" replace /> },
      { path: "*", lazy: lazy(pages.notFound) },
    ],
  },
];

export const router = createBrowserRouter(routes);
