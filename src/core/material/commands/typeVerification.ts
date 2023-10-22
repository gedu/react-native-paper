import color from 'color';

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

export const isDark = (dark?: boolean, backgroundColor?: string) => {
  if (isBoolean(dark)) {
    return dark;
  }

  if (backgroundColor === 'transparent') {
    return false;
  }

  if (backgroundColor !== 'transparent') {
    return !color(backgroundColor).isLight();
  }

  return false;
};
