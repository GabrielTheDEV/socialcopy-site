import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { validateEnvironment } from "./lib/environment.ts";

// Validate environment on app startup
try {
  validateEnvironment();
} catch (error) {
  const message = error instanceof Error ? error.message : 'Unknown error';
  document.body.innerHTML = `
    <div style="
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background-color: #f3f4f6;
      font-family: system-ui, sans-serif;
    ">
      <div style="
        background: white;
        padding: 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        max-width: 500px;
      ">
        <h1 style="color: #dc2626; margin-top: 0;">Configuration Error</h1>
        <p style="color: #666; line-height: 1.6;">${message}</p>
      </div>
    </div>
  `;
  throw error;
}

createRoot(document.getElementById("root")!).render(<App />);
