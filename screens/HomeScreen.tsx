import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { QuantumScene } from '../components/QuantumScene';
import { AIOrb } from '../components/AIOrb';
import { ParticleBurst } from '../components/ParticleField';
import {
  ScreenHeader,
  SectionLabel,
  QButton,
  StatNode,
  FadeItem,
} from '../components/QuantumUI';
import { Q, radius, spacing } from '../lib/quantum';
import { profile, socials, quantumNodes, archDecisions } from '../lib/data';
import type { MainTabParamList } from '../App';

export function HomeScreen() {
  const navigation =
    useNavigation<BottomTabNavigationProp<MainTabParamList>>();
  const [burst, setBurst] = useState(0);
  const [decisionIdx, setDecisionIdx] = useState(0);

  const fireOrb = () => {
    setBurst((b) => b + 1);
    setDecisionIdx((i) => (i + 1) % archDecisions.length);
  };

  const decision = archDecisions[decisionIdx];

  return (
    <QuantumScene>
      <StatusBar style="light" />
      <ParticleBurst active={burst > 0} key={burst} originY={160} count={20} color={Q.cyan} />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <ScreenHeader
            title="Quantum Matrix"
            subtitle="Portfolio OS · Moe Kyaw Aung · Android Senior Developer"
            badge={profile.available ? 'ONLINE' : undefined}
          />

          <Animated.View entering={FadeInUp.duration(600)} style={styles.hero}>
            <View style={styles.avatarRing}>
              <Image
                source={{ uri: profile.avatar }}
                style={styles.avatar}
                contentFit="cover"
                transition={400}
              />
              <View style={styles.avatarGlow} />
            </View>

            <Text style={styles.codename}>{profile.codename}</Text>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.role}>{profile.title}</Text>
            <Text style={styles.tagline}>{profile.tagline}</Text>

            <View style={styles.meta}>
              <Ionicons name="location-outline" size={13} color={Q.matrix} />
              <Text style={styles.metaText}>{profile.location}</Text>
              <Text style={styles.metaDot}>◈</Text>
              <Text style={styles.metaText}>{profile.company}</Text>
            </View>

            <View style={styles.stats}>
              {profile.stats.map((s) => (
                <StatNode key={s.label} value={s.value} label={s.label} />
              ))}
            </View>

            <View style={styles.actions}>
              <QButton
                title="Enter Nodes"
                icon="git-network-outline"
                onPress={() => navigation.navigate('Nodes')}
                style={{ flex: 1 }}
              />
              <QButton
                title="Connect"
                icon="radio-outline"
                variant="outline"
                onPress={() => navigation.navigate('Connect')}
                style={{ flex: 1 }}
              />
            </View>
          </Animated.View>

          {/* Floating AI Orb */}
          <SectionLabel
            code="ORB·00"
            title="Architecture AI Orb"
            subtitle="Tap to collapse a decision into particle space"
          />
          <View style={styles.orbPanel}>
            <View style={styles.orbRow}>
              <AIOrb size={92} bursting={burst > 0} onPress={fireOrb} label="AI" />
              <View style={{ flex: 1 }}>
                <Text style={styles.decisionImpact}>
                  {decision.impact.toUpperCase()} IMPACT · {decision.particles} PARTICLES
                </Text>
                <Text style={styles.decisionTitle}>{decision.title}</Text>
                <Text style={styles.decisionBody}>{decision.rationale}</Text>
                <Pressable onPress={fireOrb} style={styles.orbCta}>
                  <Ionicons name="flash" size={14} color={Q.cyan} />
                  <Text style={styles.orbCtaText}>Pulse decision</Text>
                </Pressable>
              </View>
            </View>
          </View>

          <SectionLabel
            code="NET·01"
            title="Quantum Node Preview"
            subtitle="Architecture graph — full mesh on Nodes tab"
          />
          <View style={styles.nodePreview}>
            {quantumNodes.slice(0, 4).map((n, i) => (
              <FadeItem key={n.id} index={i}>
                <Pressable
                  onPress={() => navigation.navigate('Nodes')}
                  style={styles.miniNode}
                >
                  <Ionicons
                    name={n.icon as keyof typeof Ionicons.glyphMap}
                    size={16}
                    color={Q.matrix}
                  />
                  <Text style={styles.miniTitle} numberOfLines={1}>
                    {n.title}
                  </Text>
                  <Text style={styles.miniEnergy}>{n.energy}</Text>
                </Pressable>
              </FadeItem>
            ))}
          </View>

          <SectionLabel code="SIG·02" title="Signal Links" />
          <View style={styles.links}>
            {socials.slice(0, 4).map((s, i) => (
              <FadeItem key={s.id} index={i}>
                <Pressable
                  onPress={() => Linking.openURL(s.url)}
                  style={styles.linkCard}
                >
                  <Ionicons
                    name={s.icon as keyof typeof Ionicons.glyphMap}
                    size={20}
                    color={Q.cyan}
                  />
                  <Text style={styles.linkName}>{s.name}</Text>
                  <Text style={styles.linkHandle} numberOfLines={1}>
                    {s.handle}
                  </Text>
                </Pressable>
              </FadeItem>
            ))}
          </View>

          <LinearGradient
            colors={['rgba(0,255,156,0.12)', 'rgba(177,78,255,0.14)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cta}
          >
            <Text style={styles.ctaTitle}>Initialize Collaboration</Text>
            <Text style={styles.ctaSub}>
              {profile.location} · {profile.timezone} · Android systems
            </Text>
            <View style={styles.ctaRow}>
              <QButton
                title="Website"
                icon="globe-outline"
                onPress={() => Linking.openURL(profile.website)}
              />
              <QButton
                title="LinkedIn"
                icon="logo-linkedin"
                variant="outline"
                onPress={() => Linking.openURL(profile.linkedin)}
              />
            </View>
          </LinearGradient>

          <Text style={styles.footer}>
            QUANTUM MATRIX PORTFOLIO · © 2026 MKA · PRO
          </Text>
          <View style={{ height: 28 }} />
        </ScrollView>
      </SafeAreaView>
    </QuantumScene>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: spacing.lg, paddingBottom: 24 },
  hero: { alignItems: 'center', marginBottom: 28 },
  avatarRing: {
    width: 118,
    height: 118,
    borderRadius: 59,
    borderWidth: 2,
    borderColor: Q.matrix,
    padding: 3,
    marginBottom: 16,
    shadowColor: Q.matrix,
    shadowOpacity: 0.55,
    shadowRadius: 18,
  },
  avatar: { width: '100%', height: '100%', borderRadius: 56 },
  avatarGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 59,
    borderWidth: 1,
    borderColor: Q.cyan + '55',
  },
  codename: {
    color: Q.cyan,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2.5,
    marginBottom: 6,
  },
  name: {
    color: Q.text,
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
  },
  role: {
    color: Q.matrix,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 6,
  },
  tagline: {
    color: Q.textMuted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 8,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 14,
  },
  metaText: { color: Q.textSecondary, fontSize: 12 },
  metaDot: { color: Q.textFaint, fontSize: 10 },
  stats: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
    marginTop: 22,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    marginTop: 18,
  },
  orbPanel: {
    borderWidth: 1,
    borderColor: Q.border,
    backgroundColor: 'rgba(0,20,30,0.75)',
    borderRadius: radius.xl,
    padding: 16,
    marginBottom: 26,
  },
  orbRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  decisionImpact: {
    color: Q.violet,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  decisionTitle: {
    color: Q.text,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  decisionBody: {
    color: Q.textMuted,
    fontSize: 12,
    lineHeight: 18,
  },
  orbCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },
  orbCtaText: {
    color: Q.cyan,
    fontWeight: '800',
    fontSize: 12,
  },
  nodePreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  miniNode: {
    width: '48%',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: Q.border,
    backgroundColor: Q.bgPanel,
    borderRadius: radius.md,
    padding: 12,
  },
  miniTitle: { flex: 1, color: Q.text, fontWeight: '700', fontSize: 12 },
  miniEnergy: { color: Q.matrix, fontWeight: '900', fontSize: 12 },
  links: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  linkCard: {
    width: '48%',
    flexGrow: 1,
    borderWidth: 1,
    borderColor: Q.border,
    backgroundColor: Q.bgPanel,
    borderRadius: radius.lg,
    padding: 14,
  },
  linkName: { color: Q.text, fontWeight: '800', marginTop: 8, fontSize: 13 },
  linkHandle: { color: Q.textMuted, fontSize: 11, marginTop: 2 },
  cta: {
    borderWidth: 1,
    borderColor: Q.border,
    borderRadius: radius.xl,
    padding: 24,
    alignItems: 'center',
    marginBottom: 18,
  },
  ctaTitle: { color: Q.text, fontSize: 20, fontWeight: '900', marginBottom: 6 },
  ctaSub: {
    color: Q.textMuted,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 16,
  },
  ctaRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap', justifyContent: 'center' },
  footer: {
    textAlign: 'center',
    color: Q.textFaint,
    fontSize: 10,
    letterSpacing: 1.4,
  },
});
