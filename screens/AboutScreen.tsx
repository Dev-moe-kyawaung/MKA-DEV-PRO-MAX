import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { QuantumScene } from '../components/QuantumScene';
import {
  ScreenHeader,
  SectionLabel,
  QButton,
  FadeItem,
  Panel,
} from '../components/QuantumUI';
import { Q, radius, spacing } from '../lib/quantum';
import { profile, experiences, focuses, certifications } from '../lib/data';

export function AboutScreen() {
  return (
    <QuantumScene particleCount={14}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <ScreenHeader
            title="Identity Core"
            subtitle="Operator profile · Android Senior Developer"
          />

          <Panel style={{ padding: 0, overflow: 'hidden', marginBottom: 22 }}>
            <Image
              source={{ uri: profile.headerImage }}
              style={{ width: '100%', height: 100 }}
              contentFit="cover"
            />
            <LinearGradient
              colors={['transparent', Q.bgPanelSolid]}
              style={styles.fade}
            />
            <View style={styles.profileBody}>
              <Image
                source={{ uri: profile.avatar }}
                style={styles.avatar}
                contentFit="cover"
              />
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.role}>{profile.title}</Text>
              <View style={styles.chips}>
                <Chip icon="business-outline" label={profile.company} />
                <Chip icon="location-outline" label={profile.location} />
                <Chip icon="time-outline" label={profile.timezone} />
              </View>
            </View>
          </Panel>

          <SectionLabel code="BIO·01" title="Transmission" />
          {profile.bio.split('\n\n').map((p, i) => (
            <FadeItem key={i} index={i}>
              <Text style={styles.bio}>{p}</Text>
            </FadeItem>
          ))}

          <SectionLabel code="FOCUS·02" title="Vector Focus" />
          <View style={styles.focusGrid}>
            {focuses.map((f, i) => (
              <FadeItem key={f.title} index={i}>
                <View style={styles.focusCard}>
                  <View style={styles.focusIcon}>
                    <Ionicons
                      name={f.icon as keyof typeof Ionicons.glyphMap}
                      size={18}
                      color={Q.matrix}
                    />
                  </View>
                  <Text style={styles.focusTitle}>{f.title}</Text>
                  <Text style={styles.focusDesc}>{f.desc}</Text>
                </View>
              </FadeItem>
            ))}
          </View>

          <SectionLabel code="LOG·03" title="Experience Timeline" />
          {experiences.map((exp, idx) => (
            <FadeItem key={exp.id} index={idx}>
              <View style={styles.expRow}>
                <View style={styles.timeline}>
                  <View style={styles.dot} />
                  {idx < experiences.length - 1 ? <View style={styles.line} /> : null}
                </View>
                <View style={styles.expCard}>
                  <Text style={styles.period}>{exp.period}</Text>
                  <Text style={styles.expRole}>{exp.role}</Text>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.expDesc}>{exp.description}</Text>
                  {exp.highlights.map((h) => (
                    <View key={h} style={styles.hi}>
                      <Ionicons name="checkmark-circle" size={14} color={Q.matrix} />
                      <Text style={styles.hiText}>{h}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </FadeItem>
          ))}

          <SectionLabel code="CERT·04" title="Credential Qubits" />
          {certifications.map((c, i) => (
            <FadeItem key={c.id} index={i}>
              <View style={styles.cert}>
                <Text style={styles.qubit}>{c.qubit}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.certCat}>{c.category}</Text>
                  <Text style={styles.certTitle}>{c.title}</Text>
                  <Text style={styles.certIssuer}>{c.issuer}</Text>
                </View>
                <Ionicons
                  name={c.icon as keyof typeof Ionicons.glyphMap}
                  size={18}
                  color={Q.cyan}
                />
              </View>
            </FadeItem>
          ))}

          <SectionLabel code="LINK·05" title="Public Channels" />
          <QButton
            title="Portfolio Website"
            icon="globe-outline"
            onPress={() => Linking.openURL(profile.website)}
            style={{ marginBottom: 10 }}
          />
          <QButton
            title="Gravatar"
            icon="person-circle-outline"
            variant="outline"
            onPress={() => Linking.openURL(profile.gravatar)}
            style={{ marginBottom: 10 }}
          />
          <QButton
            title="LinkedIn"
            icon="logo-linkedin"
            variant="ghost"
            onPress={() => Linking.openURL(profile.linkedin)}
          />

          <View style={{ height: 36 }} />
        </ScrollView>
      </SafeAreaView>
    </QuantumScene>
  );
}

function Chip({
  icon,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}) {
  return (
    <View style={styles.chip}>
      <Ionicons name={icon} size={12} color={Q.matrix} />
      <Text style={styles.chipText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: spacing.lg, paddingBottom: 24 },
  fade: { position: 'absolute', left: 0, right: 0, top: 40, height: 60 },
  profileBody: { alignItems: 'center', paddingBottom: 18, marginTop: -36 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: Q.matrix,
  },
  name: { color: Q.text, fontSize: 20, fontWeight: '900', marginTop: 10 },
  role: { color: Q.matrix, fontWeight: '700', marginTop: 4 },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
    justifyContent: 'center',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: Q.border,
    backgroundColor: Q.matrixFaint,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.full,
  },
  chipText: { color: Q.textSecondary, fontSize: 11, fontWeight: '600' },
  bio: { color: Q.textSecondary, fontSize: 14, lineHeight: 22, marginBottom: 12 },
  focusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  focusCard: {
    width: '48%',
    borderWidth: 1,
    borderColor: Q.border,
    backgroundColor: Q.bgPanel,
    borderRadius: radius.lg,
    padding: 12,
    marginBottom: 10,
  },
  focusIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: Q.matrixFaint,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  focusTitle: { color: Q.text, fontWeight: '800', fontSize: 13 },
  focusDesc: { color: Q.textMuted, fontSize: 11, lineHeight: 16, marginTop: 4 },
  expRow: { flexDirection: 'row', marginBottom: 4 },
  timeline: { width: 18, alignItems: 'center' },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Q.matrix,
    marginTop: 6,
    shadowColor: Q.matrix,
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  line: { flex: 1, width: 2, backgroundColor: Q.border, marginVertical: 4 },
  expCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: Q.border,
    backgroundColor: Q.bgPanel,
    borderRadius: radius.lg,
    padding: 14,
    marginLeft: 8,
    marginBottom: 12,
  },
  period: {
    color: Q.matrix,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  expRole: { color: Q.text, fontSize: 15, fontWeight: '800', marginTop: 4 },
  company: { color: Q.textMuted, marginTop: 2, marginBottom: 8 },
  expDesc: { color: Q.textSecondary, fontSize: 12, lineHeight: 18, marginBottom: 8 },
  hi: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 5 },
  hiText: { color: Q.textSecondary, fontSize: 12, flex: 1 },
  cert: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: Q.border,
    backgroundColor: Q.bgPanel,
    borderRadius: radius.lg,
    padding: 14,
    marginBottom: 10,
  },
  qubit: {
    color: Q.cyan,
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 1,
    width: 28,
  },
  certCat: {
    color: Q.violet,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  certTitle: { color: Q.text, fontWeight: '800', fontSize: 14, marginTop: 2 },
  certIssuer: { color: Q.textMuted, fontSize: 11, marginTop: 2 },
});
