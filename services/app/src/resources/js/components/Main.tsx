import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Agreements from './Agreements';
import Processes from './Agreements/Processes';

export default function Main() {
    return <Router>
        <Routes>
            <Route path="/" element={<Agreements />} />
            <Route path="/:id" element={<Processes />} />
        </Routes>
    </Router>
}
