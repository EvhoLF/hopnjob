import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Chat() {
  const { id } = useSearchParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', sender: 'employer', text: 'Здравствуйте, можем обсудить вакансии?' },
    { id: '2', sender: 'seeker', text: 'Конечно, расскажите подробнее.' },
  ]);
  const router = useRouter();

  const sendMessage = () => {
    if (message.trim()) {
      const newMsg = { id: Date.now().toString(), sender: 'seeker', text: message };
      setMessages((prev) => [...prev, newMsg]);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <FlatList 
        style={styles.messageList}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={item.sender === 'employer' ? styles.employerMessage : styles.seekerMessage}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Введите сообщение..."
          placeholderTextColor="#999"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Отправить</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.link} onPress={() => router.back()}>
        <Text style={styles.linkText}>Назад</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F8FA', padding: 20 },
  messageList: { flex: 1 },
  employerMessage: { alignSelf: 'flex-start', backgroundColor: '#e1f5fe', padding: 10, borderRadius: 10, marginVertical: 5, maxWidth: '80%' },
  seekerMessage: { alignSelf: 'flex-end', backgroundColor: '#c8e6c9', padding: 10, borderRadius: 10, marginVertical: 5, maxWidth: '80%' },
  messageText: { fontSize: 16, color: '#333' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, fontSize: 16, color: '#333', backgroundColor: '#fff' },
  sendButton: { marginLeft: 10, backgroundColor: '#4A90E2', padding: 12, borderRadius: 8 },
  sendButtonText: { color: '#fff', fontSize: 16 },
  link: { marginTop: 15, alignItems: 'center' },
  linkText: { color: '#4A90E2', fontSize: 16 },
});
