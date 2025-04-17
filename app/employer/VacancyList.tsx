import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const dummyVacancies = [
  { id: '1', position: 'Официант', status: 'Активная', responses: 3 },
  { id: '2', position: 'Продавец', status: 'Закрыта', responses: 0 },
];

export default function VacancyList() {
  const router = useRouter();

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <Text style={styles.position}>{item.position}</Text>
      <Text style={styles.detail}>Статус: {item.status}</Text>
      <Text style={styles.detail}>Откликов: {item.responses}</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push(`/employer/CreateVacancy?id=${item.id}`)}>
        <Text style={styles.buttonText}>Редактировать</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <FlatList data={dummyVacancies} keyExtractor={(item) => item.id} renderItem={renderItem} />
      <TouchableOpacity style={styles.buttonCreate} onPress={() => router.push('/employer/CreateVacancy')}>
        <Text style={styles.buttonText}>Создать вакансию</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F6F8FA' },
  item: { padding: 15, backgroundColor: '#fff', borderRadius: 10, marginBottom: 15, elevation: 2 },
  position: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  detail: { fontSize: 16, color: '#555', marginBottom: 5 },
  button: { backgroundColor: '#4A90E2', padding: 10, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  buttonCreate: { backgroundColor: '#50E3C2', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 },
});
