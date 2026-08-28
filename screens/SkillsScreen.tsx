import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { QuantumScene } from '../components/QuantumScene';
import {
  ScreenHeader,
  SectionLabel,
  SkillMeter,
} from '../components/QuantumUI';
import { Q, radius, spacing } from '../lib/quantum';
import { skills, type Skill } from '../lib/data';

const CATS: { key: Skill['category'] | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'backend', label: 'Backend' },
  { key: 'web', label: 'Web' },
  { key: 'cloud', label: 'Cloud' },
  { key: 'data', label: 'Data' },
  { key: 'tools', label: 'Tools' },
];

export function SkillsScreen() {
  const [active, setActive] = useState<Skill['category'] | 'all'>('all');

  const filtered = useMemo(() => {
    if (active === 'all') return skills;
    return skills.filter((s) => s.category === active);
  }, [active]);

  return (
    <QuantumScene rain grid particles particleCount={16}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <View style={{ paddingHorizontal: spacing.lg }}>
          <ScreenHeader
            title="Skill Field"
            subtitle="Entanglement strength across the Android stack"
            badge={`${filtered.length} QUBITS`}
          />
        </View>

        <FlatList
          horizontal
          data={CATS}
          keyExtractor={(i) => i.key}
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0, marginBottom: 6 }}
          contentContainerStyle={{ paddingHorizontal: spacing.lg, gap: 8 }}
          renderItem={({ item }) => {
            const on = active === item.key;
            return (
              <Pressable
                onPress={() => setActive(item.key)}
                style={[
                  styles.chip,
                  on && { borderColor: Q.borderStrong, backgroundColor: Q.matrixFaint },
                ]}
              >
                <Text style={[styles.chipText, on && { color: Q.matrix }]}>
                  {item.label}
                </Text>
              </Pressable>
            );
          }}
        />

        <FlatList
          data={filtered}
          keyExtractor={(i) => i.name}
          contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={{ marginBottom: 8 }}>
              <SectionLabel code="FIELD·01" title="Proficiency Waveforms" />
              <View style={styles.summary}>
                <Sum value={`${skills.length}`} label="Total" />
                <View style={styles.div} />
                <Sum
                  value={`${skills.filter((s) => s.level >= 85).length}`}
                  label="Expert"
                />
                <View style={styles.div} />
                <Sum value="Kotlin" label="Primary" />
              </View>
            </View>
          }
          renderItem={({ item, index }) => (
            <View>
              <SkillMeter
                name={item.name}
                icon={item.icon}
                level={item.level}
                index={index}
              />
              <Text style={styles.ent}>
                entanglement {item.entanglement}%
              </Text>
            </View>
          )}
        />
      </SafeAreaView>
    </QuantumScene>
  );
}

function Sum({ value, label }: { value: string; label: string }) {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ color: Q.matrix, fontWeight: '900', fontSize: 18 }}>{value}</Text>
      <Text
        style={{
          color: Q.textMuted,
          fontSize: 10,
          marginTop: 4,
          letterSpacing: 1,
          textTransform: 'uppercase',
          fontWeight: '700',
        }}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: Q.border,
    backgroundColor: Q.bgPanel,
  },
  chipText: { color: Q.textMuted, fontWeight: '700', fontSize: 12 },
  summary: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Q.border,
    backgroundColor: Q.bgPanel,
    borderRadius: radius.lg,
    paddingVertical: 14,
    marginBottom: 12,
  },
  div: { width: 1, backgroundColor: Q.border },
  ent: {
    color: Q.textFaint,
    fontSize: 10,
    marginTop: -6,
    marginBottom: 10,
    marginLeft: 4,
    letterSpacing: 0.8,
  },
});
