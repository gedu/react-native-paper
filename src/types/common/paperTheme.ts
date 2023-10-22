import type { $DeepPartial } from '@callstack/react-theme-provider';
import type { MD3Colors, PaperThemeBase, MD3Typescale } from 'src/types';

import type {
  TextButtonTheme,
  ElevatedButtonTheme,
  ContainedButtonTheme,
  OutlinedButtonTheme,
} from './buttonTheme';

export interface Colors extends MD3Colors {}

export interface TypeScale extends MD3Typescale {}

// TODO: for outside any specific theme must be optional
export interface PaperTheme extends PaperThemeBase {
  textButtonTheme?: TextButtonTheme;
  elevatedButtonTheme?: ElevatedButtonTheme;
  containedButtonTheme?: ContainedButtonTheme;
  outlinedButtonTheme?: OutlinedButtonTheme;
}

export interface PaperThemeProp extends $DeepPartial<PaperTheme> {}
