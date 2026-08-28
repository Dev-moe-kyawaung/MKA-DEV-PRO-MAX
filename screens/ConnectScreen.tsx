import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QuantumScene } from '../components/QuantumScene';
import { AIOrb } from '../components/AIOrb';
import { ParticleBurst } from '../components/ParticleField';
import {
  ScreenHeader,
  SectionLabel,
  QButton,
  FadeItem,
  Panel,
} from '../components/QuantumUI';
import { Q, radius, spacing } from '../lib/quantum';
import { profile, socials } from '../lib/data';

const DRAFT_KEY = '@qm_contact_draft';

export function ConnectScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [burst, setBurst] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem(DRAFT_KEY).then((raw) => {
      if (!raw) return;
      try {
        const d = JSON.parse(raw);
        setName(d.name || '');
        setEmail(d.email || '');
        setMessage(d.message || '');
      } catch {
        /* ignore */
      }
    });
  }, []);

  const saveDraft = (n: string, e: string, m: string) => {
    AsyncStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({ name: n, email: e, message: m })
    ).catch(() => undefined);
  };

  const onSend = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      Alert.alert('Incomplete signal', 'Fill name, email, and message.');
      return;
    }
    setSending(true);
    setBurst((b) => b + 1);
    const subject = encodeURIComponent(`Quantum Matrix inquiry from ${name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`
    );
    try {
      await Linking.openURL(`mailto:${profile.email}?subject=${subject}&body=${body}`);
      await AsyncStorage.removeItem(DRAFT_KEY);
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      Alert.alert('Channel offline', `Reach me at ${profile.email}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <QuantumScene particleCount={20}>
      <StatusBar style="light" />
      <ParticleBurst active={burst > 0} key={burst} originY={140} count={18} />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <ScreenHeader
              title="Connect"
              subtitle="Open a channel · hire · collaborate · ship"
              badge="RECEPTIVE"
            />

            <View style={styles.orbCenter}>
              <AIOrb size={80} bursting={burst > 0} onPress={() => setBurst((b) => b + 1)} />
              <Text style={styles.orbCaption}>Signal relay online</Text>
            </View>

            <View style={styles.direct}>
              <Direct
                icon="mail"
                label="Email"
                value={profile.email}
                onPress={() => Linking.openURL(`mailto:${profile.email}`)}
              />
              <Direct
                icon="call"
                label="Call"
                value={profile.phone}
                onPress={() => Linking.openURL(`tel:${profile.phone}`)}
              />
            </View>

            <SectionLabel code="NET·01" title="Social Graph" />
            {socials.map((s, i) => (
              <FadeItem key={s.id} index={i}>
                <Pressable
                  onPress={() => Linking.openURL(s.url)}
                  style={styles.social}
                >
                  <View style={styles.socialIcon}>
                    <Ionicons
                      name={s.icon as keyof typeof Ionicons.glyphMap}
                      size={20}
                      color={Q.cyan}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.socialName}>{s.name}</Text>
                    <Text style={styles.socialHandle}>{s.handle}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={Q.textFaint} />
                </Pressable>
              </FadeItem>
            ))}

            <SectionLabel
              code="MSG·02"
              title="Transmit Message"
              subtitle="Drafts persist in local quantum storage"
            />
            <Panel>
              <Field
                label="Name"
                value={name}
                placeholder="Your name"
                onChange={(t) => {
                  setName(t);
                  saveDraft(t, email, message);
                }}
              />
              <Field
                label="Email"
                value={email}
                placeholder="you@company.com"
                keyboardType="email-address"
                autoCapitalize="none"
                onChange={(t) => {
                  setEmail(t);
                  saveDraft(name, t, message);
                }}
              />
              <Field
                label="Message"
                value={message}
                placeholder="Describe the mission..."
                multiline
                onChange={(t) => {
                  setMessage(t);
                  saveDraft(name, email, t);
                }}
              />
              <QButton
                title="Send Signal"
                icon="send"
                onPress={onSend}
                loading={sending}
              />
            </Panel>

            <LinearGradient
              colors={['rgba(0,255,156,0.1)', 'rgba(177,78,255,0.12)']}
              style={styles.cta}
            >
              <Text style={styles.ctaTitle}>Open to opportunities</Text>
              <Text style={styles.ctaSub}>
                Android Senior · consulting · {profile.location}
              </Text>
              <QButton
                title="LinkedIn"
                icon="logo-linkedin"
                variant="outline"
                onPress={() => Linking.openURL(profile.linkedin)}
              />
            </LinearGradient>

            <Text style={styles.footer}>
              QUANTUM MATRIX · © 2026 {profile.name} · {profile.timezone}
            </Text>
            <View style={{ height: 36 }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </QuantumScene>
  );
}

function Direct({
  icon,
  label,
  value,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.directCard}>
      <View style={styles.directIcon}>
        <Ionicons name={icon} size={18} color={Q.matrix} />
      </View>
      <Text style={styles.directLabel}>{label}</Text>
      <Text style={styles.directValue} numberOfLines={1}>
        {value}
      </Text>
    </Pressable>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  multiline,
  keyboardType,
  autoCapitalize,
}: {
  label: string;
  value: string;
  onChange: (t: string) => void;
  placeholder: string;
  multiline?: boolean;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'words' | 'sentences';
}) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={Q.textFaint}
        multiline={multiline}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        textAlignVertical={multiline ? 'top' : 'center'}
        style={[styles.input, multiline && { minHeight: 110 }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: spacing.lg, paddingBottom: 24 },
  orbCenter: { alignItems: 'center', marginBottom: 20 },
  orbCaption: {
    color: Q.textMuted,
    fontSize: 12,
    marginTop: 8,
    letterSpacing: 1,
  },
  direct: { flexDirection: 'row', gap: 10, marginBottom: 22 },
  directCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: Q.border,
    backgroundColor: Q.bgPanel,
    borderRadius: radius.lg,
    padding: 14,
  },
  directIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: Q.matrixFaint,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  directLabel: {
    color: Q.matrix,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  directValue: { color: Q.textSecondary, fontSize: 11, marginTop: 4 },
  social: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: Q.border,
    backgroundColor: Q.bgPanel,
    borderRadius: radius.lg,
    padding: 12,
    marginBottom: 8,
  },
  socialIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Q.border,
    backgroundColor: Q.cyanDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialName: { color: Q.text, fontWeight: '800' },
  socialHandle: { color: Q.textMuted, fontSize: 12, marginTop: 2 },
  fieldLabel: {
    color: Q.textMuted,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Q.border,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: Q.text,
    fontSize: 15,
  },
  cta: {
    marginTop: 22,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: Q.border,
    padding: 22,
    alignItems: 'center',
  },
  ctaTitle: { color: Q.text, fontWeight: '900', fontSize: 18 },
  ctaSub: {
    color: Q.textMuted,
    textAlign: 'center',
    marginVertical: 10,
    lineHeight: 18,
  },
  footer: {
    textAlign: 'center',
    color: Q.textFaint,
    marginTop: 18,
    fontSize: 10,
    letterSpacing: 1.2,
  },
});
