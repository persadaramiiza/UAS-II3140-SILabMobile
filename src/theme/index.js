// Theme exports
export { colors } from './colors';
export { spacing, padding, margin } from './spacing';
export { typography } from './typography';

import { Platform } from 'react-native';

// Common shadow styles for both iOS and Android
const shadows = {
  small: {
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    android: {
      elevation: 2,
    },
  },
  medium: {
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 3,
    },
  },
  large: {
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    android: {
      elevation: 5,
    },
  },
};

// Platform-specific shadow helper
export const shadow = {
  small: Platform.OS === 'ios' ? shadows.small.ios : shadows.small.android,
  medium: Platform.OS === 'ios' ? shadows.medium.ios : shadows.medium.android,
  large: Platform.OS === 'ios' ? shadows.large.ios : shadows.large.android,
};

// Border radius values
export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};
