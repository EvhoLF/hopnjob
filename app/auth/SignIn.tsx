// SignInScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { useAuth } from '@/src/contexts/AuthContext';
import { Link, useRouter } from 'expo-router';
import DividerWithText from '@/components/ui/DividerWithText';
import Button from '@/components/ui/Button';
import LinkRoute from '@/components/ui/LinkRoute';

export default function SignIn() {
  const { signIn, isLoading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const onSubmit = async () => {
    // try {
    //   await signInEmail(email, pass);
    // } catch (e: any) {
    //   Alert.alert('Login Error', e.message);
    // }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in</Text>
      <Button onPress={() => { }} iconStart='apple' variant='link'>Continue with Apple</Button>
      <Button onPress={signIn} iconStart='google' variant='link'>Continue with Google</Button>
      <DividerWithText>or</DividerWithText>

      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} value={pass} onChangeText={setPass} placeholder="Password" secureTextEntry />

      <Button onPress={onSubmit}>Log In</Button>

      {/* <TouchableOpacity> */}
      {/* <Text style={styles.link}>Forgot your password?</Text> */}
      {/* </TouchableOpacity> */}
      <LinkRoute href='/auth/SignUp' style={styles.link}>Don’t have an account? Register</LinkRoute>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 28, marginBottom: 24, textAlign: 'center' },
  input: {
    borderWidth: 1, borderRadius: 8, padding: 12,
    marginBottom: 12,
  },
  buttonLink: {
    width: '100%', padding: 12, marginVertical: 8,
    borderWidth: 1, borderRadius: 8, alignItems: 'center',
  },
  button: {
    backgroundColor: '#467b9e', padding: 14,
    borderRadius: 8, alignItems: 'center',
    marginBottom: 16,
  },
  link: { color: '#467b9e', textAlign: 'center', marginVertical: 4 },
});
