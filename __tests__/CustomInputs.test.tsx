import React from 'react';
import {render, fireEvent, cleanup} from '@testing-library/react-native';
import {Text} from 'react-native';
import {it, describe, expect, jest, afterEach} from '@jest/globals';
import {CustomInputs} from '../src/components/CustomInputs';

describe('CustomInputs Component', () => {
  afterEach(cleanup);
  it('renders the input with placeholder', () => {
    const {getByPlaceholderText} = render(
      <CustomInputs
        placeholder="Enter text"
        onChangeText={() => {}}
        rightView={null}
        error={false}
        errorMessage=""
      />,
    );

    // Check if the placeholder text is rendered correctly
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('calls onChangeText with the correct input', () => {
    const onChangeTextMock = jest.fn();
    const {getByPlaceholderText} = render(
      <CustomInputs
        placeholder="Enter text"
        onChangeText={onChangeTextMock}
        rightView={null}
        error={false}
        errorMessage=""
      />,
    );

    // Simulate text change
    fireEvent.changeText(getByPlaceholderText('Enter text'), 'New Input');
    expect(onChangeTextMock).toHaveBeenCalledWith('New Input');
  });

  it('displays the error message if error is true', () => {
    const {getByText} = render(
      <CustomInputs
        placeholder="Enter text"
        onChangeText={() => {}}
        rightView={null}
        error={true}
        errorMessage="This is an error"
      />,
    );

    // Check if the error message is displayed when error is true
    expect(getByText('This is an error')).toBeTruthy();
  });

  it('does not display the error message if error is false', () => {
    const {queryByText} = render(
      <CustomInputs
        placeholder="Enter text"
        onChangeText={() => {}}
        rightView={null}
        error={false}
        errorMessage="This is an error"
      />,
    );

    // Ensure the error message is not present when error is false
    expect(queryByText('This is an error')).toBeNull();
  });

  it('displays rightView if provided', () => {
    const rightView = <Text>Icon</Text>;
    const {getByText} = render(
      <CustomInputs
        placeholder="Enter text"
        onChangeText={() => {}}
        rightView={rightView}
        error={false}
        errorMessage=""
      />,
    );

    // Check if the rightView is rendered when provided
    expect(getByText('Icon')).toBeTruthy();
  });
});
