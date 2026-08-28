import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Q } from '../lib/quantum';

type Props = {
  size?: number;
  label?: string;
  onPress?: () => void;
  bursting?: boolean;
};

export function AIOrb({ size = 88, label = 'AI', onPress, bursting }: Props) {
  const spin = useSharedValue(0);
  const pulse = useSharedValue(0);
  const breathe = useSharedValue(0);
  const burst = useSharedValue(0);

  useEffect(() => {
    spin.value = withRepeat(
      withTiming(1, { duration: 10000, easing: Easing.linear }),
      -1,
      false
    );
    pulse.value = withRepeat(
      withTiming(1, { duration: 2400, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
    breathe.value = withRepeat(
      withTiming(1, { duration: 1800, easing: Easing.inOut(Easing.quad) }),
      -1,
      true
    );
  }, []);

  useEffect(() => {
    if (bursting) {
      burst.value = withSequence(
        withTiming(1, { duration: 400, easing: Easing.out(Easing.cubic) }),
        withTiming(0, { duration: 600, easing: Easing.in(Easing.quad) })
      );
    }
  }, [bursting]);

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value * 360}deg` }],
  }));

  const ring2Style = useAnimatedStyle(() => ({
    transform: [{ rotate: `${-spin.value * 360}deg` }],
    opacity: interpolate(pulse.value, [0, 1], [0.4, 0.9]),
  }));

  const coreStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(breathe.value, [0, 1], [0.92, 1.08]) * (1 + burst.value * 0.25) },
    ],
    shadowOpacity: 0.5 + pulse.value * 0.4 + burst.value * 0.4,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(pulse.value, [0, 1], [1, 1.35]) }],
    opacity: interpolate(pulse.value, [0, 1], [0.25, 0.55]) + burst.value * 0.3,
  }));

  const outer = size + 48;

  return (
    <Pressable onPress={onPress} style={{ width: outer, height: outer, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View
        style={[
          styles.glow,
          glowStyle,
          {
            width: size + 30,
            height: size + 30,
            borderRadius: (size + 30) / 2,
            backgroundColor: Q.violet,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.ring,
          ringStyle,
          {
            width: size + 28,
            height: size + 28,
            borderRadius: (size + 28) / 2,
            borderColor: Q.cyan,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.ringDashed,
          ring2Style,
          {
            width: size + 42,
            height: size + 42,
            borderRadius: (size + 42) / 2,
            borderColor: Q.violet,
          },
        ]}
      />
      <Animated.View style={coreStyle}>
        <LinearGradient
          colors={[Q.orbCore, Q.cyan, Q.violet]}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 0.9, y: 1 }}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: 'rgba(255,255,255,0.35)',
          }}
        >
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.sub}>ORB</Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  glow: {
    position: 'absolute',
  },
  ring: {
    position: 'absolute',
    borderWidth: 1.5,
    borderStyle: 'solid',
    borderTopColor: Q.matrix,
    borderRightColor: 'transparent',
    borderBottomColor: Q.cyan,
    borderLeftColor: 'transparent',
  },
  ringDashed: {
    position: 'absolute',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  label: {
    fontSize: 18,
    fontWeight: '900',
    color: Q.bg,
    letterSpacing: 2,
  },
  sub: {
    fontSize: 9,
    fontWeight: '800',
    color: 'rgba(2,4,10,0.7)',
    letterSpacing: 3,
    marginTop: 2,
  },
});
