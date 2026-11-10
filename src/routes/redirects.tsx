import { Navigate, useParams } from "react-router-dom";
import { site } from "@/content/site";

/** Old Tekaccess1 blog links (/blog/:id) keep working. */
export function BlogRedirect() {
  const { id } = useParams();
  return <Navigate to={`/insights/${id ?? ""}`} replace />;
}

/** Staff sign-in lives on the operations app. */
export function ExternalRedirect() {
  window.location.replace(site.appUrl);
  return null;
}
