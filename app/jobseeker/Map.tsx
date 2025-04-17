import React, { useRef, useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  MapView,
  Camera,
  ShapeSource,
  SymbolLayer,
  CircleLayer,
  RasterSource,
  RasterLayer,
  Images,
  SymbolLayerStyle,
  CircleLayerStyle,
  setAccessToken,
  CameraRef,
} from '@maplibre/maplibre-react-native';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import { FeatureCollection } from 'geojson';
import { Ionicons } from '@expo/vector-icons';
import { vacanciesData } from '@/src/data/vacanciesData';
import { useRouter } from 'expo-router';
import { useVacancyStore } from '@/src/store/useVacancyStore';

/* ─────────── типы ─────────── */
type Vacancy = {
  id: string;
  title: string;
  salaryFrom: number;
  salaryTo: number;
  currency: '₸' | '₽' | '$';
  period: 'месяц' | 'час';
  experience: string;
  employment: string;
  schedule: string;
  hours: number;
  format: string;
  tags: string[];
};

type CompanyPoint = {
  id: string;
  companyName: string;
  coords: [number, number];
  vacancies: Vacancy[];
};

/* ─────────── демо данные ─────────── */
setAccessToken(null);

const points: CompanyPoint[] = vacanciesData;

const geojson: FeatureCollection = {
  type: 'FeatureCollection',
  features: points.map(({ id, coords }) => ({
    type: 'Feature',
    geometry: { type: 'Point', coordinates: coords },
    properties: { id, icon: 'vacancyMarker' },
  })),
};

/* ─────────── MapLibre‑стили ─────────── */
const clusterCircleStyle: CircleLayerStyle = {
  circleColor: '#2E86DE',
  circleRadius: 18,
  circleOpacity: 0.9,
  circleStrokeWidth: 2,
  circleStrokeColor: '#fff',
};
const clusterCountStyle: SymbolLayerStyle = {
  textField: ['get', 'point_count_abbreviated'],
  textSize: 14,
  textColor: '#fff',
  textHaloColor: '#000',
  textHaloWidth: 1,
};
const markerStyle: SymbolLayerStyle = {
  iconImage: ['get', 'icon'],
  iconSize: 0.10,
  iconAnchor: 'bottom',
};
const selectedMarkerStyle: SymbolLayerStyle = {
  iconImage: ['get', 'icon'],
  iconSize: 0.14,
  iconAnchor: 'bottom',
};

