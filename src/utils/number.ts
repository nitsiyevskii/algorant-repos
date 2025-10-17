export const parsePositiveInteger = (text: string): number | null => {
  if (text === '') {
    return null;
  }

  const value = parseInt(text, 10);

  if (isNaN(value) || value <= 0) {
    return null;
  }

  return value;
};

export const isValidPositiveInteger = (text: string): boolean => {
  if (text === '') {
    return false;
  }

  const value = parseInt(text, 10);
  return !isNaN(value) && value > 0;
};

