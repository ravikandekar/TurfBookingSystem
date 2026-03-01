import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/theme';

const PaymentScreen = ({ route, navigation }) => {
  const { theme } = useTheme();
  const { turf, date, slots, paymentType, amount } = route.params;
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('phonepe');
  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const paymentMethods = [
    {
      id: 'phonepe',
      name: 'PhonePe',
      icon: 'smartphone',
      color: '#5D3FD3',
    },
    {
      id: 'gpay',
      name: 'Google Pay',
      icon: 'account-balance-wallet',
      color: '#4285F4',
    },
    {
      id: 'paytm',
      name: 'Paytm',
      icon: 'account-balance',
      color: '#004B8D',
    },
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate successful payment
      Alert.alert(
        'Payment Successful',
        'Your booking has been confirmed! You will receive a confirmation message shortly.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate back to home or booking confirmation
              navigation.navigate('UserTabs', { screen: 'Bookings' });
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Payment Failed', 'Something went wrong. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const renderPaymentMethod = (method) => {
    const isSelected = selectedPaymentMethod === method.id;

    return (
      <TouchableOpacity
        key={method.id}
        style={[
          styles.paymentMethod,
          isSelected && styles.selectedPaymentMethod,
        ]}
        onPress={() => setSelectedPaymentMethod(method.id)}
      >
        <View style={styles.paymentMethodLeft}>
          <View style={[styles.paymentIcon, { backgroundColor: method.color + '20' }]}>
            <Icon name={method.icon} size={24} color={method.color} />
          </View>
          <Text style={[
            styles.paymentMethodName,
            isSelected && styles.selectedPaymentText,
          ]}>
            {method.name}
          </Text>
        </View>
        <View style={styles.paymentRadio}>
          <View style={[
            styles.radioOuter,
            isSelected && styles.radioOuterSelected,
          ]}>
            {isSelected && <View style={styles.radioInner} />}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    gradient: {
      flex: 1,
    },
    content: {
      flex: 1,
      padding: theme.spacing.lg,
    },
    header: {
      alignItems: 'center',
      paddingVertical: theme.spacing.xl,
    },
    successIcon: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    title: {
      ...theme.typography.h2,
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: theme.spacing.sm,
    },
    subtitle: {
      ...theme.typography.body1,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    bookingSummary: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.lg,
      ...theme.shadows.md,
    },
    summaryTitle: {
      ...theme.typography.h4,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.sm,
    },
    summaryLabel: {
      ...theme.typography.body2,
      color: theme.colors.textSecondary,
    },
    summaryValue: {
      ...theme.typography.body2,
      color: theme.colors.text,
      fontWeight: '500',
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginVertical: theme.spacing.md,
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    totalLabel: {
      ...theme.typography.h3,
      color: theme.colors.text,
    },
    totalValue: {
      ...theme.typography.h2,
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
    paymentSection: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.lg,
      ...theme.shadows.md,
    },
    paymentTitle: {
      ...theme.typography.h4,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    paymentMethod: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.sm,
    },
    selectedPaymentMethod: {
      backgroundColor: theme.colors.primary + '10',
      borderColor: theme.colors.primary,
    },
    paymentMethodLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    paymentIcon: {
      width: 48,
      height: 48,
      borderRadius: theme.borderRadius.md,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.spacing.md,
    },
    paymentMethodName: {
      ...theme.typography.body1,
      color: theme.colors.text,
      fontWeight: '500',
    },
    selectedPaymentText: {
      color: theme.colors.primary,
    },
    paymentRadio: {
      alignItems: 'center',
    },
    radioOuter: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: theme.colors.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
    radioOuterSelected: {
      borderColor: theme.colors.primary,
    },
    radioInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: theme.colors.primary,
    },
    noteSection: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.lg,
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.warning,
    },
    noteTitle: {
      ...theme.typography.body2,
      color: theme.colors.text,
      fontWeight: '600',
      marginBottom: theme.spacing.xs,
      flexDirection: 'row',
      alignItems: 'center',
    },
    noteText: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      lineHeight: 18,
    },
    payButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.md,
      paddingVertical: theme.spacing.md,
      alignItems: 'center',
      ...theme.shadows.lg,
    },
    payButtonDisabled: {
      backgroundColor: theme.colors.disabled,
    },
    payButtonText: {
      ...theme.typography.h4,
      color: theme.colors.textLight,
      fontWeight: 'bold',
    },
    processingOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    processingCard: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.xl,
      alignItems: 'center',
      ...theme.shadows.lg,
    },
    processingText: {
      ...theme.typography.h4,
      color: theme.colors.text,
      marginTop: theme.spacing.md,
    },
    processingSubtext: {
      ...theme.typography.body2,
      color: theme.colors.textSecondary,
      marginTop: theme.spacing.sm,
      textAlign: 'center',
    },
  });

  return (
    <LinearGradient
      colors={theme.colors.gradient}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.container}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <View style={styles.header}>
            <View style={styles.successIcon}>
              <Icon name="payments" size={40} color={theme.colors.primary} />
            </View>
            <Text style={styles.title}>Complete Payment</Text>
            <Text style={styles.subtitle}>Secure payment via UPI</Text>
          </View>

          <View style={styles.bookingSummary}>
            <Text style={styles.summaryTitle}>Booking Summary</Text>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Turf</Text>
              <Text style={styles.summaryValue}>{turf.name}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Date</Text>
              <Text style={styles.summaryValue}>
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Time Slots</Text>
              <Text style={styles.summaryValue}>
                {slots.length} slot{slots.length > 1 ? 's' : ''}
              </Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Payment Type</Text>
              <Text style={styles.summaryValue}>
                {paymentType === 'ADVANCE' ? 'Advance (30%)' : 'Full Payment'}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>₹{amount}</Text>
            </View>
          </View>

          <View style={styles.paymentSection}>
            <Text style={styles.paymentTitle}>Select Payment Method</Text>
            {paymentMethods.map(renderPaymentMethod)}
          </View>

          <View style={styles.noteSection}>
            <Text style={styles.noteTitle}>
              <Icon name="info" size={16} color={theme.colors.warning} />
              {' '}Important Note
            </Text>
            <Text style={styles.noteText}>
              Bookings once confirmed are non-refundable and cannot be cancelled from the app. 
              Please ensure your slot timings before making payment.
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.payButton,
              isProcessing && styles.payButtonDisabled,
            ]}
            onPress={handlePayment}
            disabled={isProcessing}
          >
            <Text style={styles.payButtonText}>
              Pay ₹{amount}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {isProcessing && (
          <View style={styles.processingOverlay}>
            <View style={styles.processingCard}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text style={styles.processingText}>Processing Payment</Text>
              <Text style={styles.processingSubtext}>
                Please wait while we process your payment...
              </Text>
            </View>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

export default PaymentScreen;
