import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Vacancy } from '@/src/types/Vacancy';
import { PointVacancies } from '@/src/types/PointVacancies';
import { Company } from '@/src/types/Company';
import { VacancyData } from '@/src/data/VacancyData';
import { CompanyData } from '@/src/data/CompanyData';

interface Props {
  point: PointVacancies | null;
  onClose: () => void;
}

export default function PointCard({ point, onClose }: Props) {
  const router = useRouter();

  const vacancies = useMemo(
    () => (point ? VacancyData.filter(v => point.vacancies.includes(v.id)) : []),
    [point]
  );

  const company = useMemo(
    () => CompanyData.find(c => c.id === point?.companyId) || null,
    [point]
  );

  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);

  useEffect(() => {
    if (vacancies.length) setSelectedVacancy(vacancies[0]);
  }, [vacancies]);

  if (!point || !company || !selectedVacancy) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderVacancyPill = ({ item }: { item: Vacancy }) => {
    const isSel = item.id === selectedVacancy.id;
    return (
      <Pressable
        onPress={() => setSelectedVacancy(item)}
        style={[styles.pill, isSel && styles.pillActive]}
      >
        <Text style={[styles.pillText, isSel && styles.pillTextActive]} numberOfLines={1}>
          {item.label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.wrapper}>
      {/* Верхний блок */}
      <View style={styles.topSection}>
        <View style={styles.header}>
          <Text style={styles.company}>{company.name}</Text>
          <Pressable onPress={onClose} style={styles.close}>
            <Ionicons name="close" size={20} color="#555" />
          </Pressable>
        </View>

        <FlatList
          data={vacancies}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillList}
          ItemSeparatorComponent={() => <View style={styles.pillSpacing} />}
          renderItem={renderVacancyPill}
          keyExtractor={v => v.id}
        />
      </View>

      {/* Блок деталей */}
      <View style={styles.detailsWrapper}>
        <ScrollView contentContainerStyle={styles.detailsScroll} >
          <Text style={styles.salary}>
            {selectedVacancy.salaryFrom.toLocaleString()}–
            {selectedVacancy.salaryTo.toLocaleString()}{' '}
            {selectedVacancy.currency}/{selectedVacancy.unit}
          </Text>
          <Text style={styles.detailLine}>
            <Text style={styles.boldText}>Опыт работы: </Text>
            {selectedVacancy.experience || 'не требуется'}
          </Text>

          <FlatList
            data={selectedVacancy.tags || []}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.pillList}
            ItemSeparatorComponent={() => <View style={styles.pillSpacing} />}
            renderItem={({ item }) => (
              <Pressable style={styles.pill}>
                <Text style={styles.pillText}>{item}</Text>
              </Pressable>
            )}
            keyExtractor={(t, i) => `${t}-${i}`}
          />
        </ScrollView>
      </View>

      {/* Кнопка внизу */}
      <Pressable
        onPress={() =>
          router.push({ pathname: '/jobseeker/VacancyDetail', params: { id: selectedVacancy.id } })
        }
        style={styles.moreBtn}
      >
        <Text style={styles.moreBtnText}>Подробнее</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,                         // занимает весь контейнер
    padding: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    gap: 5
  },
  loader: {
    padding: 24,
    alignItems: 'center',
  },

  // фиксированный верхний блок
  topSection: {
    flexShrink: 0,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  company: {
    fontSize: 22,
    fontWeight: '600',
    flexShrink: 1,
  },
  close: {
    padding: 6,
    borderRadius: 16,
    backgroundColor: '#e9e9e9',
  },

  pillList: {
    paddingVertical: 8,
  },
  pillSpacing: { width: 8 },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#e9e9e9',
  },
  pillActive: {
    backgroundColor: '#d7e9FF',
  },
  pillText: {
    fontSize: 13,
    color: '#333',
  },
  pillTextActive: {
    color: '#2E86DE',
    fontWeight: '600',
  },

  salary: {
    fontSize: 18,
    fontWeight: '700',
  },

  // растягиваемый и скролящийся блок
  detailsWrapper: {
    flex: 1,                     // занимает всё оставшееся место
  },
  detailsScroll: {
    paddingBottom: 8,
    gap: 10
  },
  detailLine: {
    fontSize: 14,
    color: '#333',
  },
  boldText: {
    fontWeight: '700',
  },

  moreBtn: {
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#2E86DE',
    alignItems: 'center',
    flexShrink: 0,               // не растягивается
  },
  moreBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
