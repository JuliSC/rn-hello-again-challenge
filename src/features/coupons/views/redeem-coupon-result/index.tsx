import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback } from 'react';
import { View } from 'react-native';
import { useRedeemCoupon } from '../../hooks/mutations/useRedeemCoupon';

export const RedeemCouponResultView = () => {
  const { code } = useLocalSearchParams<{
    code: string;
  }>();
  const { mutate: redeemCoupon } = useRedeemCoupon();

  useFocusEffect(
    useCallback(() => {
      redeemCoupon({ code });
    }, [code, redeemCoupon]),
  );

  return <View></View>;
};
