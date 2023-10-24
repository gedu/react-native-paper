import React, { useMemo } from 'react';
import type {
  StyleProp,
  ViewStyle,
  TextStyle,
  ColorValue,
  Animated,
  GestureResponderEvent,
} from 'react-native';

import type { $DeepPartial } from '@callstack/react-theme-provider';

import {
  ColoredButtonCommand,
  RawButtonCommand,
} from '../../core/material/commands/buttonCommand';
import {
  useContainedButtonTheme,
  useElevatedButtonTheme,
  useRawButtonTheme,
} from '../../core/material/theme-factories/useButtonTheme';
import type { $Omit, PaperTheme } from '../../types';
import type { IconSource } from '../Icon';
import type Surface from '../Surface';
// import { ButtonMode, getButtonColors } from './utils';
import { ColorBaseButton } from './ColorBaseButton';
import { RawBaseButton } from './RawBaseButton';

export type Props = $Omit<React.ComponentProps<typeof Surface>, 'mode'> & {
  /**
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
  theme?: PaperTheme;
  /**
   * testID to be used on tests.
   */
  testID?: string;
};

type ElevatedButtonProps = Omit<Props, 'mode' | 'theme'> & {
  theme?: Omit<
    $DeepPartial<PaperTheme>,
    'textButtonTheme' | 'containedButtonTheme' | 'outlinedButtonTheme'
  >;
};
type TextButtonProps = Omit<Props, 'mode' | 'theme'> & {
  theme?: Omit<
    $DeepPartial<PaperTheme>,
    'elevatedButtonTheme' | 'containedButtonTheme' | 'outlinedButtonTheme'
  >;
};
type OutlinedButtonProps = Omit<Props, 'mode' | 'theme'> & {
  theme?: Omit<
    $DeepPartial<PaperTheme>,
    'elevatedButtonTheme' | 'containedButtonTheme' | 'textButtonTheme'
  >;
};
type ContainedButtonProps = Omit<Props, 'mode' | 'theme'> & {
  mode: 'contained' | 'contained-tonal';
  theme?: Omit<
    $DeepPartial<PaperTheme>,
    'elevatedButtonTheme' | 'outlinedButtonTheme' | 'textButtonTheme'
  >;
};

const Button = ({ mode = 'text', ...rest }: Props) => {
  if (mode === 'text') {
    return <TextButton {...rest} />;
  }

  if (mode === 'elevated') {
    return <ElevatedButton {...rest} />;
  }

  if (mode === 'outlined') {
    return <OutlinedButton {...rest} />;
  }

  return <ContainedButton {...rest} mode={mode} />;
};

const ElevatedButton = ({
  theme: themeOverrides,
  children,
  testID = 'elevated-button',
  ...rest
}: ElevatedButtonProps) => {
  const theme = useElevatedButtonTheme(themeOverrides); // this theme must return {PaperTheme, ElevatedButtonTheme}
  const elevatedButtonCommand = useMemo(
    () => new ColoredButtonCommand(theme),
    [theme]
  );

  return (
    <ColorBaseButton
      {...rest}
      theme={theme}
      buttonCommand={elevatedButtonCommand}
      testID={testID}
    >
      {children}
    </ColorBaseButton>
  );
};

const ContainedButton = ({
  theme: themeOverrides,
  children,
  mode = 'contained',
  testID = `${mode}-contained-button`,
  ...rest
}: ContainedButtonProps) => {
  const theme = useContainedButtonTheme(themeOverrides, mode);
  const containedButtonCommand = useMemo(
    () => new ColoredButtonCommand(theme),
    [theme]
  );

  return (
    <ColorBaseButton
      {...rest}
      theme={theme}
      mode={mode}
      buttonCommand={containedButtonCommand}
      testID={testID}
    >
      {children}
    </ColorBaseButton>
  );
};

const TextButton = ({
  theme: themeOverrides,
  children,
  testID = 'text-button',
  ...rest
}: TextButtonProps) => {
  const theme = useRawButtonTheme(themeOverrides, 'text');
  const textButtonCommand = useMemo(() => new RawButtonCommand(theme), [theme]);

  return (
    <RawBaseButton
      {...rest}
      mode="text"
      theme={theme}
      buttonCommand={textButtonCommand}
      testID={testID}
    >
      {children}
    </RawBaseButton>
  );
};

const OutlinedButton = ({
  theme: themeOverrides,
  children,
  testID = 'outlined-button',
  ...rest
}: OutlinedButtonProps) => {
  const theme = useRawButtonTheme(themeOverrides, 'outlined');
  const textButtonCommand = useMemo(() => new RawButtonCommand(theme), [theme]);

  return (
    <RawBaseButton
      {...rest}
      mode="outlined"
      theme={theme}
      buttonCommand={textButtonCommand}
      testID={testID}
    >
      {children}
    </RawBaseButton>
  );
};

export { TextButton, ElevatedButton, ContainedButton, OutlinedButton };

export default Button;
