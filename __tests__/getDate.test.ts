import {cleanup} from '@testing-library/react-native';
import {getDate} from '../src/functions/getDate';
import {it, describe, expect, afterEach} from '@jest/globals';

describe('getDate', () => {
  afterEach(cleanup);
  it('formats a date string correctly', () => {
    const date = '2023-01-01';
    expect(getDate(date)).toBe('Jan 01, 2023');
  });

  it('returns correct month name for dates throughout the year', () => {
    const dates = [
      {input: '2023-02-15', output: 'Feb 15, 2023'},
      {input: '2023-03-10', output: 'Mar 10, 2023'},
      {input: '2023-12-25', output: 'Dec 25, 2023'},
    ];
    dates.forEach(({input, output}) => {
      expect(getDate(input)).toBe(output);
    });
  });

  it('adds a leading zero for days 1-9', () => {
    const date = '2023-05-05';
    expect(getDate(date)).toBe('May 05, 2023');
  });
});
