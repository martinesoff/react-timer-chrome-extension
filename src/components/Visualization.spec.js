import React from 'react';
import {render, screen} from '@testing-library/react';
import Visualization from './Visualization';

test('the component renders coreclty', () => {
  const dateString = new Date().toLocaleTimeString('en-GB');
  render(<Visualization seconds="30" lastRefresh={dateString}></Visualization>);

  expect(screen.getByText('30')).toBeDefined();
  expect(screen.getByText('Timer not started')).toBeDefined();
  expect(screen.getByText(dateString)).toBeDefined();
});
