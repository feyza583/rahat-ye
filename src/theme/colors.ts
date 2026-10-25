export interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  primaryText: string;
  danger: string;
  disabled: string;
  disabledText: string;
  successBg: string;
  errorBg: string;
}

export const lightColors: ThemeColors = {
  background: '#f5f5f5',
  surface: '#ffffff',
  text: '#1b1b1b',
  textMuted: '#666666',
  border: '#dddddd',
  primary: '#2e7d32',
  primaryText: '#ffffff',
  danger: '#d32f2f',
  disabled: '#cfd8dc',
  disabledText: '#78909c',
  successBg: '#c8e6c9',
  errorBg: '#ffcdd2',
};

export const darkColors: ThemeColors = {
  background: '#121212',
  surface: '#1e1e1e',
  text: '#f2f2f2',
  textMuted: '#a0a0a0',
  border: '#3a3a3a',
  primary: '#4caf50',
  primaryText: '#0b1f0c',
  danger: '#ef5350',
  disabled: '#2c2c2c',
  disabledText: '#777777',
  successBg: '#1b3a1d',
  errorBg: '#4a1f1f',
};