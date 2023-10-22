import { useState, useEffect, useMemo } from 'react';
import {
  AccessibilityInfo,
  Appearance,
  ColorSchemeName,
  NativeEventSubscription,
} from 'react-native';

import type { PaperTheme } from 'src/types';

import { addEventListener } from '../../utils/addEventListener';
import { defaultPaperTheme } from '../theming';

export const useCreateThemeData = (theme?: PaperTheme) => {
  console.log('USE CREATE THEME HOOK');
  const colorSchemeName = (!theme && Appearance?.getColorScheme()) || 'light';
  const [colorScheme, setColorScheme] =
    useState<ColorSchemeName>(colorSchemeName);
  const [reduceMotionEnabled, setReduceMotionEnabled] = useState(false);

  const handleAppearanceChange = (
    preferences: Appearance.AppearancePreferences
  ) => {
    const { colorScheme } = preferences;
    setColorScheme(colorScheme);
  };

  useEffect(() => {
    let subscription: NativeEventSubscription | undefined;

    if (!theme) {
      subscription = addEventListener(
        AccessibilityInfo,
        'reduceMotionChanged',
        setReduceMotionEnabled
      );
    }
    return () => {
      if (!theme) {
        subscription?.remove();
      }
    };
  }, [theme]);

  useEffect(() => {
    let appearanceSubscription: NativeEventSubscription | undefined;
    if (theme) {
      appearanceSubscription = Appearance?.addChangeListener(
        handleAppearanceChange
      ) as NativeEventSubscription | undefined;
    }
    return () => {
      if (theme) {
        if (appearanceSubscription) {
          appearanceSubscription.remove();
        } else {
          // @ts-expect-error: We keep deprecated listener remove method for backwards compat with old RN versions
          Appearance?.removeChangeListener(handleAppearanceChange);
        }
      }
    };
  }, [theme]);

  const finalPaperTheme = useMemo(() => {
    console.log('FINAL PAPER THEME MEMO creation');
    const scheme = colorScheme ?? 'light';

    return {
      ...defaultPaperTheme[scheme],
      ...theme,
      animation: {
        ...theme?.animation,
        scale: reduceMotionEnabled ? 0 : 1,
      },
    };
  }, [theme, reduceMotionEnabled, colorScheme]);

  return finalPaperTheme;
};
