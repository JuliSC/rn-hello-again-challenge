import { BorderRadius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from 'expo-camera';
import { useCallback, useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRedeemCoupon } from '../../hooks/mutations/useRedeemCoupon';

export const QrScannerView = () => {
  const theme = useTheme();
  const isProcessing = useRef(false);
  const { mutate: redeemCoupon, data } = useRedeemCoupon();

  useEffect(() => {
    console.log('Redeem coupon result:', data);
  }, [data]);

  const handleBarcodeScanned = useCallback(
    (result: BarcodeScanningResult) => {
      if (isProcessing.current) return;
      isProcessing.current = true;
      redeemCoupon({ code: result.data });
    },
    [redeemCoupon],
  );

  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Pressable
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={requestPermission}
        >
          <Text style={styles.buttonText}>Request Permission</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <CameraView
      barcodeScannerSettings={{
        barcodeTypes: ['qr'],
      }}
      onBarcodeScanned={handleBarcodeScanned}
      style={{ flex: 1 }}
      facing="back"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
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
