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

export default function SplashScreen({ onFinish }) {
  const [frame, setFrame] = useState(1);

  // Animation values for each frame
  const frame1Opacity = useRef(new Animated.Value(1)).current;
  const frame2Opacity = useRef(new Animated.Value(0)).current;
  const frame3Opacity = useRef(new Animated.Value(0)).current;
  const frame4Opacity = useRef(new Animated.Value(0)).current;
  const frame5Opacity = useRef(new Animated.Value(0)).current;
  const frame6Opacity = useRef(new Animated.Value(0)).current;

  // Frame 4 specific animations
  const frame4Scale = useRef(new Animated.Value(1.1)).current;
  const frame4LogoOpacity = useRef(new Animated.Value(0)).current;
  const frame4LogoScale = useRef(new Animated.Value(0.8)).current;
  const frame4TextOpacity = useRef(new Animated.Value(0)).current;
  const frame4TextY = useRef(new Animated.Value(10)).current;

  // Frame 5 logo animation
  const frame5LogoOpacity = useRef(new Animated.Value(0.6)).current;
  const frame5LogoScale = useRef(new Animated.Value(0.95)).current;

  // Frame 6 animations
  const frame6LogoOpacity = useRef(new Animated.Value(0)).current;
  const frame6LogoScale = useRef(new Animated.Value(0.8)).current;
  const frame6LogoY = useRef(new Animated.Value(20)).current;
  const frame6Title1Opacity = useRef(new Animated.Value(0)).current;
  const frame6Title1Y = useRef(new Animated.Value(10)).current;
  const frame6Title2Opacity = useRef(new Animated.Value(0)).current;
  const frame6Title2Y = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    const timeline = async () => {
      // Frame 1: 0-0.9s (Multiple floating papers)
      await new Promise(resolve => setTimeout(resolve, 900));
      
      // Transition to Frame 2
      setFrame(2);
      Animated.parallel([
        Animated.timing(frame1Opacity, {
          toValue: 0,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(frame2Opacity, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();

      // Frame 2: 0.9-1.8s (Single rotating paper)
      await new Promise(resolve => setTimeout(resolve, 900));
      
      // Transition to Frame 3
      setFrame(3);
      Animated.parallel([
        Animated.timing(frame2Opacity, {
          toValue: 0,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(frame3Opacity, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();

      // Frame 3: 1.8-2.7s (Paper with text)
      await new Promise(resolve => setTimeout(resolve, 900));
      
      // Transition to Frame 4
      setFrame(4);
      Animated.parallel([
        Animated.timing(frame3Opacity, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(frame4Opacity, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(frame4Scale, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();

      // Frame 4 logo animation (after 300ms)
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(frame4LogoOpacity, {
            toValue: 0.6,
            duration: 600,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(frame4LogoScale, {
            toValue: 1,
            duration: 600,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start();
      }, 300);

      // Frame 4 text animation (after 400ms)
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(frame4TextOpacity, {
            toValue: 1,
            duration: 600,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(frame4TextY, {
            toValue: 0,
            duration: 600,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start();
      }, 400);

      // Frame 4: 2.7-4.5s (hold 1.8s)
      await new Promise(resolve => setTimeout(resolve, 1800));
      
      // Transition to Frame 5
      setFrame(5);
      Animated.parallel([
        Animated.timing(frame4Opacity, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(frame5Opacity, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(frame5LogoOpacity, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(frame5LogoScale, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();

      // Frame 5: 4.5-5.5s
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Transition to Frame 6
      setFrame(6);
      Animated.parallel([
        Animated.timing(frame5Opacity, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(frame6Opacity, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();

      // Frame 6 logo animation (after 200ms)
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(frame6LogoOpacity, {
            toValue: 1,
            duration: 800,
            easing: Easing.out(Easing.back(1.7)),
            useNativeDriver: true,
          }),
          Animated.timing(frame6LogoScale, {
            toValue: 1,
            duration: 800,
            easing: Easing.out(Easing.back(1.7)),
            useNativeDriver: true,
          }),
          Animated.timing(frame6LogoY, {
            toValue: 0,
            duration: 800,
            easing: Easing.out(Easing.back(1.7)),
            useNativeDriver: true,
          }),
        ]).start();
      }, 200);

      // Frame 6 title 1 animation (after 400ms)
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(frame6Title1Opacity, {
            toValue: 1,
            duration: 600,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(frame6Title1Y, {
            toValue: 0,
            duration: 600,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start();
      }, 400);

      // Frame 6 title 2 animation (after 600ms)
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(frame6Title2Opacity, {
            toValue: 1,
            duration: 600,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(frame6Title2Y, {
            toValue: 0,
            duration: 600,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start();
      }, 600);

      // Frame 6: 5.5-9.5s (hold 4s)
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      // Finish
      if (onFinish) {
        onFinish();
      }
    };

    timeline();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#111111', '#0F2A71']}
        locations={[0.0456, 1.2164]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Frame 1: Multiple floating papers */}
        <Animated.View style={[styles.frameContainer, { opacity: frame1Opacity }]}>
          {/* Top-left large paper */}
          <Image 
            source={require('../../assets/login-illustration.png')}
            style={styles.paperTopLeft}
            resizeMode="cover"
          />
          
          {/* Bottom-right paper */}
          <Image 
            source={require('../../assets/login-illustration.png')}
            style={styles.paperBottomRight}
            resizeMode="cover"
          />
          
          {/* Center-right small paper */}
          <Image 
            source={require('../../assets/login-illustration.png')}
            style={styles.paperCenterRight}
            resizeMode="cover"
          />
        </Animated.View>

        {/* Frame 2: Single rotating paper */}
        <Animated.View style={[styles.frameContainer, { opacity: frame2Opacity }]}>
          <View style={styles.frame2Container}>
            <Image 
              source={require('../../assets/login-illustration.png')}
              style={styles.paperRotating}
              resizeMode="cover"
            />
          </View>
        </Animated.View>

        {/* Frame 3: Paper with text */}
        <Animated.View style={[styles.frameContainer, { opacity: frame3Opacity }]}>
          <View style={styles.frame3Container}>
            <Image 
              source={require('../../assets/login-illustration.png')}
              style={styles.paperWithText}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.frame3Text}>
            <Text style={styles.frame3TextNormal}>Hello, </Text>
            <Text style={styles.frame3TextBold}>IT explorers!</Text>
          </Text>
        </Animated.View>

        {/* Frame 4: Door scene with logo and text */}
        <Animated.View style={[styles.frameContainer, { opacity: frame4Opacity }]}>
          <Animated.View 
            style={[styles.doorImageContainer, { transform: [{ scale: frame4Scale }] }]}>
            <View style={styles.doorPlaceholder} />
          </Animated.View>
          
          <Animated.Image 
            source={require('../../assets/logo.png')}
            style={[
              styles.frame4Logo,
              {
                opacity: frame4LogoOpacity,
                transform: [{ scale: frame4LogoScale }],
              },
            ]}
            resizeMode="contain"
          />
          
          <Animated.Text 
            style={[
              styles.frame4Text,
              {
                opacity: frame4TextOpacity,
                transform: [{ translateY: frame4TextY }],
              },
            ]}
          >
            <Text style={styles.frame4TextNormal}>Ready to dive into </Text>
            <Text style={styles.frame4TextItalic}>Information Systems?</Text>
          </Animated.Text>
        </Animated.View>

        {/* Frame 5: Door scene with bigger logo, NO text */}
        <Animated.View style={[styles.frameContainer, { opacity: frame5Opacity }]}>          
          <Animated.Image 
            source={require('../../assets/logo.png')}
            style={[
              styles.frame5Logo,
              {
                opacity: frame5LogoOpacity,
                transform: [{ scale: frame5LogoScale }],
              },
            ]}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Frame 6: Final logo card with SILab Suite */}
        <Animated.View style={[styles.frame6Container, { opacity: frame6Opacity }]}>          
          <Animated.Image 
            source={require('../../assets/logo.png')}
            style={[
              styles.frame6Logo,
              {
                opacity: frame6LogoOpacity,
                transform: [
                  { scale: frame6LogoScale },
                  { translateY: frame6LogoY },
                ],
              },
            ]}
            resizeMode="contain"
          />
          
          <Animated.Text 
            style={[
              styles.frame6Title,
              {
                opacity: frame6Title1Opacity,
                transform: [{ translateY: frame6Title1Y }],
              },
            ]}
          >
            <Text style={styles.frame6TitleYellow}>SILab</Text>
            <Text style={styles.frame6TitleWhite}> Suite</Text>
          </Animated.Text>
          
          <Animated.Text 
            style={[
              styles.frame6Subtitle,
              {
                opacity: frame6Title2Opacity,
                transform: [{ translateY: frame6Title2Y }],
              },
            ]}
          >
            Design. Model. Learn
          </Animated.Text>
          
          {/* Gradient overlay */}
          <View style={styles.gradientOverlay}>
            <LinearGradient
              colors={['#0F2A71', 'rgba(15, 42, 113, 0)']}
              style={styles.gradientOverlayInner}
            />
          </View>
        </Animated.View>
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
  },
  frameContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  
  // Frame 1: Multiple papers
  paperTopLeft: {
    position: 'absolute',
    width: 501,
    height: 890,
    left: -108,
    top: -274,
  },
  paperBottomRight: {
    position: 'absolute',
    width: 400,
    height: 600,
    right: -150,
    bottom: -200,
    transform: [{ rotate: '15deg' }],
  },
  paperCenterRight: {
    position: 'absolute',
    width: 200,
    height: 300,
    right: -50,
    top: 250,
    transform: [{ rotate: '-25deg' }],
  },
  
  // Frame 2: Rotating paper
  frame2Container: {
    position: 'absolute',
    left: -99,
    top: 175,
    width: 668,
    height: 735,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paperRotating: {
    width: 363,
    height: 644,
    transform: [{ rotate: '324.689deg' }],
  },
  
  // Frame 3: Paper with text
  frame3Container: {
    position: 'absolute',
    left: -61,
    top: 230,
    width: 680,
    height: 430,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paperWithText: {
    width: 363,
    height: 644,
    transform: [{ rotate: '276.174deg' }],
  },
  frame3Text: {
    position: 'absolute',
    left: 78,
    top: 298,
    width: 238,
    fontSize: 17,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  frame3TextNormal: {
    fontWeight: '400',
  },
  frame3TextBold: {
    fontWeight: '700',
  },
  
  // Frame 4: Door with logo and text
  doorImageContainer: {
    position: 'absolute',
    width: 520,
    height: 925,
    left: -32,
    top: -33,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doorPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
  },
  frame4Logo: {
    position: 'absolute',
    width: 78,
    height: 89,
    left: 58,
    top: 280,
  },
  frame4Text: {
    position: 'absolute',
    left: 50,
    top: 617,
    width: 238,
    fontSize: 17,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  frame4TextNormal: {
    fontWeight: '400',
  },
  frame4TextItalic: {
    fontWeight: '700',
    fontStyle: 'italic',
  },
  
  // Frame 5: Door with bigger logo
  frame5Logo: {
    position: 'absolute',
    width: 111,
    height: 127,
    left: width / 2 - 55.5,
    top: height / 2 - 63.5,
  },
  
  // Frame 6: Final screen
  frame6Container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000002',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frame6Logo: {
    width: 130,
    height: 134,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 20,
  },
  frame6Title: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 8,
  },
  frame6TitleYellow: {
    color: '#FBBC04',
  },
  frame6TitleWhite: {
    color: '#FFFFFF',
  },
  frame6Subtitle: {
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 24,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  gradientOverlay: {
    position: 'absolute',
    left: -215,
    top: -231,
    width: 690,
    height: 607,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientOverlayInner: {
    width: 578,
    height: 383,
    transform: [{ rotate: '332.451deg' }],
  },
});
