export const Colors = {
  primary: '#15803D', // Forest Green
  primaryLight: '#EBF5EE', // Soft light green tint
  primaryDark: '#14532D', // Dark Forest Green
  primaryHover: '#166534',

  secondary: '#0D9488', // Teal
  secondaryLight: '#E6FFFA', // Soft Teal tint
  secondaryDark: '#115E59', // Dark Teal

  accent: '#059669', // Emerald accent
  accentLight: '#D1FAE5',

  background: '#F6FBF7', // Clean light background
  backgroundAlt: '#EDF7EF',
  card: '#FFFFFF',
  cardBorder: '#D1E7D6', // Subtle green-tinted card border

  text: '#0B2B1B', // Primary dark forest text
  textSecondary: '#3F6250', // Secondary green-slate text
  textMuted: '#6B8F7B',

  success: '#15803D',
  successLight: '#DCFCE7',
  warning: '#D97706',
  warningLight: '#FEF3C7',
  danger: '#DC2626',
  dangerLight: '#FEE2E2',

  dark: {
    background: '#071A11',
    card: '#0D2E1F',
    cardBorder: '#1A4D35',
    text: '#F6FBF7',
    textSecondary: '#A3C4B2',
  },
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const MaxWidth = 900;
