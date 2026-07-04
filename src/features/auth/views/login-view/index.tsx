import { BorderRadius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLogin } from '../../hooks/mutations/useLogin';

export default function LoginView() {
  const router = useRouter();
  const theme = useTheme();
  const { mutateAsync: login } = useLogin();

  const handleLogin = useCallback(async () => {
    try {
      await login({ email: 'testUser@dev.null', password: 'challenge-2026;' });
      router.replace('/home');
    } catch (err) {
      console.log('Login error:', err);
    }
  }, [login, router]);

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: Spacing.four,
    borderRadius: BorderRadius.medium,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
