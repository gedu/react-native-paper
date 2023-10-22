import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  ColorValue,
  Animated,
} from 'react-native';

import color from 'color';

import type {
  ColoredPaperTheme,
  RawPaperTheme,
} from '../../../types/common/buttonTheme';
import { isBoolean, isDark } from './typeVerification';

type ButtonStyle = {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
};
type TextButtonStyle = {
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
};

type AnimatedViewStyle = Animated.WithAnimatedValue<StyleProp<ViewStyle>>;

export class ColoredButtonCommand {
  private theme: ColoredPaperTheme;

  constructor(buttonTheme: ColoredPaperTheme) {
    this.theme = buttonTheme;
  }

  public getTextColor(userColor: string | undefined) {
    return userColor ?? this.theme.coloredButtonTheme.textColor.base;
  }

  public getTextStyle(userTextColor: string | undefined) {
    return {
      color: userTextColor ?? this.theme.coloredButtonTheme.textColor.base,
      ...this.theme.coloredButtonTheme.textLabelFont,
    };
  }

  public getRippleColor(
    userRippleColor: ColorValue | undefined,
    textColor: string | undefined
  ): ColorValue {
    if (userRippleColor) {
      return userRippleColor;
    }

    return color(textColor).alpha(0.12).rgb().string();
  }

  public getButtonStyle(
    userBackgroundColor: string | undefined,
    userTextColor: string | undefined,
    disabled: boolean | undefined,
    dark: boolean | undefined
  ): ButtonStyle {
    const backgroundColor = this.getButtonBackgroundColor(
      userBackgroundColor,
      disabled
    );
    const textColor = this.getButtonTextColor(
      backgroundColor,
      userTextColor,
      dark,
      disabled
    );
    const borderColor = this.getButtonBorderColor(disabled);
    const borderWidth = this.theme.coloredButtonTheme.borderWidth;
    const borderRadius =
      this.theme.coloredButtonTheme.borderRadius * this.theme.roundness;

    return {
      backgroundColor,
      textColor,
      borderColor,
      borderWidth,
      borderRadius,
    };
  }

  public getIconStyle(
    userContentStyle: any,
    styles: any,
    compact: boolean | undefined
  ) {
    return StyleSheet.flatten(userContentStyle)?.flexDirection === 'row-reverse'
      ? [
          styles.iconReverse,
          styles[`md3IconReverse${compact ? 'Compact' : ''}`],
        ]
      : [styles.icon, styles[`md3Icon${compact ? 'Compact' : ''}`]];
  }

  public getIconIndicatorStyle(userLabelStyle: any, buttonStyle: any) {
    const { color: customLabelColor, fontSize: customLabelSize } =
      StyleSheet.flatten(userLabelStyle) || {};

    return {
      color:
        typeof customLabelColor === 'string'
          ? customLabelColor
          : buttonStyle.textColor,
      fontSize: customLabelSize ?? this.theme.coloredButtonTheme.iconSize,
    };
  }

  private getButtonBackgroundColor(
    userBackgroundColor: string | undefined,
    disabled: boolean | undefined
  ) {
    if (userBackgroundColor && !disabled) {
      return userBackgroundColor;
    }

    if (disabled) {
      return this.theme.coloredButtonTheme.background.disabled;
    }

    return this.theme.coloredButtonTheme.background.base;
  }

  private getButtonTextColor(
    backgroundColor: string | undefined,
    userTextColor: string | undefined,
    dark: boolean | undefined,
    disabled: boolean | undefined
  ) {
    if (userTextColor && !disabled) {
      return userTextColor;
    }

    if (disabled) {
      return this.theme.coloredButtonTheme.textColor.disabled;
    }

    if (isBoolean(dark)) {
      return isDark(dark, backgroundColor)
        ? this.theme.coloredButtonTheme.textColor.lightAlternative
        : this.theme.coloredButtonTheme.textColor.darkAlternative;
    }

    return this.theme.coloredButtonTheme.textColor.base;
  }

  private getButtonBorderColor(disabled: boolean | undefined) {
    return disabled
      ? this.theme.coloredButtonTheme.borderColor.disabled
      : this.theme.coloredButtonTheme.borderColor.base;
  }
}
// would be better to create a custom hook than a class?
export class RawButtonCommand {
  private theme: RawPaperTheme;

  constructor(buttonTheme: RawPaperTheme) {
    this.theme = buttonTheme;
  }

  public getTextColor(userColor: string | undefined) {
    return userColor ?? this.theme.rawButtonTheme.textColor.base;
  }

  public getIconStyle(
    contentStyle: StyleProp<ViewStyle> | undefined,
    compact: boolean | undefined,
    mode: 'text' | 'outlined',
    styles: any
  ) {
    const iconStyle =
      StyleSheet.flatten(contentStyle)?.flexDirection === 'row-reverse'
        ? [
            styles.iconReverse,
            styles[`md3IconReverse${compact ? 'Compact' : ''}`],
            mode === 'text' &&
              styles[`md3IconReverseTextMode${compact ? 'Compact' : ''}`],
          ]
        : [
            styles.icon,
            styles[`md3Icon${compact ? 'Compact' : ''}`],
            mode === 'text' &&
              styles[`md3IconTextMode${compact ? 'Compact' : ''}`],
          ];

    return iconStyle;
  }

  public getTextStyle(
    userTextColor: string | undefined,
    disabled: boolean | undefined
  ) {
    let color = this.theme.rawButtonTheme.textColor.base;

    if (userTextColor && !disabled) {
      color = userTextColor;
    }

    if (disabled) {
      color = this.theme.rawButtonTheme.textColor.disabled;
    }

    return {
      color,
      ...this.theme.rawButtonTheme.textLabelFont,
    };
  }

  public getRippleColor(
    userRippleColor: ColorValue | undefined,
    textColor: string | undefined
  ): ColorValue {
    if (userRippleColor) {
      return userRippleColor;
    }

    return color(textColor).alpha(0.12).rgb().string();
  }

  public getButtonStyle(disabled: boolean | undefined): TextButtonStyle {
    const borderWidth = this.theme.rawButtonTheme.borderWidth;
    const borderRadius =
      this.theme.rawButtonTheme.borderRadius * this.theme.roundness;
    const borderColor = disabled
      ? this.theme.rawButtonTheme.borderColor.disabled
      : this.theme.rawButtonTheme.borderColor.base;

    return {
      borderColor,
      borderWidth,
      borderRadius,
    };
  }

  public getTouchableStyle(
    userStyle: AnimatedViewStyle | undefined
  ): StyleProp<ViewStyle> {
    const borderRadius =
      this.theme.rawButtonTheme.borderRadius * this.theme.roundness;
    return {
      borderRadius: userStyle
        ? ((StyleSheet.flatten(userStyle) || {}) as ViewStyle).borderRadius ??
          borderRadius
        : borderRadius,
    };
  }

  public getIconIndicatorStyle(userLabelStyle: any, textStyle: any) {
    const { color: customLabelColor, fontSize: customLabelSize } =
      StyleSheet.flatten(userLabelStyle) || {};

    return {
      color:
        typeof customLabelColor === 'string'
          ? customLabelColor
          : textStyle.color,
      fontSize: customLabelSize ?? this.theme.rawButtonTheme.iconSize,
    };
  }

  public getLabelStyle(
    mode: 'text' | 'outlined',
    styles: any,
    isIconOrLoading: boolean | undefined
  ) {
    if (mode === 'outlined') {
      return styles.md3Label;
    }
    if (isIconOrLoading) {
      return styles.md3LabelTextAddons;
    }
    return styles.md3LabelText;
  }
}
