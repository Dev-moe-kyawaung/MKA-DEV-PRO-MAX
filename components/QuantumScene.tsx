import React from 'react';
import { View, StyleSheet } from 'react-native';
import { QuantumBackdrop } from './QuantumUI';
import { MatrixRain } from './MatrixRain';
import { QuantumGrid } from './QuantumGrid';
import { ParticleField } from './ParticleField';
import { Q } from '../lib/quantum';

type Props = {
  children: React.ReactNode;
  rain?: boolean;
  grid?: boolean;
  particles?: boolean;
  particleCount?: number;
};

/** Full quantum environment stack behind every screen */
export function QuantumScene({
  children,
  rain = true,
  grid = true,
  particles = true,
  particleCount = 22,
}: Props) {
  return (
    <View style={[styles.root, { backgroundColor: Q.bg }]}>
      <QuantumBackdrop />
      {grid ? <QuantumGrid /> : null}
      {particles ? <ParticleField count={particleCount} /> : null}
      {rain ? <MatrixRain density={12} /> : null}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { flex: 1 },
});
