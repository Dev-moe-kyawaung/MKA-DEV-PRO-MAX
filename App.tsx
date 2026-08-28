import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { HomeScreen } from './screens/HomeScreen';
import { NodesScreen } from './screens/NodesScreen';
import { SkillsScreen } from './screens/SkillsScreen';
import { AboutScreen } from './screens/AboutScreen';
import { ConnectScreen } from './screens/ConnectScreen';
import { Q } from './lib/quantum';

export type MainTabParamList = {
  Matrix: undefined;
  Nodes: undefined;
  Skills: undefined;
  About: undefined;
  Connect: undefined;
};

export type RootStackParamList = {
  Main: { screen?: keyof MainTabParamList } | undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: Q.bg,
    card: Q.bg,
    primary: Q.matrix,
    text: Q.text,
    border: Q.border,
    notification: Q.violet,
  },
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Q.matrix,
        tabBarInactiveTintColor: Q.textFaint,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ color, size, focused }) => {
          const map: Record<
            keyof MainTabParamList,
            keyof typeof Ionicons.glyphMap
          > = {
            Matrix: focused ? 'planet' : 'planet-outline',
            Nodes: focused ? 'git-network' : 'git-network-outline',
            Skills: focused ? 'pulse' : 'pulse-outline',
            About: focused ? 'person' : 'person-outline',
            Connect: focused ? 'radio' : 'radio-outline',
          };
          return (
            <Ionicons
              name={map[route.name as keyof MainTabParamList]}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Matrix"
        component={HomeScreen}
        options={{ title: 'Matrix' }}
      />
      <Tab.Screen name="Nodes" component={NodesScreen} />
      <Tab.Screen name="Skills" component={SkillsScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
      <Tab.Screen name="Connect" component={ConnectScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.boot}>
        <ActivityIndicator color={Q.matrix} size="large" />
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer theme={navTheme}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={MainTabs} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="light" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  boot: {
    flex: 1,
    backgroundColor: Q.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    backgroundColor: Q.tabBar,
    borderTopColor: Q.border,
    borderTopWidth: 1,
    height: 64,
    paddingBottom: 8,
    paddingTop: 6,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
});
