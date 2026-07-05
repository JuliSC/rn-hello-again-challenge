import { useCustomerRelationships } from '@/features/customer-relationships/hooks/queries/useCustomerRelationships';
import { useProfile } from '@/features/profile/hooks/queries/useProfile';
import { Text, View } from 'react-native';

export default function Home() {
  const {
    data: customerRelationshipsData,
    isLoading: customerRelationshipsLoading,
    error: customerRelationshipsError,
  } = useCustomerRelationships();

  const {
    data: profileData,
    isLoading: profileLoading,
    error: profileError,
  } = useProfile();

  if (customerRelationshipsLoading || profileLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (customerRelationshipsError || profileError) {
    return (
      <View>
        <Text>
          Errors:{' '}
          {customerRelationshipsError instanceof Error
            ? customerRelationshipsError.message
            : 'Unknown error'}
          {profileError instanceof Error
            ? profileError.message
            : 'Unknown error'}
        </Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Points: {customerRelationshipsData?.points}</Text>
      <Text>Email: {profileData?.email}</Text>
      <Text>Name: {profileData?.name}</Text>
      <Text>First Name: {profileData?.first_name}</Text>
      <Text>Last Name: {profileData?.last_name}</Text>
      <Text>Locale: {profileData?.locale}</Text>
      <Text>Customer ID: {profileData?.customer_id}</Text>
    </View>
  );
}
