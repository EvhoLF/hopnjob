import React, { useEffect } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useVacancyStore } from '@/src/store/useVacancyStore';

export default function VacancyDetails() {
  const { selectedVacancy } = useVacancyStore();
  const router = useRouter();

  useEffect(() => {
    if (!selectedVacancy) router.replace('/jobseeker/Map');
  }, [selectedVacancy]);

  if (!selectedVacancy) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{selectedVacancy.title}</Text>
      <Text style={styles.row}>
        <Text style={styles.label}>Зарплата: </Text>
        {selectedVacancy.salaryFrom.toLocaleString()}–{selectedVacancy.salaryTo.toLocaleString()}{selectedVacancy.currency} / {selectedVacancy.period}
      </Text>
      <Text style={styles.row}>
        <Text style={styles.label}>Опыт: </Text>
        {selectedVacancy.experience}
      </Text>
      <Text style={styles.row}>
        <Text style={styles.label}>Занятость: </Text>
        {selectedVacancy.employment}
      </Text>
      <Text style={styles.row}>
        <Text style={styles.label}>График: </Text>
        {selectedVacancy.schedule}
      </Text>
      <Text style={styles.row}>
        <Text style={styles.label}>Формат: </Text>
        {selectedVacancy.format}
      </Text>
      <Text style={styles.row}>
        <Text style={styles.label}>Рабочие часы: </Text>
        {selectedVacancy.hours}
      </Text>
      <Text style={styles.row}>
        <Text style={styles.label}>Технологии: </Text>
        {selectedVacancy.tags.join(', ')}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 8 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  row: { fontSize: 16 },
  label: { fontWeight: '600' },
});
