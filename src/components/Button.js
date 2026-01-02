import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, Platform, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, borderRadius, shadow } from '../theme';

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium',
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
  fullWidth = false,
}) {
  const buttonStyles = [
    styles.button,
    size === 'small' && styles.buttonSmall,
    size === 'medium' && styles.buttonMedium,
    size === 'large' && styles.buttonLarge,
    variant === 'primary' && styles.primaryButton,
    variant === 'secondary' && styles.secondaryButton,
    variant === 'outline' && styles.outlineButton,
    variant === 'ghost' && styles.ghostButton,
    (disabled || loading) && styles.disabledButton,
    fullWidth && styles.fullWidth,
    style,
  ];

  const textStyles = [
    styles.buttonText,
    size === 'small' && styles.buttonTextSmall,
    size === 'medium' && styles.buttonTextMedium,
    size === 'large' && styles.buttonTextLarge,
    variant === 'primary' && styles.primaryButtonText,
    variant === 'secondary' && styles.secondaryButtonText,
    variant === 'outline' && styles.outlineButtonText,
    variant === 'ghost' && styles.ghostButtonText,
    textStyle,
  ];

  return (
    <TouchableOpacity 
      style={buttonStyles} 
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? '#FFFFFF' : colors.primary} 
          size="small"
        />
      ) : (
        <View style={styles.buttonContent}>
          {icon && (
            <View style={styles.iconWrapper}>
              {typeof icon === 'string' ? (
                <Ionicons name={icon} size={20} color={variant === 'primary' ? '#FFFFFF' : colors.primary} />
              ) : (
                icon
              )}
            </View>
          )}
          <Text style={textStyles}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.md,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    marginRight: 8,
  },
  buttonSmall: {
    height: 40,
    paddingHorizontal: 16,
  },
  buttonMedium: {
    height: 48,
    paddingHorizontal: 20,
  },
  buttonLarge: {
    height: 52,
    paddingHorizontal: 24,
  },
  fullWidth: {
    width: '100%',
  },
  
  // Primary Button
  primaryButton: {
    backgroundColor: '#1E3A8A', // Blue color from design
    ...shadow.medium,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  
  // Secondary Button
  secondaryButton: {
    backgroundColor: colors.background.secondary,
  },
  secondaryButtonText: {
    color: colors.text.primary,
  },
  
  // Outline Button
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.border.light,
  },
  outlineButtonText: {
    color: colors.primary,
  },
  
  // Ghost Button
  ghostButton: {
    backgroundColor: 'transparent',
  },
  ghostButtonText: {
    color: colors.primary,
  },
  
  // Disabled Button
  disabledButton: {
    opacity: 0.5,
  },
  
  // Text Styles
  buttonText: {
    ...typography.button,
  },
  buttonTextSmall: {
    ...typography.buttonSmall,
  },
  buttonTextMedium: {
    ...typography.button,
  },
  buttonTextLarge: {
    ...typography.button,
    fontSize: 18,
  },
});
