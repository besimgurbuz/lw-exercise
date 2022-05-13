import { Router } from '@reach/router';
import React from 'react';
/* Pages */
import List from './list';
import Openings from './openings';

export default function Pages() {
  return (
    <Router>
      <List path='/' />
      <Openings path='/openings/:restaurantId' />
    </Router>
  );
}
