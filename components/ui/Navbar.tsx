import React, { useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

const { width } = Dimensions.get('window');

const routes = [
  { path: '/home', icon: 'home-outline', label: 'Home' },
  { path: '/messages', icon: 'chatbubble-outline', label: 'Messages' },
  { path: '/auth/Profile', icon: 'person-outline', label: 'Profile' },
  { path: '/search', icon: 'search-outline', label: 'Search' },
  { path: '/settings', icon: 'settings-outline', label: 'Settings' },
];

const Navbar = ({ extended = false }: { extended?: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();

  const indicatorAnim = useRef(new Animated.Value(0)).current;

  const visibleRoutes = extended ? routes : routes.slice(0, 3);

  useEffect(() => {
    const index = visibleRoutes.findIndex((route) => pathname.startsWith(route.path));
    if (index !== -1) {
      Animated.spring(indicatorAnim, {
        toValue: index,
        useNativeDriver: false,
        damping: 12,
        stiffness: 100,
      }).start();
    }
  }, [pathname]);

  const indicatorWidth = width * 0.9 / visibleRoutes.length;

  return (
    <View style={styles.navbarContainer}>
      <Animated.View
        style={[
          styles.indicator,
          {
            left: indicatorAnim.interpolate({
              inputRange: visibleRoutes.map((_, i) => i),
              outputRange: visibleRoutes.map((_, i) => i * indicatorWidth),
            }),
            width: indicatorWidth,
          },
        ]}
      />
      {visibleRoutes.map(({ path, icon, label }) => {
        const isActive = pathname.startsWith(path);
        return (
          <TouchableOpacity key={path} style={styles.button} onPress={() => router.push(path)}>
            <Ionicons name={icon} size={24} color={isActive ? '#007aff' : '#333'} />
            <Text style={[styles.label, isActive && styles.labelActive]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 10,
    width: width * 0.9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    overflow: 'hidden',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    backgroundColor: '#007aff',
    borderRadius: 2,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    marginTop: 2,
    color: '#333',
  },
  labelActive: {
    color: '#007aff',
    fontWeight: 'bold',
  },
});

export default Navbar;
