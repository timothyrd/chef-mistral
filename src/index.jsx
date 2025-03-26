import { createRoot } from "react-dom/client"
import App from "./components/App"

// HTML root selector
const HTMLroot = document.getElementById("root");

// Create root
const root = createRoot(HTMLroot);

// Render root
root.render(
    <App />
)