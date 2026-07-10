import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { StyleProp, StyleSheet, TextInput, TextStyle } from 'react-native';

interface Props {
  onChange: (text: string) => void;
  defaultValue: string;
  placeholder?: string;
  style?: StyleProp<TextStyle>;
}

export const TextField = ({
  onChange,
  defaultValue,
  placeholder,
  style,
}: Props) => {
  const theme = useTheme();

  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={(newText) => onChange(newText)}
      defaultValue={defaultValue}
      style={[{ borderColor: theme.border }, styles.input, style]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    padding: Spacing.two,
    borderWidth: 1,
  },
});
