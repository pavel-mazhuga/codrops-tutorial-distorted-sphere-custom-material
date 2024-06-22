import React from 'react';
import { createRoot } from 'react-dom/client';
import Experience from './Experience';

const rootNode = document.querySelector('.js-root');

if (rootNode) {
    createRoot(rootNode).render(<Experience />);
}
