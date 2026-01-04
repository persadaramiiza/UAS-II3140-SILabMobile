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

// Floating crystal/diamond shape component
const FloatingCrystal = ({ delay, startX, startY, size, rotation, duration }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateCrystal = () => {
      Animated.parallel([
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(opacity, {
            toValue: 0.7,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
        Animated.loop(
          Animated.sequence([
            Animated.timing(translateY, {
              toValue: -30,
              duration: duration,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(translateY, {
              toValue: 30,
              duration: duration,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(translateX, {
              toValue: 15,
              duration: duration * 1.3,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(translateX, {
              toValue: -15,
              duration: duration * 1.3,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ])
        ),
        Animated.loop(
          Animated.timing(rotate, {
            toValue: 1,
            duration: duration * 2,
            easing: Easing.linear,
            useNativeDriver: true,
          })
        ),
      ]).start();
    };

    animateCrystal();
  }, []);

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: [`${rotation}deg`, `${rotation + 360}deg`],
  });

  return (
    <Animated.View
      style={[
        styles.crystal,
        {
          left: startX,
          top: startY,
          width: size,
          height: size,
          opacity,
          transform: [
            { translateX },
            { translateY },
            { rotate: rotateInterpolate },
          ],
        },
      ]}
    >
      <LinearGradient
        colors={['#F59E0B', '#FBBF24', '#F97316']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.crystalInner, { width: size, height: size }]}
      />
    </Animated.View>
  );
};

export default function SplashScreen({ onFinish }) {
  const [phase, setPhase] = useState(0);
  
  // Animation values
  const fadeIn = useRef(new Animated.Value(0)).current;
  const textFade = useRef(new Animated.Value(0)).current;
  const doorScale = useRef(new Animated.Value(0)).current;
  const doorOpen = useRef(new Animated.Value(0)).current;
  const lightOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const finalFade = useRef(new Animated.Value(0)).current;

  // Crystal data
  const crystals = [
    { delay: 0, startX: width * 0.1, startY: height * 0.15, size: 40, rotation: 0, duration: 3000 },
    { delay: 200, startX: width * 0.8, startY: height * 0.2, size: 25, rotation: 45, duration: 2500 },
    { delay: 400, startX: width * 0.15, startY: height * 0.5, size: 35, rotation: 30, duration: 2800 },
    { delay: 600, startX: width * 0.75, startY: height * 0.6, size: 30, rotation: 60, duration: 3200 },
    { delay: 300, startX: width * 0.05, startY: height * 0.75, size: 45, rotation: 15, duration: 2600 },
    { delay: 500, startX: width * 0.85, startY: height * 0.8, size: 20, rotation: 75, duration: 3100 },
    { delay: 100, startX: width * 0.5, startY: height * 0.1, size: 28, rotation: 90, duration: 2900 },
    { delay: 700, startX: width * 0.3, startY: height * 0.85, size: 32, rotation: 120, duration: 2700 },
  ];

  useEffect(() => {
    // Phase 0: Initial fade in with crystals (0-2s)
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Phase 1: "Hello, IT explorers!" text (1.5s-3.5s)
    setTimeout(() => {
      setPhase(1);
      Animated.timing(textFade, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, 1500);

    // Phase 2: Door appears (3.5s-5s)
    setTimeout(() => {
      setPhase(2);
      Animated.sequence([
        Animated.timing(textFade, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(doorScale, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
      ]).start();
    }, 3500);

    // Phase 3: Door opens with light (5s-6.5s)
    setTimeout(() => {
      setPhase(3);
      Animated.parallel([
        Animated.timing(doorOpen, {
          toValue: 1,
          duration: 1200,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(lightOpacity, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]).start();
    }, 5000);

    // Phase 4: Logo appears (6.5s-8s)
    setTimeout(() => {
      setPhase(4);
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 4,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }, 6500);

    // Phase 5: "Ready to dive into Information Systems?" (8s-9.5s)
    setTimeout(() => {
      setPhase(5);
      Animated.timing(finalFade, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, 8000);

    // Finish splash screen (10s)
    setTimeout(() => {
      if (onFinish) {
        onFinish();
      }
    }, 10000);
  }, []);

  const doorLeftRotate = doorOpen.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-75deg'],
  });

  const doorRightRotate = doorOpen.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '75deg'],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0A1628', '#0F2A71', '#0A1628']}
        style={styles.gradient}
      >
        {/* Floating Crystals */}
        {crystals.map((crystal, index) => (
          <FloatingCrystal key={index} {...crystal} />
        ))}

        {/* Phase 1: Hello Text */}
        {phase >= 1 && phase < 2 && (
          <Animated.View style={[styles.centerContent, { opacity: textFade }]}>
            <Text style={styles.helloText}>Hello, <Text style={styles.highlightText}>IT explorers!</Text></Text>
          </Animated.View>
        )}

        {/* Phase 2-4: Door */}
        {phase >= 2 && (
          <Animated.View 
            style={[
              styles.doorContainer,
              { 
                opacity: fadeIn,
                transform: [{ scale: doorScale }]
              }
            ]}
          >
            {/* Light rays behind door */}
            <Animated.View style={[styles.lightRays, { opacity: lightOpacity }]}>
              <LinearGradient
                colors={['rgba(251, 191, 36, 0)', 'rgba(251, 191, 36, 0.3)', 'rgba(251, 191, 36, 0.6)', 'rgba(255, 255, 255, 0.9)']}
                style={styles.lightGradient}
              />
            </Animated.View>

            {/* Door frame */}
            <View style={styles.doorFrame}>
              {/* Left door */}
              <Animated.View 
                style={[
                  styles.doorLeft,
                  { transform: [{ perspective: 800 }, { rotateY: doorLeftRotate }] }
                ]}
              >
                <LinearGradient
                  colors={['#F59E0B', '#D97706', '#B45309']}
                  style={styles.doorGradient}
                />
              </Animated.View>

              {/* Right door */}
              <Animated.View 
                style={[
                  styles.doorRight,
                  { transform: [{ perspective: 800 }, { rotateY: doorRightRotate }] }
                ]}
              >
                <LinearGradient
                  colors={['#F59E0B', '#D97706', '#B45309']}
                  style={styles.doorGradient}
                />
              </Animated.View>
            </View>

            {/* Logo floating through door */}
            {phase >= 4 && (
              <Animated.View 
                style={[
                  styles.logoContainer,
                  {
                    opacity: logoOpacity,
                    transform: [{ scale: logoScale }]
                  }
                ]}
              >
                <Image
                  source={require('../../assets/logo.png')}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </Animated.View>
            )}
          </Animated.View>
        )}

        {/* Phase 5: Final text */}
        {phase >= 5 && (
          <Animated.View style={[styles.bottomContent, { opacity: finalFade }]}>
            <Text style={styles.readyText}>Ready to dive into</Text>
            <Text style={styles.isText}>Information Systems?</Text>
          </Animated.View>
        )}

        {/* App branding */}
        {phase >= 5 && (
          <Animated.View style={[styles.branding, { opacity: finalFade }]}>
            <Text style={styles.brandName}>
              <Text style={styles.brandSI}>SI</Text>Lab Suite
            </Text>
            <Text style={styles.tagline}>Design. Model. Learn</Text>
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
    transform: [{ rotate: '45deg' }],
  },
  crystalInner: {
    borderRadius: 4,
    transform: [{ rotate: '45deg' }],
  },
  centerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helloText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: '400',
  },
  highlightText: {
    color: '#FBBF24',
    fontWeight: '700',
  },
  doorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightRays: {
    position: 'absolute',
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightGradient: {
    width: width * 1.5,
    height: height * 1.5,
    borderRadius: width,
  },
  doorFrame: {
    width: 160,
    height: 280,
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#D97706',
    backgroundColor: 'rgba(251, 191, 36, 0.3)',
  },
  doorLeft: {
    width: '50%',
    height: '100%',
    transformOrigin: 'left',
  },
  doorRight: {
    width: '50%',
    height: '100%',
    transformOrigin: 'right',
  },
  doorGradient: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#B45309',
  },
  logoContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 120,
    height: 120,
  },
  bottomContent: {
    position: 'absolute',
    bottom: height * 0.35,
    alignItems: 'center',
  },
  readyText: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '400',
  },
  isText: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '700',
    marginTop: 4,
  },
  branding: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
  },
  brandName: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '400',
  },
  brandSI: {
    color: '#FBBF24',
    fontWeight: '700',
  },
  tagline: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
    fontStyle: 'italic',
  },
});
