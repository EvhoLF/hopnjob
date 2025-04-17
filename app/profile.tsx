import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Profile() {
  const router = useRouter();
  const [name, setName] = useState('Иван');
  const [surname, setSurname] = useState('Иванов');
  const [age, setAge] = useState('30');
  const [position, setPosition] = useState('Официант');

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <TouchableOpacity onPress={() => router.push('/jobseeker/VideoResume')}>
        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.avatar} />
      </TouchableOpacity>
      <Text style={styles.title}>Профиль соискателя</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Имя" placeholderTextColor="#999" />
      <TextInput style={styles.input} value={surname} onChangeText={setSurname} placeholder="Фамилия" placeholderTextColor="#999" />
      <TextInput style={styles.input} value={age} onChangeText={setAge} placeholder="Возраст" placeholderTextColor="#999" keyboardType="numeric" />
      <TextInput style={styles.input} value={position} onChangeText={setPosition} placeholder="Должность" placeholderTextColor="#999" />
      <TouchableOpacity style={styles.button} onPress={() => { /* Логика сохранения данных */ }}>
        <Text style={styles.buttonText}>Сохранить изменения</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => router.push('/login')}>
        <Text style={styles.linkText}>Выйти</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => router.push('/jobseeker/Following')}>
        <Text style={styles.linkText}>Following</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F6F8FA', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  input: { width: '100%', height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, backgroundColor: '#fff', fontSize: 16, color: '#333' },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
  button: { width: '100%', backgroundColor: '#4A90E2', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  link: { marginTop: 10 },
  linkText: { color: '#4A90E2', fontSize: 16 },
});
