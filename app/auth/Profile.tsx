// AuthSelectionScreen.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/src/contexts/AuthContext';

export default function Profile() {
  const { signInGoogle, signInApple, loading, user } = useAuth();
  const router = useRouter();
  const navigation = useRouter();

  useEffect(() => {
    if (!loading && !user) navigation.replace('/auth/SignIn');
  }, [user, loading]);


  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
});
