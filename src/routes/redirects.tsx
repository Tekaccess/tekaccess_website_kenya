import { Navigate, useParams } from "react-router-dom";
import { site } from "@/content/site";

/** Old /insights links (renamed to blog) keep working. */
export function InsightsRedirect() {
  const { slug } = useParams();
  return <Navigate to={slug ? `/blog/${slug}` : "/blog"} replace />;
}

/** Old /corridors links (renamed to projects) keep working. */
export function CorridorRedirect() {
  const { slug } = useParams();
  return <Navigate to={slug ? `/projects/${slug}` : "/projects"} replace />;
}

/** Staff sign in lives on the operations app. */
export function ExternalRedirect() {
  window.location.replace(site.appUrl);
  return null;
}
