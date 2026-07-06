import { BorderRadius, Spacing } from '@/constants/theme';
import { useRedeemBounty } from '@/features/bounties/hooks/mutations/useRedeemBounties';
import { useBounties } from '@/features/bounties/hooks/queries/useBounties';
import { useCustomerRelationships } from '@/features/customer-relationships/hooks/queries/useCustomerRelationships';
import { useProfile } from '@/features/profile/hooks/queries/useProfile';
import { useTheme } from '@/hooks/use-theme';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { PrimaryButton } from '../shared/components/primary-button';

export default function Home() {
  const [bountyRedeemedMessage, setBountyRedeemedMessage] = useState<
    string | null
  >(null);
  const router = useRouter();
  const theme = useTheme();
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
    refetch: refetchBounties,
  } = useBounties();

  const { mutate: redeemBounty } = useRedeemBounty({
    onSuccess: () => {
      setBountyRedeemedMessage('Bounty redeemed successfully!');
      setTimeout(() => {
        setBountyRedeemedMessage(null);
      }, 2000);
    },
  });

  const handleNavigateToQrScanner = useCallback(() => {
    router.push('/coupon-qr-scanner');
  }, [router]);

  const handleRedeemBounty = useCallback(
    (bountyId: string) => redeemBounty({ bounty_id: bountyId }),
    [redeemBounty],
  );

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
    <View style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refetchBounties} />
        }
      >
        {bountyRedeemedMessage !== null ? (
          <View
            style={[
              styles.bountyRedeemedContainer,
              { backgroundColor: theme.reward },
            ]}
          >
            <Text style={{ color: 'white' }}>{bountyRedeemedMessage}</Text>
          </View>
        ) : null}
        <Text>Points: {customerRelationshipsData?.points}</Text>
        <Text>Email: {profileData?.email}</Text>
        <Text>Name: {profileData?.name}</Text>
        <Text>First Name: {profileData?.first_name}</Text>
        <Text>Last Name: {profileData?.last_name}</Text>
        <Text>Locale: {profileData?.locale}</Text>
        <Text>Customer ID: {profileData?.customer_id}</Text>
        <Text>Bounties:</Text>
        {bountiesData?.map((bounty) => (
          <View
            style={[styles.bountyContainer, { borderColor: theme.border }]}
            key={bounty.id}
          >
            <Text>ID: {bounty.id}</Text>
            <Text>Name: {bounty.name}</Text>
            <Text>Description: {bounty.description}</Text>
            <Text>Is Redeemable: {bounty.is_redeemable ? 'Yes' : 'No'}</Text>
            <Text>Needed Points: {bounty.needed_points}</Text>
            <Text>CR Points: {bounty.cr_points}</Text>
            <PrimaryButton
              title="Redeem"
              onPress={() => handleRedeemBounty(bounty.id)}
            />
          </View>
        ))}
        <PrimaryButton
          title="Scan QR Code"
          onPress={handleNavigateToQrScanner}
        />
      </ScrollView>
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
  bountyContainer: {
    marginBottom: Spacing.four,
    padding: Spacing.four,
    borderWidth: 1,
    borderRadius: BorderRadius.medium,
  },
  bountyRedeemedContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 99,
    borderRadius: BorderRadius.medium,
    padding: Spacing.four,
    alignSelf: 'center',
  },
});
