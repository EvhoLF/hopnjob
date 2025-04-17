import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const dummyChats = [
  { id: '1', name: 'Работодатель 1', lastMessage: 'Привет, мы заинтересованы в вашем резюме.' },
  { id: '2', name: 'Работодатель 2', lastMessage: 'Можно обсудить детали?' },
];

export default function Messages() {
  const router = useRouter();

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.chatItem}>
      <Text style={styles.chatName}>{item.name}</Text>
      <Text style={styles.chatMessage}>{item.lastMessage}</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push(`/chat?id=${item.id}`)}>
        <Text style={styles.buttonText}>Открыть чат</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <FlatList data={dummyChats} keyExtractor={(item) => item.id} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F6F8FA' },
  chatItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee', marginBottom: 10 },
  chatName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  chatMessage: { fontSize: 16, color: '#555', marginVertical: 5 },
  button: { backgroundColor: '#4A90E2', padding: 10, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16 },
});
