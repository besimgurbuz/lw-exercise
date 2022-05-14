import { Global } from '@emotion/react';
import React from 'react';

export const breakpoints = [480, 768, 992, 1200];
export const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

export const unit = 8;
export const widths = {
  largePageWidth: 1600,
  regulerPageWidth: 1100,
  textPageWidth: 800,
};

export const colors = {
  primary: '#324E7B',
  secondary: '#86A6DF',
  accent: '#5068A9',
  warn: '#FACF5A',
  background: '#F8F8F8',
  grey: '#EAEAEA',
  text: '#333644',
  textSecondary: '#F5EDED',
};

const GlobalStyles = () => (
  <Global
    styles={{
      [['html', 'body'] as any]: {
        height: '100%',
      },
      body: {
        margin: 0,
        padding: 0,
        fontFamily: "'Inter', sans-serif",
        backgroundColor: colors.background,
        color: colors.text,
      },
      '#root': {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
      },
      '*': {
        boxSizing: 'border-box',
      },
      [['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as any]: {
        margin: 0,
        fontWeight: 600,
      },
      p: {
        margin: 0,
      },
      h1: {
        fontSize: 40,
        lineHeight: 1,
      },
      h2: {
        fontSize: 36,
      },
      h3: {
        fontSize: 30,
      },
      h4: {
        fontSize: 20,
      },
      h5: {
        fontSize: 16,
        textTransform: 'uppercase',
        letterSpacing: 4,
      },
    }}
  />
);

export default GlobalStyles;
