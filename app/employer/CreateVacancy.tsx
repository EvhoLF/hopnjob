import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function CreateVacancy() {
  const { id } = useSearchParams();
  const router = useRouter();
  const [position, setPosition] = useState(id ? 'Официант' : '');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [employment, setEmployment] = useState('full-time');
  const [salary, setSalary] = useState('');
  const [location, setLocation] = useState('');

  const handleSave = () => {
    // Логика сохранения вакансии
    router.push('/employer/VacancyList');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>{id ? 'Редактировать вакансию' : 'Создать вакансию'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Название вакансии"
        placeholderTextColor="#999"
        value={position}
        onChangeText={setPosition}
      />
      <TextInput
        style={styles.input}
        placeholder="Категория"
        placeholderTextColor="#999"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Описание вакансии"
        placeholderTextColor="#999"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Тип занятости (part-time/full-time)"
        placeholderTextColor="#999"
        value={employment}
        onChangeText={setEmployment}
      />
      <TextInput
        style={styles.input}
        placeholder="Зарплата"
        placeholderTextColor="#999"
        value={salary}
        onChangeText={setSalary}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Местоположение"
        placeholderTextColor="#999"
        value={location}
        onChangeText={setLocation}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>{id ? 'Сохранить изменения' : 'Опубликовать вакансию'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => router.back()}>
        <Text style={styles.linkText}>Отмена</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#F6F8FA', flexGrow: 1 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#333', textAlign: 'center' },
  input: { width: '100%', height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, backgroundColor: '#fff', fontSize: 16, color: '#333' },
  multiline: { height: 100, textAlignVertical: 'top' },
  button: { backgroundColor: '#4A90E2', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  link: { marginTop: 15, alignItems: 'center' },
  linkText: { color: '#4A90E2', fontSize: 16 },
});
