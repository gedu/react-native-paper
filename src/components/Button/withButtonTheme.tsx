import React from 'react';
import { StyleSheet } from 'react-native';

import color from 'color';

import { useInternalTheme } from '../../core/theming';
import { black, white } from '../../styles/themes/v2/colors';
import type { Props as ButtonThemeProps, ButtonTheme } from './ButtonNew';
import { getButtonTextColor } from './utils';

export const withButtonTheme = (
  WrappedButtonComponent: React.ComponentType<ButtonThemeProps>
) => {
  return function ButtonThemeAdapter(props: ButtonThemeProps) {
    const theme = useInternalTheme();
    const { isV3, roundness } = theme;

    const elevation = {
      initial: isV3 ? 1 : 2,
      active: isV3 ? 2 : 8,
      supportedMode: isV3 ? 'elevation' : 'contained',
    } as ButtonTheme['elevation'];
    const iconStyle = {
      icon: {
        reverse: {
          compact: isV3 ? styles.md3IconReverseCompact : {},
          normal: isV3 ? styles.md3IconReverse : {},
        },
        forward: {
          compact: isV3 ? styles.md3IconCompact : {},
          normal: isV3 ? styles.md3Icon : {},
        },
      },
      textMode: {
        reverse: {
          compact: isV3 ? styles.md3IconReverseTextModeCompact : {},
          normal: isV3 ? styles.md3IconReverseTextMode : {},
        },
        forward: {
          compact: isV3 ? styles.md3IconTextModeCompact : {},
          normal: isV3 ? styles.md3IconTextMode : {},
        },
      },
    };
    const textStyle = {
      getTextLabel: (isTextMode, hasIconOrLoading) => {
        if (!isV3) {
          return styles.md2Label;
        }

        if (!isTextMode) {
          return styles.md3Label;
        }

        if (hasIconOrLoading) {
          return styles.md3LabelTextAddons;
        }

        return styles.md3LabelText;
      },
    } as ButtonTheme['style']['textStyle'];
    const surfaceStyle = {
      getElevationStyle: (elevation) => (!isV3 ? { elevation } : {}),
      getElevationProp: (elevation) => (isV3 ? { elevation } : {}),
    } as ButtonTheme['style']['surfaceStyle'];

    const backgroundColor = {
      enabled: isV3
        ? {
            elevated: theme.colors.surfaceDisabled,
            contained: theme.colors.surfaceDisabled,
            'contained-tonal': theme.colors.surfaceDisabled,
          }
        : {
            contained: color(theme.dark ? white : black)
              .alpha(0.12)
              .rgb()
              .string(),
          },
      disabled: isV3
        ? {
            elevated: theme.colors.elevation.level1,
            contained: theme.colors.primary,
            'contained-tonal': theme.colors.secondaryContainer,
          }
        : {},
      default: 'transparent',
    };
    const outlineBorderColor = color(theme.dark ? white : black)
      .alpha(0.29)
      .rgb()
      .string();
    const borderColor = {
      enabled: {
        outlined: isV3 ? theme.colors.surfaceDisabled : outlineBorderColor,
      },
      disabled: {
        outlined: isV3 ? theme.colors.outline : outlineBorderColor,
      },
      default: 'transparent',
    };
    const borderWidth = {
      outlined: isV3 ? 1 : StyleSheet.hairlineWidth,
      default: 0,
    };
    const textColor = {
      getTextColor: ({ backgroundColor, isMode, disabled, dark }) =>
        getButtonTextColor({
          backgroundColor,
          isMode,
          disabled,
          dark,
          theme,
        }),
    } as ButtonTheme['style']['buttonStyle']['textColor'];

    const font = isV3 ? theme.fonts.labelLarge : theme.fonts.medium;
    const borderRadius = (isV3 ? 5 : 1) * roundness;
    const iconSize = isV3 ? 18 : 16;

    const buttonTheme = {
      elevation,
      font,
      borderRadius,
      iconSize,
      style: {
        iconStyle,
        textStyle,
        surfaceStyle,
        buttonStyle: { backgroundColor, borderColor, borderWidth, textColor },
      },
    };

    return (
      <WrappedButtonComponent
        {...props}
        theme={{
          ...theme,
          ...buttonTheme,
        }}
      />
    );
  };
};

const styles = StyleSheet.create({
  md2Label: {
    letterSpacing: 1,
  },
  md3Label: {
    marginVertical: 10,
    marginHorizontal: 24,
  },
  md3LabelTextAddons: {
    marginHorizontal: 16,
  },
  md3LabelText: {
    marginHorizontal: 12,
  },
  md3Icon: {
    marginLeft: 16,
    marginRight: -16,
  },
  md3IconCompact: {
    marginLeft: 8,
    marginRight: 0,
  },
  md3IconReverse: {
    marginLeft: -16,
    marginRight: 16,
  },
  md3IconReverseCompact: {
    marginLeft: 0,
    marginRight: 8,
  },
  md3IconTextMode: {
    marginLeft: 12,
    marginRight: -8,
  },
  md3IconTextModeCompact: {
    marginLeft: 6,
    marginRight: 0,
  },
  md3IconReverseTextMode: {
    marginLeft: -8,
    marginRight: 12,
  },
  md3IconReverseTextModeCompact: {
    marginLeft: 0,
    marginRight: 6,
  },
});
