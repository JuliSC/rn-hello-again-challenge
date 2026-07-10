import { BorderRadius, Spacing } from '@/constants/theme';
import { PrimaryButton } from '@/shared/components/primary-button';
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from 'expo-camera';
import { useRouter } from 'expo-router';
import { useCallback, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const QrScannerView = () => {
  const router = useRouter();
  const isProcessing = useRef(false);

  const handleBarcodeScanned = useCallback(
    (result: BarcodeScanningResult) => {
      if (isProcessing.current) return;
      isProcessing.current = true;
      router.replace({
        pathname: '/redeem-coupon-result',
        params: {
          code: result.data,
        },
      });
    },
    [router],
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
        <PrimaryButton title="Request Permission" onPress={requestPermission} />
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
