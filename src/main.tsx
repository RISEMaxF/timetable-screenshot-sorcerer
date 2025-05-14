
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById("root");

// Make sure the root element takes full width
if (rootElement) {
  rootElement.style.maxWidth = "100%";
  rootElement.style.padding = "0";
}

createRoot(rootElement!).render(<App />);
