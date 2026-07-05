import { useBounties } from '@/features/bounties/hooks/queries/useBounties';
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

  const {
    data: bountiesData,
    isLoading: bountiesLoading,
    error: bountiesError,
  } = useBounties();

  if (customerRelationshipsLoading || profileLoading || bountiesLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (customerRelationshipsError || profileError || bountiesError) {
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
          {bountiesError instanceof Error
            ? bountiesError.message
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
      <Text>Bounties:</Text>
      {bountiesData?.map((bounty) => (
        <View key={bounty.id}>
          <Text>ID: {bounty.id}</Text>
          <Text>Name: {bounty.name}</Text>
          <Text>Description: {bounty.description}</Text>
          <Text>Is Redeemable: {bounty.is_redeemable ? 'Yes' : 'No'}</Text>
          <Text>Needed Points: {bounty.needed_points}</Text>
          <Text>CR Points: {bounty.cr_points}</Text>
        </View>
      ))}
    </View>
  );
}
