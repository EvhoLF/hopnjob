import VacancyDetailCard from '@/components/Vacancy/VacancyDetailCard';
import { VacancyData } from '@/src/data/VacancyData';
import { Vacancy } from '@/src/types/Vacancy';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

const JobDetailScreen = () => {
  const { id } = useLocalSearchParams(); // получить id из параметров
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        // Здесь сделай свой реальный запрос, например fetch(`https://api.myapp.com/vacancy/${id}`)
        const response = await VacancyData.find(e => e.id == id);
        setVacancy(response ?? null);
      } catch (error) {
        console.error('Ошибка при загрузке вакансии:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVacancy();
    }
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }
  if (!vacancy) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Вакансия не найдена.</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <VacancyDetailCard vacancy={vacancy} loading={loading} />
    </ScrollView>
  );
};

export default JobDetailScreen;
