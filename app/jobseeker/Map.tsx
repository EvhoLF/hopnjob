// app/jobseeker/Map.tsx
import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import {
  MapView,
  Camera,
  ShapeSource,
  CircleLayer,
  RasterLayer,
  RasterSource,
  Images,
  setAccessToken,
  CameraRef,
  SymbolLayer,
  SymbolLayerStyle,
} from '@maplibre/maplibre-react-native';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import SearchBox from '@/components/map/SearchBox';
import PointCard from '@/components/map/PointCard';
import { Vacancy } from '@/src/types/Vacancy';
import { PointVacancies } from '@/src/types/PointVacancies';
import { VacancyData } from '@/src/data/VacancyData';
import { PointVacanciesData } from '@/src/data/PointVacanciesData';

import type {
  FeatureCollection,
  Geometry,
  GeoJsonProperties,
} from 'geojson';
import Navbar from '@/components/ui/Navbar';

setAccessToken(null);

export default function MapScreen() {
  const router = useRouter();

  /* ──────────────── refs ──────────────── */
  const cameraRef = useRef<CameraRef>(null);
  const sheetRef = useRef<BottomSheet>(null);
  const watchRef = useRef<Location.LocationSubscription | null>(null);

  /* ──────────────── data ──────────────── */
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [points, setPoints] = useState<PointVacancies[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<PointVacancies | null>(null);

  /* ──────────────── user location ──────────────── */
  const [userLoc, setUserLoc] = useState<{ lat: number; lon: number } | null>(null);

  /* ──────────────── load static data ──────────────── */
  useEffect(() => {
    (async () => {
      try {
        setVacancies(await VacancyData);
        setPoints(await PointVacanciesData);
      } catch (e) {
        console.error('Ошибка загрузки данных:', e);
      }
    })();
  }, []);

  /* ──────────────── subscription to location ──────────────── */
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Доступ к геолокации отклонён');
        return;
      }
      watchRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 2000,
          distanceInterval: 5,
        },
        pos => {
          if (!mounted) return;
          const { latitude: lat, longitude: lon } = pos.coords;
          setUserLoc({ lat, lon });
        }
      );
    })();

    return () => {
      mounted = false;
      watchRef.current?.remove();
    };
  }, []);

  /* ──────────────── center map on user ──────────────── */
  const locateUser = useCallback(() => {
    console.log('locateUser → камера к юзеру');   // 🔍 ➊

    if (!userLoc) return;
    cameraRef.current?.setCamera({
      centerCoordinate: [userLoc.lon, userLoc.lat],
      duration: 500,
    });
  }, [userLoc]);

  /* ──────────────── geojson for vacancies ──────────────── */
  const geojson: FeatureCollection<Geometry, GeoJsonProperties> = useMemo(
    () => ({
      type: 'FeatureCollection',
      features: points.map(({ id, coords, vacancies }) => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: coords },
        properties: { id, vacancies, icon: 'vacancyMarker' },
      })),
    }),
    [points],
  );

  /* ──────────────── handle cluster / point press ──────────────── */
  const handlePress = useCallback(
    (e: any) => {
      const f = e.features[0];
      if (f.properties?.cluster) {
        const [lon, lat] = f.geometry.coordinates;
        cameraRef.current?.flyTo([lon, lat], 400);
        cameraRef.current?.zoomTo(14, 400);
        return;
      }
      setSelectedPoint(points.find(p => p.id === f.properties.id) ?? null);
      sheetRef.current?.show();
    },
    [points],
  );

  const closeBottomSheet = () => {
    setSelectedPoint(null);
    sheetRef.current?.close();
  };

  /* ──────────────── search box handler ──────────────── */
  const handlePlaceSelect = (lon: number, lat: number) => {
    cameraRef.current?.setCamera({
      centerCoordinate: [lon, lat],
      zoomLevel: 12,          // нужный масштаб
      animationDuration: 700, // длительность
    });
  };

  return (
    <View style={styles.container}>
      <SearchBox onSelect={handlePlaceSelect} />

      {/* locate button */}
      <TouchableOpacity
        style={[styles.fab, { bottom: 100 }]}
        onPress={locateUser}
      >
        <Ionicons name="locate" size={28} />
      </TouchableOpacity>

      <MapView style={styles.map} compassEnabled={false} rotateEnabled={false}>
        {/* OSM tiles */}
        <RasterSource
          id="osm"
          tileUrlTemplates={['https://tile.openstreetmap.org/{z}/{x}/{y}.png']}
          tileSize={256}
        >
          <RasterLayer id="osmLayer" sourceID="osm" />
        </RasterSource>

        {/* camera */}
        <Camera
          ref={cameraRef}
          defaultSettings={{
            centerCoordinate: [37.618423, 55.751244],
            zoomLevel: 11,
            heading: 0,
          }}
        />

        {/* vacancy clusters & markers */}
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
          {selectedPoint && (
            <SymbolLayer
              id="selectedPoint"
              aboveLayerID="points"
              filter={['==', ['get', 'id'], selectedPoint.id]}
              style={selectedMarkerStyle}
            />
          )}
        </ShapeSource>

        {/* user location marker */}
        {userLoc && (
          <ShapeSource
            id="userLocation"
            shape={{
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: { type: 'Point', coordinates: [userLoc.lon, userLoc.lat] },
                },
              ],
            }}
          >
            <CircleLayer
              id="userDot"
              style={{
                circleRadius: 6,
                circleColor: '#007AFF',
                circleStrokeColor: '#fff',
                circleStrokeWidth: 2,
              }}
            />
          </ShapeSource>
        )}
      </MapView>

      <BottomSheet
        ref={sheetRef}
        height={350}
        radius={16}
        onClose={closeBottomSheet}
      >
        <PointCard point={selectedPoint} onClose={closeBottomSheet} />
      </BottomSheet>
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  fab: {
    position: 'absolute',
    right: 24,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 6,
    elevation: 4,
    zIndex: 10,
  },
});

const clusterCircleStyle = {
  circleColor: '#2E86DE',
  circleRadius: 18,
  circleOpacity: 0.9,
  circleStrokeWidth: 2,
  circleStrokeColor: '#fff',
};

const clusterCountStyle: SymbolLayerStyle = {
  textField: ['get', 'point_count_abbreviated'] as any,
  textSize: 14,
  textColor: '#fff',
  textHaloColor: '#000',
  textHaloWidth: 1,
};

const markerStyle: SymbolLayerStyle = {
  iconImage: ['get', 'icon'] as any,
  iconSize: 0.12,
  iconAnchor: 'bottom',
};

const selectedMarkerStyle: SymbolLayerStyle = {
  iconImage: ['get', 'icon'] as any,
  iconSize: 0.14,
  iconAnchor: 'bottom',
};
