import { AuthProvider } from '@/src/contexts/AuthContext';
import { Tabs, Stack, usePathname } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { useAuthStore } from '@/src/store/useAuthStore';

export default function RootLayout() {
  const pathname = usePathname();
  const isFullScreen = pathname === '/jobseeker/Map';

  const Container = isFullScreen ? View : SafeAreaView;
  // const role = useAuthStore((s) => s.user?.role);

  return (
    <AuthProvider>
      <Container style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          {/* …все экраны работодателя… */}
        </Stack>
      </Container>
    </AuthProvider>
  )
}