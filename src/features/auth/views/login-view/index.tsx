import { BorderRadius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function LoginView() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={() => router.replace('/home')}
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