/* ─────────── компонент ─────────── */
export default function VacancyMap() {
  const router = useRouter();
  const cameraRef = useRef<CameraRef>(null);
  const sheetRef = useRef<BottomSheet>(null);

  const [selectedPointId, setSelectedPointId] = useState<string | null>(null);
  const [selectedVacancyId, setSelectedVacancyId] = useState<string | null>(null);

  /* вычисляем активные данные */
  const selectedPoint = useMemo(
    () => points.find(p => p.id === selectedPointId) ?? null,
    [selectedPointId],
  );
  const selectedVacancy = useMemo(
    () =>
      selectedPoint?.vacancies.find(v => v.id === selectedVacancyId) ??
      selectedPoint?.vacancies[0] ??
      null,
    [selectedPoint, selectedVacancyId],
  );

  /* ───── нажатие по маркеру/кластеру ───── */
  const handlePress = useCallback((e: any) => {
    const f = e.features[0];
    if (f.properties?.cluster) {
      const [lon, lat] = f.geometry.coordinates;
      cameraRef.current?.flyTo([lon, lat], 400);
      cameraRef.current?.zoomTo(14, 400);
      return;
    }
    setSelectedPointId(f.properties.id as string);
    setSelectedVacancyId(null);
    sheetRef.current?.show();
  }, []);

  /* ───── карточка вакансии (горизонтальный FlatList) ───── */
  const renderVacancy = ({ item }: { item: Vacancy }) => {
    const active = item.id === selectedVacancy?.id;
    return (
      <TouchableOpacity
        style={[styles.vacancyCard, active && styles.vacancyCardActive]}
        onPress={() => setSelectedVacancyId(item.id)}
      >
        <Text style={styles.vacancyTitle} numberOfLines={1}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const BottomSheetClose = () => {
    setSelectedPointId(null);
    setSelectedVacancyId(null);
    sheetRef.current?.close()
  }

  /* ───── JSX ───── */
  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        <RasterSource
          id="osm"
          tileUrlTemplates={['https://tile.openstreetmap.org/{z}/{x}/{y}.png']}
          tileSize={256}
        >
          <RasterLayer id="osmLayer" sourceID="osm" />
        </RasterSource>

        <Camera
          ref={cameraRef}
          defaultSettings={{
            centerCoordinate: [37.618423, 55.751244],
            zoomLevel: 11,
          }}
        />

        <Images images={{ vacancyMarker: require('../../assets/marker.png') }} />

        <ShapeSource
          id="vacancies"
          shape={geojson}
          cluster
          clusterRadius={50}
          onPress={handlePress}
        >
          <CircleLayer id="cluster" filter={['has', 'point_count']} style={clusterCircleStyle} />
          <SymbolLayer id="clusterTxt" filter={['has', 'point_count']} style={clusterCountStyle} />
          <SymbolLayer id="points" filter={['!', ['has', 'point_count']]} style={markerStyle} />
          {selectedPointId && (
            <SymbolLayer
              id="selectedPoint"
              aboveLayerID="points"
              filter={['==', ['get', 'id'], selectedPointId]}
              style={selectedMarkerStyle}
            />
          )}
        </ShapeSource>
      </MapView>

      {/* ───── BottomSheet ───── */}
      <BottomSheet ref={sheetRef} height={420} radius={16} onClose={BottomSheetClose}>
        {selectedPoint && selectedVacancy && (
          <View style={styles.sheet}>
            {/* header */}
            <View style={styles.header}>
              <Text style={styles.company}>{selectedPoint.companyName}</Text>
              <TouchableOpacity onPress={() => sheetRef.current?.close()} style={styles.closeBtn}>
                <Ionicons name="close" size={24} color="#555" />
              </TouchableOpacity>
            </View>

            {/* scroll list */}
            {selectedPoint.vacancies.length > 1 && (
              <>
                <FlatList
                  data={selectedPoint.vacancies}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: 8 }}
                  renderItem={renderVacancy}
                  keyExtractor={v => v.id}
                />
                <View style={styles.separator} />
              </>
            )}

            {/* details */}
            <Text style={styles.detailRow}>
              <Text style={styles.bold}>Должность: </Text>{selectedVacancy.title}
            </Text>
            <Text style={styles.detailRow}>
              <Text style={styles.bold}>З/п: </Text>
              {selectedVacancy.salaryFrom.toLocaleString()}–{selectedVacancy.salaryTo.toLocaleString()}
              {selectedVacancy.currency} / {selectedVacancy.period}
            </Text>
            <Text style={styles.detailRow}>
              <Text style={styles.bold}>Опыт: </Text>{selectedVacancy.experience}
            </Text>
            <Text style={styles.detailRow}>
              <Text style={styles.bold}>Занятость: </Text>{selectedVacancy.employment}
            </Text>
            <Text style={styles.detailRow}>
              <Text style={styles.bold}>График: </Text>{selectedVacancy.schedule}
            </Text>
            <Text style={styles.detailRow}>
              <Text style={styles.bold}>Формат: </Text>{selectedVacancy.format}
            </Text>
            <Text style={styles.detailRow}>
              <Text style={styles.bold}>Теги: </Text>{selectedVacancy.tags.join(', ')}
            </Text>

            <TouchableOpacity
              style={styles.moreBtn}
              onPress={() => {
                sheetRef.current?.close();
                useVacancyStore.getState().setVacancy(selectedVacancy);
                router.push('/jobseeker/VacancyDetail');
              }}
            >
              <Text style={styles.moreBtnTxt}>Перейти к вакансии</Text>
            </TouchableOpacity>
          </View>
        )}
      </BottomSheet>
    </View>
  );
}

/* ─────────── стили ─────────── */
const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },

  sheet: { padding: 16, gap: 10 },
  header: { flexDirection: 'row', alignItems: 'center' },
  company: { flex: 1, fontSize: 20, fontWeight: '700' },
  closeBtn: { padding: 6, backgroundColor: '#e5e5e5', borderRadius: 18 },
  separator: { height: 1, backgroundColor: '#ddd', marginVertical: 6 },

  vacancyCard: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f4f4f4',
  },
  vacancyCardActive: { borderWidth: 2, borderColor: '#2E86DE' },
  vacancyTitle: { color: '#000', fontSize: 13, maxWidth: 160 },
  bold: { fontWeight: '600' },
  detailRow: { fontSize: 14 },

  moreBtn: {
    marginTop: 8,
    backgroundColor: '#2E86DE',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 10,
  },
  moreBtnTxt: { color: '#fff', fontWeight: '600' },
});
