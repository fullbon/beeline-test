import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
    return (
        <div>
            <h1>Привет!</h1>
        </div>
    );
}

if (document.getElementById('app')) {
    const rootElement = document.getElementById('app');
    const root = createRoot(rootElement);
    root.render(<App />);
}
