import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#000000',
    background: '#FFFFFF',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',

    primary: '#4F46E5',
    primaryPressed: '#4338CA',

    secondary: '#14B8A6',
    secondaryPressed: '#0F9E8D',

    tertiary: '#F59E0B',
    tertiaryPressed: '#D97706',

    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',

    border: '#D7D9DE',
    divider: '#E7E9EE',

    disabled: '#C8CCD3',
    disabledText: '#8A8F98',

    points: '#F59E0B',
    reward: '#8B5CF6',
  },

  dark: {
    text: '#FFFFFF',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',

    primary: '#6366F1',
    primaryPressed: '#4F46E5',

    secondary: '#2DD4BF',
    secondaryPressed: '#14B8A6',

    tertiary: '#FBBF24',
    tertiaryPressed: '#F59E0B',

    success: '#4ADE80',
    warning: '#FBBF24',
    error: '#F87171',
    info: '#60A5FA',

    border: '#3A3D42',
    divider: '#2A2D31',

    disabled: '#4A4D52',
    disabledText: '#7A7F87',

    points: '#FBBF24',
    reward: '#A78BFA',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BorderRadius = {
  small: 4,
  medium: 8,
  large: 16,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
