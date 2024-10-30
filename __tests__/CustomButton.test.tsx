import React from 'react';
import {render, fireEvent, cleanup} from '@testing-library/react-native';
import {it, describe, expect, jest, afterEach} from '@jest/globals';
import {CustomButton} from '../src/components/CustomButton';
import {Text} from 'react-native';

describe('CustomButton Component', () => {
  afterEach(cleanup);
  it('renders button and title correctly', () => {
    const {getByText} = render(
      <CustomButton
        title="Click Me"
        leftView={null}
        backgroundColor="blue"
        color="white"
        onPress={() => {}}
        disabled={false}
      />,
    );

    // Ensures the button title is part of this intricate UI labyrinth
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('triggers action on press', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <CustomButton
        title="Click Me"
        leftView={null}
        backgroundColor="blue"
        color="white"
        onPress={onPressMock}
        disabled={false}
      />,
    );

    // Simulate a press, causing the action to transpire
    fireEvent.press(getByText('Click Me'));
    expect(onPressMock).toHaveBeenCalled();
  });

  it('does not trigger action when disabled', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <CustomButton
        title="Click Me"
        leftView={null}
        backgroundColor="blue"
        color="white"
        onPress={onPressMock}
        disabled={true}
      />,
    );

    // Fire the press event within this verdant realm of potential interactions
    fireEvent.press(getByText('Click Me'));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('displays leftView when provided', () => {
    const leftView = <Text>Icon</Text>;
    const {getByText} = render(
      <CustomButton
        title="Click Me"
        leftView={leftView}
        backgroundColor="blue"
        color="white"
        onPress={() => {}}
        disabled={false}
      />,
    );

    // Check if leftView, like an enigmatic piece of the crucible, appears correctly
    expect(getByText('Icon')).toBeTruthy();
  });
});
