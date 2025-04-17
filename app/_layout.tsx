import CustomNavbar from '@/components/ui/CustomNavbar';
import { Slot } from 'expo-router';

export default function Layout() {
  return (
    <>
      <Slot />
      <CustomNavbar />
    </>
  )
}
