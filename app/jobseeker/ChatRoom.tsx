// import React, { useState } from 'react';
// import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import { useChatStore } from '@/src/store/useChatStore';
// import { useAuthStore } from '@/src/store/useAuthStore';

import { View } from "react-native";

// export default function ChatRoom() {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const chat = useChatStore((s) => s.chats.find((c) => c.id === id));
//   const send = useChatStore((s) => s.sendMessage);
//   const selfId = useAuthStore((s) => s.user?.id)!;

//   const [text, setText] = useState('');

//   if (!chat) return null;

//   return (
//     <View style={{ flex: 1 }}>
//       <FlatList
//         style={{ flex: 1 }}
//         inverted
//         data={[...chat.messages].reverse()}
//         keyExtractor={(m) => m.id}
//         renderItem={({ item }) => (
//           <View style={{ padding: 6, alignSelf: item.fromId === selfId ? 'flex-end' : 'flex-start' }}>
//             <Text>{item.text}</Text>
//           </View>
//         )}
//       />

//       <View style={{ flexDirection: 'row', padding: 8 }}>
//         <TextInput
//           style={{ flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 8 }}
//           value={text}
//           onChangeText={setText}
//           placeholder="Сообщение…"
//         />
//         <TouchableOpacity
//           style={{ marginLeft: 8, alignSelf: 'center' }}
//           onPress={() => {
//             if (text.trim()) {
//               send(chat.id, selfId, text.trim());
//               setText('');
//             }
//           }}
//         >
//           <Text style={{ fontSize: 18, color: '#2E86DE' }}>➤</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

export default function zxc() {
  return <View></View>
}