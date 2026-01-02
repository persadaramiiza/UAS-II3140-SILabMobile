import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { colors, borderRadius, spacing } from '../theme';

export default function Card({ children, style, variant = 'elevated', padding = 'default' }) {
  return (
    <View style={[
      styles.card,
      variant === 'elevated' && styles.cardElevated,
      variant === 'outlined' && styles.cardOutlined,
      variant === 'flat' && styles.cardFlat,
      padding === 'none' && styles.paddingNone,
      padding === 'small' && styles.paddingSmall,
      padding === 'default' && styles.paddingDefault,
      padding === 'large' && styles.paddingLarge,
      style,
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  cardElevated: {
    ...Platform.select({
      ios: {
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardOutlined: {
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  cardFlat: {
    backgroundColor: colors.background.secondary,
  },
  paddingNone: {
    padding: 0,
  },
  paddingSmall: {
    padding: spacing.md,
  },
  paddingDefault: {
    padding: spacing.base,
  },
  paddingLarge: {
    padding: spacing.xl,
  },
});
