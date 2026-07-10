import { BorderRadius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const PrimaryButton = ({ title, onPress, style }: Props) => {
  const theme = useTheme();

  return (
    <Pressable
      style={[styles.button, { backgroundColor: theme.primary }, style]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: Spacing.four,
    borderRadius: BorderRadius.medium,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
