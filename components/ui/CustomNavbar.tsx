import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const CustomNavbar = ({ extended = false }: { extended?: boolean }) => {
  const router = useRouter();

  return (
    <View style={styles.navbarContainer}>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/home')}>
        <Ionicons name="home-outline" size={24} color="#333" />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/messages')}>
        <Ionicons name="chatbubble-outline" size={24} color="#333" />
        <Text style={styles.label}>Messages</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/profile')}>
        <Ionicons name="person-outline" size={24} color="#333" />
        <Text style={styles.label}>Profile</Text>
      </TouchableOpacity>

      {extended && (
        <>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/search')}>
            <Ionicons name="search-outline" size={24} color="#333" />
            <Text style={styles.label}>Search</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => router.push('/settings')}>
            <Ionicons name="settings-outline" size={24} color="#333" />
            <Text style={styles.label}>Settings</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: width * 0.9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  label: {
    fontSize: 10,
    marginTop: 2,
    color: '#333',
  },
});

export default CustomNavbar;