import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback } from 'react';
import { Text, View } from 'react-native';
import { useRedeemCoupon } from '../../hooks/mutations/useRedeemCoupon';

export const RedeemCouponResultView = () => {
  const { code } = useLocalSearchParams<{
    code: string;
  }>();
  const { mutate: redeemCoupon, data } = useRedeemCoupon();

  useFocusEffect(
    useCallback(() => {
      redeemCoupon({ code });
    }, [code, redeemCoupon]),
  );

  return (
    <View>
      <Text>Coupon: {data?.coupon}</Text>
      <Text>CR Points: {data?.cr_points}</Text>
      <Text>Points: {data?.points}</Text>
      <Text>{data?.success ? 'Success' : 'Failure'}</Text>
    </View>
  );
};
