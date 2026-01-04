import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// Simple floating crystal component
const FloatingCrystal = ({ delay, x, y, size }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in
    Animated.sequence([
      Animated.delay(delay),
      Animated.timing(opacity, {
        toValue: 0.6,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // Float up and down
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -20,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 20,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.crystal,
        {
          left: x,
          top: y,
          width: size,
          height: size,
          opacity,
          transform: [{ translateY }, { rotate: '45deg' }],
        },
      ]}
    />
  );
};

export default function SplashScreen({ onFinish }) {
  const [phase, setPhase] = useState(0);

  // Animation values
  const textOpacity = useRef(new Animated.Value(0)).current;
  const doorOpacity = useRef(new Animated.Value(0)).current;
  const doorWidth = useRef(new Animated.Value(160)).current;
  const lightOpacity = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const finalOpacity = useRef(new Animated.Value(0)).current;

  // Crystal positions
  const crystals = [
    { delay: 0, x: width * 0.1, y: height * 0.15, size: 30 },
    { delay: 200, x: width * 0.8, y: height * 0.2, size: 20 },
    { delay: 100, x: width * 0.05, y: height * 0.45, size: 25 },
    { delay: 300, x: width * 0.85, y: height * 0.55, size: 22 },
    { delay: 150, x: width * 0.15, y: height * 0.75, size: 28 },
    { delay: 250, x: width * 0.75, y: height * 0.8, size: 18 },
  ];

  useEffect(() => {
    // Timeline
    const timeline = async () => {
      // Phase 1: Hello text (1s - 3s)
      setTimeout(() => {
        setPhase(1);
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      }, 1000);

      // Phase 2: Hide text, show door (3s - 4.5s)
      setTimeout(() => {
        Animated.timing(textOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }).start();
      }, 3000);

      setTimeout(() => {
        setPhase(2);
        Animated.timing(doorOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      }, 3500);

      // Phase 3: Door opens (4.5s - 6s)
      setTimeout(() => {
        setPhase(3);
        Animated.parallel([
          Animated.timing(doorWidth, {
            toValue: 300,
            duration: 1200,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false,
          }),
          Animated.timing(lightOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]).start();
      }, 4500);

      // Phase 4: Logo appears (6s - 7.5s)
      setTimeout(() => {
        setPhase(4);
        Animated.parallel([
          Animated.timing(logoOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.spring(logoScale, {
            toValue: 1,
            friction: 5,
            tension: 40,
            useNativeDriver: true,
          }),
        ]).start();
      }, 6000);

      // Phase 5: Final text (7.5s - 9s)
      setTimeout(() => {
        setPhase(5);
        Animated.timing(finalOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      }, 7500);

      // Finish (9.5s)
      setTimeout(() => {
        if (onFinish) {
          onFinish();
        }
      }, 9500);
    };

    timeline();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0A1628', '#0F2A71', '#0A1628']}
        locations={[0, 0.5, 1]}
        style={styles.gradient}
      >
        {/* Floating Crystals */}
        {crystals.map((crystal, index) => (
          <FloatingCrystal key={index} {...crystal} />
        ))}

        {/* Phase 1: Hello Text */}
        {phase >= 1 && phase < 3 && (
          <Animated.View style={[styles.centerContent, { opacity: textOpacity }]}>
            <Text style={styles.helloText}>
              Hello, <Text style={styles.highlight}>IT explorers!</Text>
            </Text>
          </Animated.View>
        )}

        {/* Phase 2+: Door */}
        {phase >= 2 && (
          <Animated.View style={[styles.doorContainer, { opacity: doorOpacity }]}>
            {/* Light behind door */}
            <Animated.View style={[styles.lightBehind, { opacity: lightOpacity }]} />

            {/* Door frame with opening animation */}
            <Animated.View style={[styles.doorFrame, { width: doorWidth }]}>
              {/* Left door panel */}
              <View style={styles.doorPanelLeft}>
                <LinearGradient
                  colors={['#F59E0B', '#D97706', '#B45309']}
                  style={styles.doorGradient}
                >
                  <View style={styles.doorHandle} />
                </LinearGradient>
              </View>

              {/* Right door panel */}
              <View style={styles.doorPanelRight}>
                <LinearGradient
                  colors={['#F59E0B', '#D97706', '#B45309']}
                  style={styles.doorGradient}
                >
                  <View style={styles.doorHandle} />
                </LinearGradient>
              </View>

              {/* Center gap (light) */}
              <View style={styles.doorGap}>
                <LinearGradient
                  colors={['#FFFBEB', '#FEF3C7', '#FBBF24']}
                  style={styles.doorGapGradient}
                />
              </View>
            </Animated.View>

            {/* Logo */}
            {phase >= 4 && (
              <Animated.View
                style={[
                  styles.logoWrapper,
                  {
                    opacity: logoOpacity,
                    transform: [{ scale: logoScale }],
                  },
                ]}
              >
                <Image
                  source={require('../../assets/logo.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </Animated.View>
            )}
          </Animated.View>
        )}

        {/* Phase 5: Ready text */}
        {phase >= 5 && (
          <Animated.View style={[styles.bottomText, { opacity: finalOpacity }]}>
            <Text style={styles.readyText}>Ready to dive into</Text>
            <Text style={styles.infoSysText}>Information Systems?</Text>
          </Animated.View>
        )}

        {/* Branding */}
        {phase >= 5 && (
          <Animated.View style={[styles.branding, { opacity: finalOpacity }]}>
            <View style={styles.brandLogoRow}>
              <Image
                source={require('../../assets/logo.png')}
                style={styles.brandLogo}
                resizeMode="contain"
              />
              <View>
                <Text style={styles.brandName}>
                  <Text style={styles.brandSI}>SI</Text>Lab Suite
                </Text>
                <Text style={styles.brandTagline}>Design. Model. Learn</Text>
              </View>
            </View>
          </Animated.View>
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crystal: {
    position: 'absolute',
    backgroundColor: '#FBBF24',
    borderRadius: 4,
  },
  centerContent: {
    position: 'absolute',
    alignItems: 'center',
  },
  helloText: {
    fontSize: 26,
    color: '#FFFFFF',
    fontWeight: '400',
  },
  highlight: {
    color: '#FBBF24',
    fontWeight: '700',
  },
  doorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightBehind: {
    position: 'absolute',
    width: 400,
    height: 600,
    backgroundColor: 'rgba(251, 191, 36, 0.3)',
    borderRadius: 200,
  },
  doorFrame: {
    height: 280,
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 6,
    borderColor: '#B45309',
  },
  doorPanelLeft: {
    flex: 1,
    borderRightWidth: 2,
    borderRightColor: '#92400E',
  },
  doorPanelRight: {
    flex: 1,
    borderLeftWidth: 2,
    borderLeftColor: '#92400E',
  },
  doorGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doorHandle: {
    width: 8,
    height: 30,
    backgroundColor: '#78350F',
    borderRadius: 4,
  },
  doorGap: {
    position: 'absolute',
    left: '35%',
    right: '35%',
    top: 0,
    bottom: 0,
  },
  doorGapGradient: {
    flex: 1,
  },
  logoWrapper: {
    position: 'absolute',
  },
  logo: {
    width: 100,
    height: 100,
  },
  bottomText: {
    position: 'absolute',
    bottom: height * 0.3,
    alignItems: 'center',
  },
  readyText: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  infoSysText: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '700',
    marginTop: 4,
  },
  branding: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  brandLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandLogo: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  brandName: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  brandSI: {
    color: '#FBBF24',
    fontWeight: '700',
  },
  brandTagline: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    fontStyle: 'italic',
    marginTop: 2,
  },
});
