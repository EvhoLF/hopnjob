import { Tabs, Stack } from 'expo-router';
import { useAuthStore } from '@/src/store/useAuthStore';

export default function RootLayout() {
  const role = useAuthStore((s) => s.user?.role);

  if (!role) {
    // до авторизации показываем простой стек логина
    return (
      <Stack>
        <Stack.Screen name="auth/login" options={{ headerShown: false }} />
      </Stack>
    );
  }

  // Job Seeker вкладки
  if (role === 'jobseeker') {
    return (
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="jobseeker/Map" options={{ title: 'Jobs' }} />
        <Tabs.Screen name="jobseeker/ChatList" options={{ title: 'Chats' }} />
        <Tabs.Screen name="jobseeker/Profile" options={{ title: 'Profile' }} />
      </Tabs>
    );
  }

  // Employer вкладки
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="employer/Candidates" options={{ title: 'Candidates' }} />
      <Tabs.Screen name="employer/VacancyList" options={{ title: 'My Jobs' }} />
      <Tabs.Screen name="employer/CompanyProfile" options={{ title: 'Company' }} />
    </Tabs>
  );
}