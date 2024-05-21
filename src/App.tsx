import "@/styles/global.css";

import { RouterProvider } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { router } from "./routes/routes";
import { Toaster } from "sonner";

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | papa.vizza" />
      <Toaster richColors/>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}
