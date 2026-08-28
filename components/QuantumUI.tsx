import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Q, radius } from '../lib/quantum';

export function ScreenHeader({
  title,
  subtitle,
  badge,
}: {
  title: string;
  subtitle?: string;
  badge?: string;
}) {
  return (
    <Animated.View entering={FadeInDown.duration(450)} style={styles.header}>
      <View style={styles.headerRow}>
        <Text style={styles.kicker}>QUANTUM MATRIX</Text>
        {badge ? (
          <View style={styles.badge}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : null}
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      <View style={styles.headerLine} />
    </Animated.View>
  );
}

export function SectionLabel({
  code,
  title,
  subtitle,
}: {
  code?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={{ marginBottom: 14, marginTop: 6 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        {code ? <Text style={styles.code}>{code}</Text> : null}
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: Q.border }} />
      </View>
      {subtitle ? <Text style={styles.sectionSub}>{subtitle}</Text> : null}
    </View>
  );
}

export function QButton({
  title,
  onPress,
  icon,
  variant = 'primary',
  style,
  loading,
}: {
  title: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: 'primary' | 'outline' | 'ghost';
  style?: ViewStyle;
  loading?: boolean;
}) {
  const scale = useSharedValue(1);
  const anim = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.96);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      disabled={loading}
    >
      <Animated.View
        style={[
          styles.btn,
          isPrimary && styles.btnPrimary,
          variant === 'outline' && styles.btnOutline,
          variant === 'ghost' && styles.btnGhost,
          style,
          anim,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={isPrimary ? Q.bg : Q.matrix} />
        ) : (
          <>
            {icon ? (
              <Ionicons name={icon} size={16} color={isPrimary ? Q.bg : Q.matrix} />
            ) : null}
            <Text style={[styles.btnText, { color: isPrimary ? Q.bg : Q.matrix }]}>
              {title}
            </Text>
          </>
        )}
      </Animated.View>
    </Pressable>
  );
}

export function StatNode({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export function SkillMeter({
  name,
  icon,
  level,
  index = 0,
}: {
  name: string;
  icon: string;
  level: number;
  index?: number;
}) {
  const p = useSharedValue(0);
  useEffect(() => {
    p.value = withDelay(
      index * 45,
      withTiming(level / 100, { duration: 900, easing: Easing.out(Easing.cubic) })
    );
  }, [level, index]);

  const fill = useAnimatedStyle(() => ({
    width: `${p.value * 100}%`,
  }));

  return (
    <View style={styles.meter}>
      <View style={styles.meterTop}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Ionicons
            name={icon as keyof typeof Ionicons.glyphMap}
            size={15}
            color={Q.matrix}
          />
          <Text style={styles.meterName}>{name}</Text>
        </View>
        <Text style={styles.meterLvl}>{level}%</Text>
      </View>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, fill]} />
      </View>
    </View>
  );
}

export function Panel({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return <View style={[styles.panel, style]}>{children}</View>;
}

export function FadeItem({
  children,
  index = 0,
}: {
  children: React.ReactNode;
  index?: number;
}) {
  return (
    <Animated.View entering={FadeInDown.delay(index * 55).springify().damping(16)}>
      {children}
    </Animated.View>
  );
}

export function QuantumBackdrop({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <LinearGradient
      colors={[Q.bgDeep, Q.bg, '#031510']}
      locations={[0, 0.45, 1]}
      style={StyleSheet.absoluteFill}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: { marginBottom: 18 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  kicker: {
    color: Q.matrix,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2.4,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: Q.borderStrong,
    backgroundColor: Q.matrixFaint,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.full,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Q.matrix,
  },
  badgeText: {
    color: Q.matrix,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    color: Q.text,
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  subtitle: {
    color: Q.textMuted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
  },
  headerLine: {
    marginTop: 14,
    height: 1,
    backgroundColor: Q.border,
  },
  code: {
    color: Q.cyan,
    fontWeight: '900',
    fontSize: 12,
    letterSpacing: 1.5,
  },
  sectionTitle: {
    color: Q.text,
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.4,
  },
  sectionSub: {
    color: Q.textMuted,
    fontSize: 12,
    marginTop: 6,
    lineHeight: 18,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderRadius: radius.full,
  },
  btnPrimary: {
    backgroundColor: Q.matrix,
    shadowColor: Q.matrix,
    shadowOpacity: 0.45,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
  },
  btnOutline: {
    borderWidth: 1.5,
    borderColor: Q.borderStrong,
    backgroundColor: 'transparent',
  },
  btnGhost: {
    backgroundColor: Q.matrixFaint,
  },
  btnText: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Q.border,
    backgroundColor: Q.bgPanel,
    borderRadius: radius.md,
  },
  statValue: {
    color: Q.matrix,
    fontSize: 20,
    fontWeight: '900',
  },
  statLabel: {
    color: Q.textMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  meter: {
    borderWidth: 1,
    borderColor: Q.border,
    backgroundColor: Q.bgPanel,
    borderRadius: radius.md,
    padding: 12,
    marginBottom: 10,
  },
  meterTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  meterName: { color: Q.text, fontWeight: '700', fontSize: 13 },
  meterLvl: { color: Q.matrix, fontWeight: '900', fontSize: 12 },
  track: {
    height: 5,
    borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 99,
    backgroundColor: Q.matrix,
    shadowColor: Q.matrix,
    shadowOpacity: 0.7,
    shadowRadius: 6,
  },
  panel: {
    borderWidth: 1,
    borderColor: Q.border,
    backgroundColor: Q.bgPanel,
    borderRadius: radius.lg,
    padding: 16,
  },
});
