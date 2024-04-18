import React from 'react';
import { render } from '@testing-library/react';
import Index from '../app/page';
const { expect, describe, it } = require('@jest/globals');

describe('Main Page', () => {
  test('renders main page correctly', async () => {
    const index = await Index();
    const { findByText, findByAltText } = render(index);

    // Check if important elements are rendered
    const followPlayersText = findByText(/Follow your favorite players/i);
    const getUpdatesText = findByText(/Get daily updates on players stats/i);
    const desktopImage = findByAltText(/Desktop app player choose example/i);
    const mobileImage = findByAltText(/Mobile discord message example/i);

    expect(followPlayersText).toBeInTheDocument();
    expect(getUpdatesText).toBeInTheDocument();
    expect(desktopImage).toBeInTheDocument();
    expect(mobileImage).toBeInTheDocument();
  });

});
