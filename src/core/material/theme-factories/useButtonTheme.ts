import { useMemo } from 'react';

import type { $DeepPartial } from '@callstack/react-theme-provider';
import type { PaperTheme } from 'src/types';

import type {
  ColoredPaperTheme,
  RawPaperTheme,
} from '../../../types/common/buttonTheme';
import { useRootPaperTheme } from '../../theming';

type PartialPaperTheme = $DeepPartial<PaperTheme> | undefined;

const useElevatedButtonTheme = (
  overrideTheme: PartialPaperTheme
): ColoredPaperTheme => {
  const mainTheme = useRootPaperTheme(overrideTheme);

  const elevatedTheme: ColoredPaperTheme = useMemo(
    () => ({
      ...mainTheme,
      coloredButtonTheme: {
        textLabelFont: mainTheme.fonts.labelLarge,
        borderRadius: 5,
        iconSize: 18,
        textLabelUppercase: false,
        background: {
          base: mainTheme.colors.elevation.level1,
          disabled: mainTheme.colors.surfaceDisabled,
        },
        textColor: {
          base: mainTheme.colors.primary,
          disabled: mainTheme.colors.onSurfaceDisabled,
          darkAlternative: mainTheme.colors.onSurface, // change to white
          lightAlternative: mainTheme.colors.onSurface, // change to black
        },
        borderColor: {
          base: 'transparent',
          disabled: 'transparent',
        },
        borderWidth: 0,
        initialElevation: 1,
        endElevation: 2,
        ...mainTheme.elevatedButtonTheme,
      },
    }),
    [mainTheme]
  );

  return elevatedTheme;
};

const useContainedButtonTheme = (
  overrideTheme: PartialPaperTheme,
  mode: 'contained' | 'contained-tonal'
): ColoredPaperTheme => {
  const mainTheme = useRootPaperTheme(overrideTheme);

  const containedTheme: ColoredPaperTheme = useMemo(
    () => ({
      ...mainTheme,
      coloredButtonTheme: {
        textLabelFont: mainTheme.fonts.labelLarge,
        borderRadius: 5,
        iconSize: 18,
        textLabelUppercase: false,
        background: {
          base:
            mode === 'contained'
              ? mainTheme.colors.primary
              : mainTheme.colors.secondaryContainer,
          disabled: mainTheme.colors.surfaceDisabled,
        },
        textColor: {
          base:
            mode === 'contained'
              ? mainTheme.colors.onPrimary
              : mainTheme.colors.onSecondaryContainer,
          disabled: mainTheme.colors.onSurfaceDisabled,
          darkAlternative: mainTheme.colors.onSurface, // change to white
          lightAlternative: mainTheme.colors.onSurface, // change to black
        },
        borderColor: {
          base: 'transparent',
          disabled: 'transparent',
        },
        borderWidth: 0,
        initialElevation: 0,
        endElevation: 0,
        ...mainTheme.containedButtonTheme,
      },
    }),
    [mainTheme, mode]
  );
  return containedTheme;
};

const useRawButtonTheme = (
  overrideTheme: PartialPaperTheme,
  mode: 'text' | 'outlined'
): RawPaperTheme => {
  const mainTheme = useRootPaperTheme(overrideTheme);

  const rawTheme: RawPaperTheme = useMemo(
    () => ({
      ...mainTheme,
      rawButtonTheme: {
        textLabelFont: mainTheme.fonts.labelLarge,
        borderRadius: 5,
        iconSize: 18,
        textLabelUppercase: false,
        background: {
          base: 'transparent',
          disabled: 'transparent',
        },
        textColor: {
          base: mainTheme.colors.primary,
          disabled: mainTheme.colors.onSurfaceDisabled,
        },
        borderColor: {
          base: mode === 'text' ? 'transparent' : mainTheme.colors.outline,
          disabled:
            mode === 'text' ? 'transparent' : mainTheme.colors.surfaceDisabled,
        },
        borderWidth: mode === 'text' ? 0 : 1,
        ...mainTheme.textButtonTheme,
      },
    }),
    [mainTheme, mode]
  );
  return rawTheme;
};

export { useElevatedButtonTheme, useContainedButtonTheme, useRawButtonTheme };
