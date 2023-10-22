import React from 'react';
import {
  Animated,
  ColorValue,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import type { ColoredButtonCommand } from '../../core/material/commands/buttonCommand';
// import { useInternalTheme } from '../../core/theming';
import type { $Omit, ColorBaseButtonTheme } from '../../types';
import type { PaperTheme } from '../../types/common/paperTheme';
import hasTouchHandler from '../../utils/hasTouchHandler';
import ActivityIndicator from '../ActivityIndicator';
import Icon, { IconSource } from '../Icon';
import Surface from '../Surface';
import TouchableRipple from '../TouchableRipple/TouchableRipple';
import Text from '../Typography/Text';
import { styles } from './Button.style';
import { useButtonElevation } from './useButtonElevation';
// import { ButtonMode, getButtonColors } from './utils';

export type Props = $Omit<React.ComponentProps<typeof Surface>, 'mode'> & {
  /**
   * Deprecate this
   * Mode of the button. You can change the mode to adjust the styling to give it desired emphasis.
   * - `text` - flat button without background or outline, used for the lowest priority actions, especially when presenting multiple options.
   * - `outlined` - button with an outline without background, typically used for important, but not primary action – represents medium emphasis.
   * - `contained` - button with a background color, used for important action, have the most visual impact and high emphasis.
   * - `elevated` - button with a background color and elevation, used when absolutely necessary e.g. button requires visual separation from a patterned background. @supported Available in v5.x with theme version 3
   * - `contained-tonal` - button with a secondary background color, an alternative middle ground between contained and outlined buttons. @supported Available in v5.x with theme version 3
   */
  mode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
  /**
   * Whether the color is a dark color. A dark button will render light text and vice-versa. Only applicable for:
   *  * `contained` mode for theme version 2
   *  * `contained`, `contained-tonal` and `elevated` modes for theme version 3.
   */
  dark?: boolean;
  /**
   * Use a compact look, useful for `text` buttons in a row.
   */
  compact?: boolean;
  /**
   * @deprecated Deprecated in v5.x - use `buttonColor` or `textColor` instead.
   * Custom text color for flat button, or background color for contained button.
   */
  color?: string;
  /**
   * Custom button's background color.
   */
  buttonColor?: string;
  /**
   * Custom button's text color.
   */
  textColor?: string;
  /**
   * Color of the ripple effect.
   */
  rippleColor?: ColorValue;
  /**
   * Whether to show a loading indicator.
   */
  loading?: boolean;
  /**
   * Icon to display for the `Button`.
   */
  icon?: IconSource;
  /**
   * Whether the button is disabled. A disabled button is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean;
  /**
   * Label text of the button.
   */
  children: React.ReactNode;
  /**
   * Make the label text uppercased. Note that this won't work if you pass React elements as children.
   */
  uppercase?: boolean;
  /**
   * Accessibility label for the button. This is read by the screen reader when the user taps the button.
   */
  accessibilityLabel?: string;
  /**
   * Accessibility hint for the button. This is read by the screen reader when the user taps the button.
   */
  accessibilityHint?: string;
  /**
   * Function to execute on press.
   */
  onPress?: (e: GestureResponderEvent) => void;
  /**
   * Function to execute as soon as the touchable element is pressed and invoked even before onPress.
   */
  onPressIn?: (e: GestureResponderEvent) => void;
  /**
   * Function to execute as soon as the touch is released even before onPress.
   */
  onPressOut?: (e: GestureResponderEvent) => void;
  /**
   * Function to execute on long press.
   */
  onLongPress?: (e: GestureResponderEvent) => void;
  /**
   * The number of milliseconds a user must touch the element before executing `onLongPress`.
   */
  delayLongPress?: number;
  /**
   * Style of button's inner content.
   * Use this prop to apply custom height and width and to set the icon on the right with `flexDirection: 'row-reverse'`.
   */
  contentStyle?: StyleProp<ViewStyle>;
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  /**
   * Style for the button text.
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * @optional
   */
  theme: PaperTheme;

  buttonCommand: ColoredButtonCommand;
  /**
   * testID to be used on tests.
   */
  testID?: string;
};

type ContainedBaseButtonProps = Omit<Props, 'mode'> & {
  theme: PaperTheme & { coloredButtonTheme: ColorBaseButtonTheme };
  mode: 'contained' | 'contained-tonal';
};

type ElevatedBaseButtonProps = Omit<Props, 'mode'> & {
  theme: PaperTheme & { coloredButtonTheme: ColorBaseButtonTheme };
  mode?: undefined;
};

type ColorBaseButtonProps = ContainedBaseButtonProps | ElevatedBaseButtonProps;

const ColorBaseButton = ({
  theme,
  buttonCommand,
  disabled,
  loading,
  onPressIn,
  onPressOut,
  onPress,
  onLongPress,
  delayLongPress,
  compact,
  dark,
  uppercase: uppercaseProp,
  rippleColor: customRippleColor,
  icon,
  style,
  labelStyle,
  contentStyle,
  buttonColor: customButtonColor,
  textColor: customTextColor,
  accessibilityLabel,
  accessibilityHint,
  accessible,
  children,
  testID = 'colored-base-button',
  ...rest
}: ColorBaseButtonProps) => {
  const {
    coloredButtonTheme: {
      initialElevation,
      endElevation,
      textLabelFont: font,
      textLabelUppercase,
    },
    animation,
  } = theme;

  const [elevation, handlePressIn, handlePressOut] = useButtonElevation(
    disabled,
    initialElevation,
    endElevation,
    animation.scale,
    onPressIn,
    onPressOut
  );

  const buttonStyle = buttonCommand.getButtonStyle(
    customButtonColor,
    customTextColor,
    disabled,
    dark
  );

  const iconStyle = buttonCommand.getIconStyle(contentStyle, styles, compact);
  const textStyle = {
    color: buttonStyle.textColor,
    ...font,
  };

  const rippleColor = buttonCommand.getRippleColor(
    customRippleColor,
    buttonStyle.textColor
  );

  const uppercase = uppercaseProp ?? textLabelUppercase;

  const hasPassedTouchHandler = hasTouchHandler({
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
  });

  // Will be built with help of theme and Command
  const touchableStyle = {
    borderRadius: style
      ? ((StyleSheet.flatten(style) || {}) as ViewStyle).borderRadius ??
        buttonStyle.borderRadius
      : buttonStyle.borderRadius,
  };

  const { color, fontSize } = buttonCommand.getIconIndicatorStyle(
    labelStyle,
    buttonStyle
  );

  return (
    <Surface
      {...rest}
      testID={`${testID}-container`}
      style={
        [
          styles.button,
          compact && styles.compact,
          buttonStyle,
          style,
        ] as ViewStyle
      }
      mode={'elevated'}
      elevation={elevation}
    >
      <TouchableRipple
        borderless
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={hasPassedTouchHandler ? handlePressIn : undefined}
        onPressOut={hasPassedTouchHandler ? handlePressOut : undefined}
        delayLongPress={delayLongPress}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        accessible={accessible}
        disabled={disabled}
        rippleColor={rippleColor}
        style={touchableStyle}
        testID={testID}
        theme={theme}
      >
        <View style={[styles.content, contentStyle]}>
          {icon && loading !== true ? (
            <View style={iconStyle} testID={`${testID}-icon-container`}>
              <Icon source={icon} size={fontSize} color={color} />
            </View>
          ) : null}
          {loading ? (
            <ActivityIndicator
              size={fontSize}
              color={color}
              style={iconStyle}
            />
          ) : null}
          <Text
            variant="labelLarge"
            selectable={false}
            numberOfLines={1}
            testID={`${testID}-text`}
            style={[
              styles.label,
              styles.md3Label,
              compact && styles.compactLabel,
              uppercase && styles.uppercaseLabel,
              textStyle,
              labelStyle,
            ]}
          >
            {children}
          </Text>
        </View>
      </TouchableRipple>
    </Surface>
  );
};

export { ColorBaseButton };
