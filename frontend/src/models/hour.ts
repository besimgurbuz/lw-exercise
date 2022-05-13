export const HOUR_VALUES = Array.from({ length: 23 }).map((_, i) => i + 1);

export const HOUR_TEXTS = HOUR_VALUES.map(
  (value) => `${value % 12} ${value >= 12 ? 'PM' : 'AM'}`
);
