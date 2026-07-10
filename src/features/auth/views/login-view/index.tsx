import { BorderRadius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { PrimaryButton } from '@/shared/components/primary-button';
import { TextField } from '@/shared/components/text-field';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLogin } from '../../hooks/mutations/useLogin';

export default function LoginView() {
  const router = useRouter();
  const theme = useTheme();
  const { mutateAsync: login } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState<string | null>(
    null,
  );

  const handleLogin = useCallback(async () => {
    try {
      await login({ email, password });
      router.replace('/home');
    } catch (_) {
      setLoginErrorMessage(
        'Incorrect email + password combination, please try again.',
      );
      setTimeout(() => {
        setLoginErrorMessage(null);
      }, 5000);
    }
  }, [email, login, password, router]);

  return (
    <View style={styles.container}>
      {loginErrorMessage !== null ? (
        <View
          style={[
            styles.errorMessageContainer,
            { backgroundColor: theme.reward },
          ]}
        >
          <Text style={{ color: 'white' }}>{loginErrorMessage}</Text>
        </View>
      ) : null}
      <TextField
        onChange={(newText) => setEmail(newText)}
        defaultValue={email}
        placeholder="Email"
        style={styles.input}
      />
      <TextField
        placeholder="Password"
        onChange={(newText) => setPassword(newText)}
        defaultValue={password}
        style={styles.input}
      />
      <PrimaryButton onPress={handleLogin} title={'Login'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.three,
  },
  input: {
    marginBottom: Spacing.three,
  },
  errorMessageContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 99,
    borderRadius: BorderRadius.medium,
    padding: Spacing.four,
    alignSelf: 'center',
  },
});
