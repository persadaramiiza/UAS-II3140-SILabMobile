import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from './';
import { colors, spacing, typography } from '../theme'; 
export default function EmptyState({ 
  message = 'Tidak ada data', 
  description, 
  actionText, 
  onAction,
  icon = 'folder-open-outline'
}) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={64} color={colors.text.secondary} />
      <Text style={styles.message}>{message}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      {actionText && onAction && (
        <Button
          title={actionText}
          onPress={onAction}
          variant="primary"
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
    color: colors.text.secondary,
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
