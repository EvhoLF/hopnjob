// SignUpScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { useAuth } from '@/src/contexts/AuthContext';
import { Link } from 'expo-router';
import Button from '@/components/ui/Button';
import DividerWithText from '@/components/ui/DividerWithText';

export default function SignUp() {
  const { signUp, signInGoogle, signInApple } = useAuth();
  const [firstName, setFirst] = useState('');
  const [lastName, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const onSubmit = async () => {
    try {
      await signUp(firstName, lastName, email, pass);
    } catch (e: any) {
      Alert.alert('Registration Error', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <Button onPress={signInApple} iconStart='apple' variant='link'>Continue with Apple</Button>
      <Button onPress={signInGoogle} iconStart='google' variant='link'>Continue with Google</Button>
      <DividerWithText />
      <View style={styles.row}>
        <TextInput style={[styles.input, { flex: 1 }]} value={firstName} onChangeText={setFirst} placeholder="First name" />
        <TextInput style={[styles.input, { flex: 1 }]} value={lastName} onChangeText={setLast} placeholder="Last name" />
      </View>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} value={pass} onChangeText={setPass} placeholder="Password" secureTextEntry />
      <Button onPress={onSubmit}>Create an account</Button>
      <Link href='/auth/SignIn' style={styles.link}>Already have an account? Log in</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 28, marginBottom: 24, textAlign: 'center' },
  row: { flexDirection: 'row', gap: 12 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#467b9e',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  link: { color: '#467b9e', textAlign: 'center', marginVertical: 4 },
});
