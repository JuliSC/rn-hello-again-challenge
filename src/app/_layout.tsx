import { useColorScheme } from '@/hooks/use-color-scheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Login' }} />
          <Stack.Screen name="home" options={{ title: 'Home' }} />
          <Stack.Screen
            name="coupon-qr-scanner"
            options={{ title: 'Scan QR Code' }}
          />
          <Stack.Screen
            name="redeem-coupon-result"
            options={{ title: 'Redeem Coupon Result' }}
          />
        </Stack>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
