import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const dummyFollowing = [
  { id: '1', category: 'Официант', newJobs: 5 },
  { id: '2', category: 'Продавец', newJobs: 2 },
];

export default function Following() {
  const router = useRouter();

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <Text style={styles.category}>{item.category} ({item.newJobs} новых)</Text>
      <TouchableOpacity style={styles.actionButton} onPress={() => router.push(`/jobseeker/Home?category=${item.category}`)}>
        <Text style={styles.actionText}>View Jobs</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={() => { /* Логика отписки */ }}>
        <Text style={styles.actionText}>Unfollow</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Following</Text>
      <FlatList data={dummyFollowing} keyExtractor={(item) => item.id} renderItem={renderItem} />
      <TouchableOpacity style={styles.link} onPress={() => router.back()}>
        <Text style={styles.linkText}>Назад</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F6F8FA' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  item: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  category: { fontSize: 18, color: '#333' },
  actionButton: { backgroundColor: '#4A90E2', padding: 8, borderRadius: 6 },
  actionText: { color: '#fff', fontSize: 14 },
  link: { marginTop: 20, alignItems: 'center' },
  linkText: { color: '#4A90E2', fontSize: 16 },
});
