import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Home() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Добро пожаловать в HopnJob</Text>
      <TouchableOpacity
        style={[styles.button, styles.buttonPrimary]}
        onPress={() => router.push('/jobseeker/Map')}
      >
        <Text style={styles.buttonText}>Найти работу</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.buttonSecondary]}
        onPress={() => router.push('/login?role=employer')}
      >
        <Text style={styles.buttonText}>Найти сотрудников</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F6F8FA', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 40, color: '#333' },
  button: { width: '80%', padding: 15, borderRadius: 10, alignItems: 'center', marginVertical: 10 },
  buttonPrimary: { backgroundColor: '#4A90E2' },
  buttonSecondary: { backgroundColor: '#50E3C2' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
