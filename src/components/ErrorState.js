import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from './';
import { colors, spacing, typography } from '../theme';

export default function ErrorState({ 
  message = 'Terjadi kesalahan', 
  description = 'Silakan coba lagi',
  onRetry 
}) {
  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle-outline" size={64} color={colors.status.error} />
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.description}>{description}</Text>
      {onRetry && (
        <Button
          title="Coba Lagi"
          onPress={onRetry}
          variant="primary"
          icon="refresh"
          style={{ marginTop: spacing.lg }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  message: {
    ...typography.heading3,
    color: colors.status.error,
    textAlign: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
});
