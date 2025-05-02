import { Vacancy } from '@/src/types/Vacancy';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface VacancyDetailCardProps {
  vacancy: Vacancy | null;
  loading: boolean;
}

const VacancyDetailCard: React.FC<VacancyDetailCardProps> = ({ vacancy, loading }) => {
  if (loading) {
    return <Text style={styles.loading}>Загрузка...</Text>;
  }

  if (!vacancy) {
    return <Text style={styles.error}>Вакансия не найдена.</Text>;
  }

  const { label, salaryFrom, salaryTo, currency, unit, experience, tags } = vacancy;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{label}</Text>
      <Text style={styles.salary}>
        Зарплата: {salaryFrom}–{salaryTo} {currency} / {unit === 'hour' ? 'час' : unit === 'day' ? 'день' : 'месяц'}
      </Text>
      {experience && <Text style={styles.experience}>Опыт: {experience}</Text>}
      <Text style={styles.sectionTitle}>Теги:</Text>
      {tags.map((tag, index) => (
        <Text key={index} style={styles.tag}>• {tag}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  salary: {
    fontSize: 16,
    color: '#333',
  },
  experience: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  sectionTitle: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: 'bold',
  },
  tag: {
    fontSize: 14,
    color: '#333',
  },
  loading: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    padding: 20,
  },
  error: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    padding: 20,
  },
});

export default VacancyDetailCard;
