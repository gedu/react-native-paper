import type { MD3Colors, MD3Type } from '../types';
import type { PaperTheme } from './paperTheme';

export interface ColoredPaperTheme extends PaperTheme {
  coloredButtonTheme: ColorBaseButtonTheme;
}

export interface RawPaperTheme extends PaperTheme {
  rawButtonTheme: RawBaseButtonTheme;
}

export interface ButtonTheme {
  textLabelFont: MD3Type;
  borderRadius: number;
  iconSize: number;
  // for backward compatibility
  textLabelUppercase: boolean;
}

export interface ColorBaseButtonTheme extends ButtonTheme {
  background: {
    base: MD3Colors['elevation']['level1'];
    disabled: MD3Colors['surfaceDisabled'];
  };
  textColor: {
    base: MD3Colors['primary'];
    disabled: MD3Colors['onSurfaceDisabled'];
    darkAlternative: string;
    lightAlternative: string;
  };
  borderColor: {
    base: 'transparent';
    disabled: 'transparent';
  };
  borderWidth: 0;
  initialElevation: number;
  endElevation: number;
}

export interface RawBaseButtonTheme extends ButtonTheme {
  background: {
    base: MD3Colors['primary'];
    readonly disabled: MD3Colors['surfaceDisabled'];
  };
  textColor: {
    base: MD3Colors['primary'];
    disabled: MD3Colors['onSurfaceDisabled'];
  };
  // TODO: this should be just in outlined button theme
  borderColor: {
    base: 'transparent' | string;
    disabled: 'transparent' | string;
  };
  borderWidth: number;
}

export interface ElevatedButtonTheme extends ColorBaseButtonTheme {}

export interface ContainedButtonTheme extends ColorBaseButtonTheme {}

export interface TextButtonTheme extends RawBaseButtonTheme {}

export interface OutlinedButtonTheme extends RawBaseButtonTheme {}
