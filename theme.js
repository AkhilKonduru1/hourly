import { Platform } from 'react-native';

export const colors = {
  bgBody: '#F4F4F4',
  bgCard: '#FFFFFF',
  bgCardGlass: 'rgba(255, 255, 255, 0.7)',
  bgInput: '#EAEAEA',

  textPrimary: '#1A1A1A',
  textSecondary: '#666666',
  textTertiary: '#999999',

  accentPurple: '#5A4B75',
  accentBlue: '#8CA6D6',
  accentPink: '#F2C4C4',
  accentBlack: '#000000',

  border: 'rgba(0,0,0,0.05)',
  borderLight: 'rgba(255,255,255,0.6)',
  cardShadow: 'rgba(0,0,0,0.03)',

  statusApproved: '#4A7C59',
  statusPending: '#B8860B',
  statusRejected: '#8B3A3A',
};

export const spacing = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
};

export const radii = {
  lg: 32,
  md: 24,
  sm: 100,
};

export const fonts = {
  serif: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  sans: Platform.OS === 'ios' ? undefined : undefined, // system default
};
