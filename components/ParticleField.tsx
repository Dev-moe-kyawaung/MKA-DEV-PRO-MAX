import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  withSequence,
  Easing,
  interpolate,
  type SharedValue,
} from 'react-native-reanimated';
import { Q } from '../lib/quantum';

const { width, height } = Dimensions.get('window');

function Particle({
  x,
  y,
  size,
  color,
  delay,
  duration,
  drift,
}: {
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  drift: number;
}) {
  const t = useSharedValue(0);

  useEffect(() => {
    t.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, { duration, easing: Easing.inOut(Easing.sin) }),
        -1,
        true
      )
    );
  }, [delay, duration]);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(t.value, [0, 1], [0, -drift]) },
      { translateX: interpolate(t.value, [0, 1], [0, drift * 0.4]) },
      { scale: interpolate(t.value, [0, 0.5, 1], [0.6, 1.2, 0.7]) },
    ],
    opacity: interpolate(t.value, [0, 0.5, 1], [0.15, 0.85, 0.2]),
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: 'absolute',
          left: x,
          top: y,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          shadowColor: color,
          shadowOpacity: 0.9,
          shadowRadius: 6,
        },
        style,
      ]}
    />
  );
}

export function ParticleField({ count = 28 }: { count?: number }) {
  const particles = useMemo(() => {
    const colors = [Q.matrix, Q.cyan, Q.violet, Q.magenta, Q.amber];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: (i * 97) % width,
      y: (i * 53) % height,
      size: 2 + (i % 4),
      color: colors[i % colors.length],
      delay: (i * 90) % 2000,
      duration: 2800 + (i % 6) * 500,
      drift: 18 + (i % 5) * 10,
    }));
  }, [count]);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {particles.map((p) => (
        <Particle key={p.id} {...p} />
      ))}
    </View>
  );
}

function BurstBit({
  dx,
  dy,
  size,
  color,
  originX,
  originY,
  burst,
}: {
  dx: number;
  dy: number;
  size: number;
  color: string;
  originX: number;
  originY: number;
  burst: SharedValue<number>;
}) {
  const style = useAnimatedStyle(() => ({
    opacity: interpolate(burst.value, [0, 0.2, 1], [0, 1, 0]),
    transform: [
      { translateX: interpolate(burst.value, [0, 1], [0, dx]) },
      { translateY: interpolate(burst.value, [0, 1], [0, dy]) },
      { scale: interpolate(burst.value, [0, 0.3, 1], [0.4, 1.3, 0.2]) },
    ],
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: originX,
          top: originY,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          shadowColor: color,
          shadowOpacity: 1,
          shadowRadius: 8,
        },
        style,
      ]}
    />
  );
}

/** Burst particles from a center point (AI orb decisions) */
export function ParticleBurst({
  active,
  originX = width / 2,
  originY = 120,
  count = 16,
  color = Q.cyan,
}: {
  active: boolean;
  originX?: number;
  originY?: number;
  count?: number;
  color?: string;
}) {
  const burst = useSharedValue(0);

  useEffect(() => {
    if (active) {
      burst.value = 0;
      burst.value = withSequence(
        withTiming(1, { duration: 900, easing: Easing.out(Easing.cubic) }),
        withTiming(0, { duration: 200 })
      );
    }
  }, [active]);

  const bits = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2;
        return {
          id: i,
          dx: Math.cos(angle) * (50 + (i % 4) * 18),
          dy: Math.sin(angle) * (50 + (i % 3) * 16),
          size: 3 + (i % 3),
        };
      }),
    [count]
  );

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {bits.map((b) => (
        <BurstBit
          key={b.id}
          dx={b.dx}
          dy={b.dy}
          size={b.size}
          color={color}
          originX={originX}
          originY={originY}
          burst={burst}
        />
      ))}
    </View>
  );
}
