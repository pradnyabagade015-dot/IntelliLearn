export const Colors = {
  primary: '#15803D', // Forest Green (Primary)
  primaryLight: '#DCFCE7', // Light green tint
  primaryDark: '#14532D', // Deep evergreen
  primaryHover: '#166534',

  secondary: '#0D9488', // Teal (Secondary)
  secondaryLight: '#CCFBF1', // Light teal tint
  secondaryDark: '#115E59',

  accent: '#10B981', // Emerald green
  accentLight: '#ECFDF5',

  background: '#F6FBF7', // Very light eco green-white
  backgroundAlt: '#EBF5EE',
  card: '#FFFFFF',
  cardBorder: '#D1E7D6',

  text: '#0B2B1B', // Dark forest green / near-black
  textSecondary: '#3F6250', // Muted forest green
  textMuted: '#6B8F7C',

  success: '#15803D',
  successLight: '#DCFCE7',
  warning: '#D97706',
  warningLight: '#FEF3C7',
  danger: '#DC2626',
  dangerLight: '#FEE2E2',

  dark: {
    background: '#071A10',
    card: '#0D2E1E',
    cardBorder: '#184732',
    text: '#E8F5EE',
    textSecondary: '#8EB8A1',
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
