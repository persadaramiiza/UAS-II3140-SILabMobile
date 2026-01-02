import React, { useState } from 'react';
import { Image, ActivityIndicator, View, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function OptimizedImage({ source, style, ...props }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (error) {
    return <View style={[style, styles.placeholder]} />;
  }

  return (
    <View style={style}>
      <Image
        source={source}
        style={[StyleSheet.absoluteFill, style]}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        {...props}
      />
      {loading && (
        <View style={[StyleSheet.absoluteFill, styles.loadingContainer]}>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
  },
  placeholder: {
    backgroundColor: colors.background.secondary,
  },
});
