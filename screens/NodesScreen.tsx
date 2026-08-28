import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { QuantumScene } from '../components/QuantumScene';
import { QuantumGraph } from '../components/QuantumGraph';
import { AIOrb } from '../components/AIOrb';
import { ParticleBurst } from '../components/ParticleField';
import {
  ScreenHeader,
  SectionLabel,
  QButton,
  Panel,
} from '../components/QuantumUI';
import { Q, radius, spacing } from '../lib/quantum';
import { quantumNodes, profile, type QuantumNode } from '../lib/data';

export function NodesScreen() {
  const [selected, setSelected] = useState<QuantumNode | null>(quantumNodes[0]);
  const [burst, setBurst] = useState(0);

  const onSelect = (n: QuantumNode) => {
    setSelected(n);
    setBurst((b) => b + 1);
  };

  return (
    <QuantumScene particleCount={18}>
      <StatusBar style="light" />
      <ParticleBurst
        active={burst > 0}
        key={burst}
        originY={90}
        count={selected?.energy ? Math.min(24, Math.floor(selected.energy / 4)) : 12}
        color={Q.violet}
      />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <ScreenHeader
            title="Quantum Nodes"
            subtitle="Project cards as entangled graph vertices · tap a node to excite links"
            badge={`${quantumNodes.length} NODES`}
          />

          <SectionLabel
            code="GRAPH·01"
            title="Architecture Mesh"
            subtitle="Animated edge packets travel between related systems"
          />

          <QuantumGraph selectedId={selected?.id} onSelect={onSelect} />

          {selected ? (
            <Animated.View entering={FadeInDown.duration(350)}>
              <SectionLabel code="FOCUS·02" title="Node Inspector" />
              <Panel style={styles.inspector}>
                <View style={styles.inspTop}>
                  <View style={styles.inspIcon}>
                    <Ionicons
                      name={selected.icon as keyof typeof Ionicons.glyphMap}
                      size={22}
                      color={Q.cyan}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.inspCat}>{selected.category}</Text>
                    <Text style={styles.inspTitle}>{selected.title}</Text>
                    <Text style={styles.inspSub}>{selected.subtitle}</Text>
                  </View>
                  <View style={styles.energyBadge}>
                    <Text style={styles.energyVal}>{selected.energy}</Text>
                    <Text style={styles.energyLbl}>eV</Text>
                  </View>
                </View>

                <Text style={styles.inspDetail}>{selected.detail}</Text>

                <View style={styles.techRow}>
                  {selected.tech.map((t) => (
                    <View key={t} style={styles.techChip}>
                      <Text style={styles.techText}>{t}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.linkRow}>
                  <Text style={styles.linkLabel}>ENTANGLED WITH</Text>
                  <View style={styles.linkChips}>
                    {selected.links.map((lid) => {
                      const n = quantumNodes.find((x) => x.id === lid);
                      if (!n) return null;
                      return (
                        <Pressable
                          key={lid}
                          onPress={() => onSelect(n)}
                          style={styles.linkChip}
                        >
                          <Text style={styles.linkChipText}>{n.title}</Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>

                <View style={styles.orbMini}>
                  <AIOrb
                    size={64}
                    bursting={burst > 0}
                    onPress={() => setBurst((b) => b + 1)}
                    label="Q"
                  />
                  <Text style={styles.orbHint}>
                    Orb visualizes collapse of “{selected.title}” architecture path
                  </Text>
                </View>
              </Panel>
            </Animated.View>
          ) : null}

          <QButton
            title="Open Public Portfolio"
            icon="open-outline"
            onPress={() => Linking.openURL(profile.website)}
            style={{ marginTop: 8 }}
          />

          <View style={{ height: 36 }} />
        </ScrollView>
      </SafeAreaView>
    </QuantumScene>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: spacing.lg, paddingBottom: 24 },
  inspector: { marginBottom: 18 },
  inspTop: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  inspIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Q.borderStrong,
    backgroundColor: Q.cyanDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inspCat: {
    color: Q.cyan,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  inspTitle: { color: Q.text, fontSize: 18, fontWeight: '900', marginTop: 2 },
  inspSub: { color: Q.textMuted, fontSize: 12, marginTop: 2 },
  energyBadge: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Q.matrix,
    borderRadius: radius.md,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  energyVal: { color: Q.matrix, fontWeight: '900', fontSize: 16 },
  energyLbl: { color: Q.textFaint, fontSize: 9, fontWeight: '700' },
  inspDetail: {
    color: Q.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 14,
  },
  techRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 },
  techChip: {
    borderWidth: 1,
    borderColor: Q.border,
    backgroundColor: Q.matrixFaint,
    borderRadius: radius.full,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  techText: { color: Q.matrix, fontSize: 11, fontWeight: '700' },
  linkRow: { marginTop: 16 },
  linkLabel: {
    color: Q.textFaint,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  linkChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  linkChip: {
    borderWidth: 1,
    borderColor: Q.violet + '66',
    backgroundColor: Q.violetDim,
    borderRadius: radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  linkChipText: { color: Q.text, fontSize: 12, fontWeight: '600' },
  orbMini: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 18,
    borderTopWidth: 1,
    borderTopColor: Q.border,
    paddingTop: 14,
  },
  orbHint: { flex: 1, color: Q.textMuted, fontSize: 12, lineHeight: 18 },
});
