import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function EmployerProfile() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState('Компания Пример');
  const [about, setAbout] = useState('Краткое описание компании, не более 150 символов');

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.logo} />
      <TextInput style={styles.input} value={companyName} onChangeText={setCompanyName} placeholder="Название компании" placeholderTextColor="#999" />
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={about}
        onChangeText={setAbout}
        placeholder="О компании"
        placeholderTextColor="#999"
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={() => { /* Логика сохранения профиля */ }}>
        <Text style={styles.buttonText}>Сохранить</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => router.push('/login')}>
        <Text style={styles.linkText}>Log out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => router.push('/jobseeker/Home')}>
        <Text style={styles.linkText}>Switch to Job Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F6F8FA', alignItems: 'center' },
  logo: { width: 100, height: 100, marginBottom: 20, borderRadius: 10 },
  input: { width: '100%', height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, backgroundColor: '#fff', fontSize: 16, color: '#333' },
  button: { width: '100%', backgroundColor: '#4A90E2', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  link: { marginTop: 10 },
  linkText: { color: '#4A90E2', fontSize: 16 },
});
