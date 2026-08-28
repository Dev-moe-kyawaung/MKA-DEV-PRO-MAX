import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  LayoutChangeEvent,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
  interpolate,
  FadeIn,
} from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Q, radius } from '../lib/quantum';
import { quantumNodes, type QuantumNode } from '../lib/data';

const { width: SCREEN_W } = Dimensions.get('window');

type LayoutNode = QuantumNode & { x: number; y: number };

function layoutNodes(w: number): LayoutNode[] {
  const cols = 2;
  const cardW = (w - 24) / cols;
  const cardH = 108;
  return quantumNodes.map((n, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    return {
      ...n,
      x: col * cardW + cardW / 2 + 4,
      y: row * (cardH + 18) + cardH / 2,
    };
  });
}

function GraphLine({
  x1,
  y1,
  x2,
  y2,
  delay,
  active,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
  active: boolean;
}) {
  const t = useSharedValue(0);
  const pulse = useSharedValue(0);

  useEffect(() => {
    t.value = withDelay(
      delay,
      withTiming(1, { duration: 800, easing: Easing.out(Easing.cubic) })
    );
    pulse.value = withDelay(
      delay + 400,
      withRepeat(
        withTiming(1, { duration: 1800, easing: Easing.inOut(Easing.sin) }),
        -1,
        true
      )
    );
  }, [delay]);

  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  const style = useAnimatedStyle(() => ({
    width: interpolate(t.value, [0, 1], [0, length]),
    opacity: interpolate(pulse.value, [0, 1], [0.35, active ? 0.95 : 0.55]),
  }));

  const packetStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(pulse.value, [0, 1], [0, Math.max(length - 8, 0)]),
      },
    ],
    opacity: t.value > 0.9 ? interpolate(pulse.value, [0, 0.5, 1], [0.2, 1, 0.2]) : 0,
  }));

  return (
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        left: x1,
        top: y1 - 1,
        width: length,
        height: 8,
        marginLeft: 0,
        transform: [
          { translateX: 0 },
          { rotate: `${angle}deg` },
        ],
        // Anchor rotation at the start of the segment
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <View style={{ width: length, height: 8, justifyContent: 'center' }}>
        <Animated.View
          style={[
            {
              height: 2,
              backgroundColor: active ? Q.cyan : Q.matrix,
              shadowColor: active ? Q.cyan : Q.matrix,
              shadowOpacity: 0.8,
              shadowRadius: 4,
            },
            style,
          ]}
        />
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: Q.white,
              shadowColor: Q.cyan,
              shadowOpacity: 1,
              shadowRadius: 6,
            },
            packetStyle,
          ]}
        />
      </View>
    </View>
  );
}

function NodeCard({
  node,
  selected,
  onPress,
  index,
}: {
  node: LayoutNode;
  selected: boolean;
  onPress: () => void;
  index: number;
}) {
  const hum = useSharedValue(0);

  useEffect(() => {
    hum.value = withDelay(
      index * 80,
      withRepeat(
        withTiming(1, { duration: 2200 + index * 100, easing: Easing.inOut(Easing.sin) }),
        -1,
        true
      )
    );
  }, [index]);

  const style = useAnimatedStyle(() => ({
    transform: [
      { scale: selected ? 1.03 : interpolate(hum.value, [0, 1], [1, 1.02]) },
    ],
    borderColor: selected ? Q.cyan : Q.border,
    shadowOpacity: selected ? 0.55 : interpolate(hum.value, [0, 1], [0.15, 0.35]),
  }));

  const statusColor =
    node.status === 'stable'
      ? Q.matrix
      : node.status === 'entangled'
        ? Q.cyan
        : node.status === 'superposition'
          ? Q.violet
          : Q.amber;

  return (
    <Animated.View entering={FadeIn.delay(index * 70).duration(400)} style={{ width: '48%' }}>
      <Pressable onPress={onPress}>
        <Animated.View
          style={[
            styles.card,
            {
              shadowColor: statusColor,
            },
            style,
          ]}
        >
          <View style={styles.cardTop}>
            <View style={[styles.iconBox, { backgroundColor: statusColor + '22', borderColor: statusColor + '66' }]}>
              <Ionicons
                name={node.icon as keyof typeof Ionicons.glyphMap}
                size={18}
                color={statusColor}
              />
            </View>
            <View style={[styles.energy, { borderColor: statusColor }]}>
              <Text style={[styles.energyText, { color: statusColor }]}>{node.energy}</Text>
            </View>
          </View>
          <Text style={styles.title} numberOfLines={1}>
            {node.title}
          </Text>
          <Text style={styles.sub} numberOfLines={1}>
            {node.subtitle}
          </Text>
          <View style={styles.footer}>
            <View style={[styles.dot, { backgroundColor: statusColor }]} />
            <Text style={[styles.status, { color: statusColor }]}>{node.status}</Text>
            <Text style={styles.cat}>{node.category}</Text>
          </View>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

type Props = {
  onSelect?: (node: QuantumNode) => void;
  selectedId?: string | null;
};

export function QuantumGraph({ onSelect, selectedId }: Props) {
  const [width, setWidth] = useState(SCREEN_W - 44);
  const nodes = useMemo(() => layoutNodes(width), [width]);

  const edges = useMemo(() => {
    const map = new Map(nodes.map((n) => [n.id, n]));
    const seen = new Set<string>();
    const list: { a: LayoutNode; b: LayoutNode; key: string }[] = [];
    nodes.forEach((n) => {
      n.links.forEach((lid) => {
        const key = [n.id, lid].sort().join('-');
        if (seen.has(key)) return;
        const other = map.get(lid);
        if (!other) return;
        seen.add(key);
        list.push({ a: n, b: other, key });
      });
    });
    return list;
  }, [nodes]);

  const rows = Math.ceil(nodes.length / 2);
  const graphH = rows * 126;

  const onLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  return (
    <View onLayout={onLayout} style={{ width: '100%' }}>
      <View style={{ height: graphH, marginBottom: 8 }}>
        {/* Connection lines layer */}
        <View style={[StyleSheet.absoluteFill, { zIndex: 0 }]} pointerEvents="none">
          {edges.map((e, i) => (
            <GraphLine
              key={e.key}
              x1={e.a.x}
              y1={e.a.y}
              x2={e.b.x}
              y2={e.b.y}
              delay={i * 60}
              active={
                selectedId === e.a.id ||
                selectedId === e.b.id ||
                (!!selectedId &&
                  (e.a.links.includes(selectedId) || e.b.links.includes(selectedId)))
              }
            />
          ))}
        </View>

        {/* Nodes layer */}
        <View style={[styles.grid, { zIndex: 2 }]}>
          {nodes.map((n, i) => (
            <NodeCard
              key={n.id}
              node={n}
              index={i}
              selected={selectedId === n.id}
              onPress={() => onSelect?.(n)}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 18,
  },
  card: {
    backgroundColor: 'rgba(0, 20, 18, 0.88)',
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: 12,
    minHeight: 108,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  energy: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  energyText: { fontSize: 11, fontWeight: '900' },
  title: { color: Q.text, fontWeight: '800', fontSize: 14 },
  sub: { color: Q.textMuted, fontSize: 11, marginTop: 2 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
  },
  dot: { width: 6, height: 6, borderRadius: 3 },
  status: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.6 },
  cat: { marginLeft: 'auto', color: Q.textFaint, fontSize: 10, fontWeight: '600' },
});
