import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import CustomNavbar from '@/components/ui/CustomNavbar';

const dummyCandidates = [
  { id: '1', name: 'Иван, 32, Официант' },
  { id: '2', name: 'Петр, 28, Продавец' },
];

export default function EmployerHome() {
  const router = useRouter();

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push(`/chat?id=${item.id}`)}>
        <Text style={styles.buttonText}>Contact</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Поиск сотрудников</Text>
      <FlatList data={dummyCandidates} keyExtractor={(item) => item.id} renderItem={renderItem} />
      <TouchableOpacity style={styles.link} onPress={() => router.push('/employer/VacancyList')}>
        <Text style={styles.linkText}>Список вакансий</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F6F8FA' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  item: { marginBottom: 15, padding: 15, backgroundColor: '#fff', borderRadius: 10, elevation: 2 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  button: { backgroundColor: '#4A90E2', padding: 10, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16 },
  link: { marginTop: 20, alignItems: 'center' },
  linkText: { color: '#4A90E2', fontSize: 16 },
});
