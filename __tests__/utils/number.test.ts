import { parsePositiveInteger, isValidPositiveInteger } from 'src/utils/number';

describe('parsePositiveInteger', () => {
  it('parses valid positive integer', () => {
    expect(parsePositiveInteger('123')).toBe(123);
    expect(parsePositiveInteger('1')).toBe(1);
    expect(parsePositiveInteger('999')).toBe(999);
  });

  it('returns null for empty string', () => {
    expect(parsePositiveInteger('')).toBeNull();
  });

  it('returns null for zero', () => {
    expect(parsePositiveInteger('0')).toBeNull();
  });

  it('returns null for negative numbers', () => {
    expect(parsePositiveInteger('-1')).toBeNull();
    expect(parsePositiveInteger('-100')).toBeNull();
  });

  it('returns null for non-numeric strings starting with letters', () => {
    expect(parsePositiveInteger('abc')).toBeNull();
    expect(parsePositiveInteger('a12')).toBeNull();
  });

  it('parses valid integer from strings with trailing non-numeric characters', () => {
    expect(parsePositiveInteger('12a')).toBe(12);
    expect(parsePositiveInteger('12!')).toBe(12);
  });

  it('parses integer part from decimal strings', () => {
    expect(parsePositiveInteger('12.5')).toBe(12);
    expect(parsePositiveInteger('1.1')).toBe(1);
  });

  it('returns null for special characters', () => {
    expect(parsePositiveInteger('!@#')).toBeNull();
  });
});

describe('isValidPositiveInteger', () => {
  it('validates positive integers', () => {
    expect(isValidPositiveInteger('123')).toBe(true);
    expect(isValidPositiveInteger('1')).toBe(true);
    expect(isValidPositiveInteger('999')).toBe(true);
  });

  it('returns false for empty string', () => {
    expect(isValidPositiveInteger('')).toBe(false);
  });

  it('returns false for zero', () => {
    expect(isValidPositiveInteger('0')).toBe(false);
  });

  it('returns false for negative numbers', () => {
    expect(isValidPositiveInteger('-1')).toBe(false);
    expect(isValidPositiveInteger('-100')).toBe(false);
  });

  it('returns false for non-numeric strings starting with letters', () => {
    expect(isValidPositiveInteger('abc')).toBe(false);
  });

  it('validates strings with trailing non-numeric characters as valid', () => {
    expect(isValidPositiveInteger('12a')).toBe(true);
  });

  it('validates decimal strings as valid (parses integer part)', () => {
    expect(isValidPositiveInteger('12.5')).toBe(true);
    expect(isValidPositiveInteger('1.1')).toBe(true);
  });
});

