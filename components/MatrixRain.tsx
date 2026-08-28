import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { Q } from '../lib/quantum';

const { width, height } = Dimensions.get('window');
const COLS = 14;

function Column({ index, charSet }: { index: number; charSet: string }) {
  const progress = useSharedValue(0);
  const glyphs = useMemo(() => {
    const len = 8 + (index % 5);
    return Array.from({ length: len }, (_, i) =>
      charSet[(index * 7 + i * 3) % charSet.length]
    );
  }, [index, charSet]);

  useEffect(() => {
    progress.value = withDelay(
      index * 120,
      withRepeat(
        withTiming(1, {
          duration: 4200 + (index % 4) * 900,
          easing: Easing.linear,
        }),
        -1,
        false
      )
    );
  }, [index]);

  const style = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          progress.value,
          [0, 1],
          [-height * 0.3, height + 40]
        ),
      },
    ],
    opacity: interpolate(progress.value, [0, 0.1, 0.8, 1], [0, 0.7, 0.5, 0]),
  }));

  const left = (index / COLS) * width + 4;

  return (
    <Animated.View style={[styles.col, { left }, style]} pointerEvents="none">
      {glyphs.map((g, i) => (
        <Text
          key={i}
          style={[
            styles.glyph,
            {
              color: i === glyphs.length - 1 ? Q.white : Q.matrix,
              opacity: 0.25 + (i / glyphs.length) * 0.75,
              textShadowColor: Q.matrix,
            },
          ]}
        >
          {g}
        </Text>
      ))}
    </Animated.View>
  );
}

export function MatrixRain({ density = COLS }: { density?: number }) {
  const cols = useMemo(() => Array.from({ length: density }, (_, i) => i), [density]);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {cols.map((i) => (
        <Column key={i} index={i} charSet={Q.streamChars} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  col: {
    position: 'absolute',
    top: 0,
    alignItems: 'center',
  },
  glyph: {
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 14,
    fontVariant: ['tabular-nums'],
    textShadowRadius: 6,
    textShadowOffset: { width: 0, height: 0 },
  },
});
