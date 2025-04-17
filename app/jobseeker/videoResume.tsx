import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function VideoResume() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [recorded, setRecorded] = useState(false);

  const handleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Симуляция записи: через 3 секунды останавливаем запись
      setTimeout(() => {
        setIsRecording(false);
        setRecorded(true);
      }, 3000);
    } else {
      setIsRecording(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Видео-резюме</Text>
      {isRecording ? (
        <Text style={styles.info}>Запись идет…</Text>
      ) : recorded ? (
        <Text style={styles.info}>Видео записано</Text>
      ) : (
        <Text style={styles.info}>Нажмите кнопку, чтобы начать запись (до 30 сек)</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleRecord}>
        <Text style={styles.buttonText}>{isRecording ? 'Стоп' : 'Начать запись'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => router.back()}>
        <Text style={styles.linkText}>Назад</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F8FA', justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  info: { fontSize: 16, color: '#555', textAlign: 'center', marginBottom: 30 },
  button: { backgroundColor: '#4A90E2', padding: 15, borderRadius: 10, width: '80%', alignItems: 'center', marginBottom: 20 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  link: {},
  linkText: { color: '#4A90E2', fontSize: 16 },
});
