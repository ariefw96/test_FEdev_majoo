import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Todolist from './todolist';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Todolist />} />
            </Routes>
        </BrowserRouter>
    )
}