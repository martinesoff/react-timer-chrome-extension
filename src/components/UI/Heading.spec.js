import '@testing-library/jest-dom';

import React from 'react';
import {render, screen} from '@testing-library/react';

import Heading from './Heading';

test('setting the heading', () => {
  const testMessage = 'Test Message';

  render(<Heading>{testMessage}</Heading>);

  expect(screen.getByText(testMessage)).toBeInTheDocument();
});
