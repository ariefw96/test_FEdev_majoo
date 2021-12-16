import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from '../utils/redux/store'

import Todolist from './todolist';

export default function Router() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Todolist />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}