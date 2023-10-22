import { useRef, useEffect } from 'react';
import { Animated, GestureResponderEvent } from 'react-native';

type ButtonEvent = (e: GestureResponderEvent) => void;

const useButtonElevation = (
  disabled: boolean | undefined,
  initialElevation: number,
  activeElevation: number,
  scale: number,
  onPressIn?: ButtonEvent,
  onPressOut?: ButtonEvent
): [Animated.Value, ButtonEvent, ButtonEvent] => {
  const { current: elevation } = useRef(
    new Animated.Value(!disabled ? initialElevation : 0)
  );

  useEffect(() => {
    elevation.setValue(!disabled ? initialElevation : 0);
  }, [disabled, elevation, initialElevation]);

  const handlePressIn = (e: GestureResponderEvent) => {
    onPressIn?.(e);
    Animated.timing(elevation, {
      toValue: activeElevation,
      duration: 200 * scale,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (e: GestureResponderEvent) => {
    onPressOut?.(e);
    Animated.timing(elevation, {
      toValue: initialElevation,
      duration: 150 * scale,
      useNativeDriver: true,
    }).start();
  };

  return [elevation, handlePressIn, handlePressOut];
};

export { useButtonElevation };
