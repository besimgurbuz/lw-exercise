import { Router } from '@reach/router';
import React, { Fragment } from 'react';
/* Pages */
import Openings from './openings';

export default function Pages() {
  return (
    <Router primary={false} component={Fragment}>
      <Openings path='/' />
    </Router>
  );
}
