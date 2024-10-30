import React from 'react';
import {render, fireEvent, cleanup} from '@testing-library/react-native';
import {it, describe, expect, jest, afterEach} from '@jest/globals';
import {RenderNewsItem} from '../src/components/RenderNewsItem';
import colors from '../src/utils/colors';

// Mock Navigation
const mockNavigation = {
  navigate: jest.fn(),
};

// Mock getDate function
jest.mock('../src/functions/getDate', () => ({
  getDate: jest.fn(date => `Formatted ${date}`), // Modify as per your needs
}));

describe('RenderNewsItem', () => {
  afterEach(cleanup);
  const item: NewsItemProps = {
    title: 'Sample News Title',
    source_name: 'Sample Source',
    published_datetime_utc: '2023-01-01T00:00:00Z',
    thumbnail_url: 'http://example.com/image.jpg',
    source_logo_url: 'http://example.com/logo.jpg',
  };

  const category = 'Sample Category';

  it('renders correctly', () => {
    const {getByText} = render(
      <RenderNewsItem item={item} category={category} />,
    );

    // Check if texts are rendered
    expect(getByText(item.source_name)).toBeTruthy();
    expect(getByText(item.title)).toBeTruthy();
    expect(getByText('Formatted 2023-01-01T00:00:00Z')).toBeTruthy(); // Check formatted date
  });

  it('navigates to details screen when pressed', () => {
    const {getByText} = render(
      <RenderNewsItem item={item} category={category} />,
    );

    fireEvent.press(getByText(item.title));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Details', {
      passedData: item,
      category,
    });
  });

  it('changes background color when pressed', () => {
    const {getByText} = render(
      <RenderNewsItem item={item} category={category} />,
    );

    const newsItem: any = getByText(item.title).parent;

    fireEvent.press(newsItem); // Trigger press event
    expect(newsItem.props.style[1].backgroundColor).toBe(colors.pressed);
  });

  it('renders the image correctly', () => {
    const {getByRole} = render(
      <RenderNewsItem item={item} category={category} />,
    );

    const image = getByRole('image');
    expect(image.props.source.uri).toBe(item.thumbnail_url || item.photo_url);
  });
});
