import { useCustomerRelationships } from '@/features/customer-relationships/hooks/queries/useCustomerRelationships';
import { Text, View } from 'react-native';

export default function Home() {
  const { data, isLoading, error } = useCustomerRelationships();

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>
          Error: {error instanceof Error ? error.message : 'Unknown error'}
        </Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Points: {data?.points}</Text>
    </View>
  );
}
