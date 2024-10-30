import React from 'react';
import {render, fireEvent, cleanup} from '@testing-library/react-native';
import {it, describe, expect, jest, afterEach} from '@jest/globals';
import {CategoryButtons} from '../src/components/CategoryButtons';
import staticData from '../src/utils/staticData';
import colors from '../src/utils/colors';

describe('CategoryButtons Component', () => {
  afterEach(cleanup);

  it('should render category buttons with correct initial styles', () => {
    const {getByText} = render(
      <CategoryButtons activeCategory={0} onCategoryPress={jest.fn()} />,
    );

    // Verify that each category button is rendered with initial styles
    staticData.categoryList.forEach((item, index) => {
      const button = getByText(item.title);

      // Check button background color based on activeCategory
      const expectedBgColor = index === 0 ? colors.primary : colors.greyLight;
      expect(button.parent?.props.style).toEqual(
        expect.arrayContaining([{backgroundColor: expectedBgColor}]),
      );

      // Check text color based on activeCategory
      const expectedTextColor = index === 0 ? '#fff' : '#777';
      expect(button.props.style).toEqual(
        expect.arrayContaining([{color: expectedTextColor}]),
      );
    });
  });

  it('should update styles when a button is pressed', () => {
    const onCategoryPressMock = jest.fn();
    const {getByText} = render(
      <CategoryButtons
        activeCategory={0}
        onCategoryPress={onCategoryPressMock}
      />,
    );

    // Simulate pressing the second button
    const secondButton = getByText(staticData.categoryList[1].title);
    fireEvent.press(secondButton);

    // Check if onCategoryPress is called with the correct index
    expect(onCategoryPressMock).toHaveBeenCalledWith(1);

    // Rerender component with updated activeCategory
    const {rerender} = render(
      <CategoryButtons
        activeCategory={1}
        onCategoryPress={onCategoryPressMock}
      />,
    );
    rerender(
      <CategoryButtons
        activeCategory={1}
        onCategoryPress={onCategoryPressMock}
      />,
    );

    // Verify updated styles for the second button
    expect(secondButton.parent?.props.style).toEqual(
      expect.arrayContaining([{backgroundColor: colors.primary}]),
    );
    expect(secondButton.props.style).toEqual(
      expect.arrayContaining([{color: '#fff'}]),
    );
  });
});
