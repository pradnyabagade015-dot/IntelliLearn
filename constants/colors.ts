export const Colors = {
  primary: '#2563EB', // Royal Blue
  primaryLight: '#EFF6FF', // Soft Blue tint
  primaryDark: '#1E40AF', // Deep Navy Blue
  primaryHover: '#1D4ED8',

  secondary: '#4F46E5', // Indigo
  secondaryLight: '#EEF2FF', // Soft Indigo tint
  secondaryDark: '#3730A3',

  accent: '#0EA5E9', // Ocean Sky Blue
  accentLight: '#F0F9FF',

  background: '#F8FAFC', // Slate light crisp background
  backgroundAlt: '#F1F5F9',
  card: '#FFFFFF',
  cardBorder: '#E2E8F0',

  text: '#0F172A', // Slate 900
  textSecondary: '#475569', // Slate 600
  textMuted: '#94A3B8', // Slate 400

  success: '#16A34A',
  successLight: '#DCFCE7',
  warning: '#D97706',
  warningLight: '#FEF3C7',
  danger: '#DC2626',
  dangerLight: '#FEE2E2',

  dark: {
    background: '#0B1120',
    card: '#1E293B',
    cardBorder: '#334155',
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
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
