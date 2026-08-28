import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { Q } from '../lib/quantum';

const { width, height } = Dimensions.get('window');

export function QuantumGrid() {
  const shift = useSharedValue(0);
  const pulse = useSharedValue(0);

  useEffect(() => {
    shift.value = withRepeat(
      withTiming(1, { duration: 8000, easing: Easing.linear }),
      -1,
      false
    );
    pulse.value = withRepeat(
      withTiming(1, { duration: 3200, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
  }, []);

  const gridStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 700 },
      { rotateX: '58deg' },
      {
        translateY: interpolate(shift.value, [0, 1], [0, 36]),
      },
    ],
    opacity: interpolate(pulse.value, [0, 1], [0.35, 0.55]),
  }));

  const scanStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(shift.value, [0, 1], [0, height * 0.7]),
      },
    ],
    opacity: interpolate(shift.value, [0, 0.5, 1], [0.15, 0.45, 0.15]),
  }));

  const linesH = Array.from({ length: 16 }, (_, i) => i);
  const linesV = Array.from({ length: 14 }, (_, i) => i);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Animated.View style={[styles.floor, gridStyle]}>
        {linesH.map((i) => (
          <View
            key={`h-${i}`}
            style={[styles.h, { top: i * 28, borderColor: Q.gridBright }]}
          />
        ))}
        {linesV.map((i) => (
          <View
            key={`v-${i}`}
            style={[styles.v, { left: i * 32, borderColor: Q.grid }]}
          />
        ))}
      </Animated.View>
      <Animated.View style={[styles.scan, scanStyle]} />
      {/* Fractal corner arcs */}
      <View style={[styles.arc, styles.arcTL, { borderColor: Q.matrixFaint }]} />
      <View style={[styles.arc, styles.arcBR, { borderColor: Q.violetDim }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  floor: {
    position: 'absolute',
    bottom: -height * 0.05,
    left: -40,
    width: width + 80,
    height: height * 0.55,
  },
  h: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  v: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
  scan: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: Q.cyan,
    shadowColor: Q.cyan,
    shadowOpacity: 0.9,
    shadowRadius: 12,
  },
  arc: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
  },
  arcTL: { top: -40, left: -40 },
  arcBR: { bottom: 80, right: -50 },
});
