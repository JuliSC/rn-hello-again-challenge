import { BorderRadius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useLogin } from '../../hooks/mutations/useLogin';

export default function LoginView() {
  const router = useRouter();
  const theme = useTheme();
  const { mutateAsync: login } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(async () => {
    try {
      await login({ email, password });
      router.replace('/home');
    } catch (err) {
      console.log('Login error:', err);
    }
  }, [email, login, password, router]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        onChangeText={(newText) => setEmail(newText)}
        defaultValue={email}
        style={[styles.input, { borderColor: theme.border }]}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(newText) => setPassword(newText)}
        defaultValue={password}
        style={[styles.input, { borderColor: theme.border }]}
      />
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
    justifyContent: 'center',
    paddingHorizontal: Spacing.three,
  },
  button: {
    padding: Spacing.four,
    borderRadius: BorderRadius.medium,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    padding: Spacing.two,
    borderWidth: 1,
    marginBottom: Spacing.three,
  },
});
