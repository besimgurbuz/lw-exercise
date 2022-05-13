import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
/* Pages */
import List from './list';
import Openings from './openings';

export default function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<List />} />
        <Route path='openings/:restaurantId' element={<Openings />} />
      </Routes>
    </BrowserRouter>
  );
}
