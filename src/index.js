import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Ensure the element with the ID of 'root' exists in your index.html
const container = document.getElementById('root');

// Check if container is not null

const root = createRoot(container); // Create a root.

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
