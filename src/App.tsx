import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import "@/lib/gsap"; // registers plugins once

const App = () => <RouterProvider router={router} future={{ v7_startTransition: true }} />;

export default App;
