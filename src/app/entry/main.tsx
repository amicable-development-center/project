import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/app/styles/App.css";
import App from "@app/routes/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
