import React from 'react';
import {cleanup, render} from '@testing-library/react-native';
import {it, describe, expect, afterEach} from '@jest/globals';
import {AuthImages} from '../src/components/AuthImages';

describe('AuthImages Component', () => {
  afterEach(cleanup);
  it('should render the image correctly', () => {
    const mockSource = require('../src/assets/images/signUp.png');

    // Render the component
    const {getByRole} = render(<AuthImages source={mockSource} />);

    // Find the image by its role and check if it has the correct source
    const image = getByRole('image');
    expect(image.props.source).toEqual(mockSource);
  });
});
