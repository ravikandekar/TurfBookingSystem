import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/theme';
import { STATIC_TURFS, PAYMENT_TYPES, TIME_SLOTS } from '../../constants/constants';

const ManualBookingScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [selectedTurf, setSelectedTurf] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [paymentType, setPaymentType] = useState(PAYMENT_TYPES.FULL);
  const [amount, setAmount] = useState(0);

  const handleTurfSelect = () => {
    Alert.alert(
      'Select Turf',
      'Choose a turf',
      STATIC_TURFS.map(turf => ({
        text: `${turf.name} - ${turf.location}`,
        onPress: () => {
          setSelectedTurf(turf);
          calculateAmount();
        },
      }))
    );
  };

  const handleDateSelect = () => {
    Alert.alert(
      'Select Date',
      'Date selection feature coming soon!',
      [{ text: 'OK', onPress: () => setSelectedDate(new Date().toISOString().split('T')[0]) }]
    );
  };

  const handleSlotSelect = () => {
    Alert.alert(
      'Select Time Slots',
      'Choose time slots',
      TIME_SLOTS.slice(0, 5).map(slot => ({
        text: slot,
        onPress: () => {
          if (selectedSlots.includes(slot)) {
            setSelectedSlots(selectedSlots.filter(s => s !== slot));
          } else {
            setSelectedSlots([...selectedSlots, slot]);
          }
          calculateAmount();
        },
      }))
    );
  };

  const calculateAmount = () => {
    if (selectedTurf && selectedSlots.length > 0) {
      const pricePerSlot = selectedTurf.pricePerSlot;
      const totalAmount = selectedSlots.length * pricePerSlot;
      setAmount(paymentType === PAYMENT_TYPES.ADVANCE ? Math.ceil(totalAmount * 0.3) : totalAmount);
    }
  };

  React.useEffect(() => {
    calculateAmount();
  }, [selectedTurf, selectedSlots, paymentType]);

  const handleCreateBooking = () => {
    if (!selectedTurf) {
      Alert.alert('Error', 'Please select a turf');
      return;
    }

    if (!customerName || !customerMobile) {
      Alert.alert('Error', 'Please fill in customer details');
      return;
    }

    if (!selectedDate) {
      Alert.alert('Error', 'Please select a date');
      return;
    }

    if (selectedSlots.length === 0) {
      Alert.alert('Error', 'Please select at least one time slot');
      return;
    }

    Alert.alert(
      'Success',
      'Manual booking created successfully!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
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
    title: {
      ...theme.typography.h2,
      color: theme.colors.text,
      marginBottom: theme.spacing.lg,
    },
    section: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.lg,
      ...theme.shadows.md,
    },
    sectionTitle: {
      ...theme.typography.h4,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    inputContainer: {
      marginBottom: theme.spacing.md,
    },
    label: {
      ...theme.typography.body2,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    input: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
      fontSize: 16,
      color: theme.colors.text,
    },
    selector: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    selectorText: {
      ...theme.typography.body1,
      color: theme.colors.text,
      flex: 1,
    },
    selectorPlaceholder: {
      ...theme.typography.body1,
      color: theme.colors.placeholder,
    },
    paymentOptions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    paymentOption: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      marginRight: theme.spacing.sm,
    },
    paymentOptionLastChild: {
      marginRight: 0,
    },
    selectedPaymentOption: {
      backgroundColor: theme.colors.primary + '10',
      borderColor: theme.colors.primary,
    },
    paymentRadio: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: theme.colors.border,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.spacing.sm,
    },
    selectedRadioOuter: {
      borderColor: theme.colors.primary,
    },
    radioInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: theme.colors.primary,
    },
    paymentText: {
      ...theme.typography.body2,
      color: theme.colors.text,
    },
    selectedPaymentText: {
      color: theme.colors.primary,
    },
    summarySection: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.lg,
      ...theme.shadows.md,
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
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: theme.spacing.sm,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
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
    createButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.md,
      paddingVertical: theme.spacing.md,
      alignItems: 'center',
      ...theme.shadows.lg,
    },
    createButtonText: {
      ...theme.typography.h4,
      color: theme.colors.textLight,
      fontWeight: 'bold',
    },
    selectedSlots: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: theme.spacing.sm,
    },
    slotChip: {
      backgroundColor: theme.colors.primary + '20',
      borderRadius: theme.borderRadius.sm,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      marginRight: theme.spacing.sm,
      marginBottom: theme.spacing.xs,
    },
    slotChipText: {
      ...theme.typography.caption,
      color: theme.colors.primary,
    },
  });

  return (
    <LinearGradient
      colors={theme.colors.gradient}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Create Manual Booking</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Turf Information</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Select Turf *</Text>
            <TouchableOpacity style={styles.selector} onPress={handleTurfSelect}>
              <Text style={selectedTurf ? styles.selectorText : styles.selectorPlaceholder}>
                {selectedTurf ? `${selectedTurf.name} - ${selectedTurf.location}` : 'Select a turf'}
              </Text>
              <Icon name="chevron-right" size={24} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Select Date *</Text>
            <TouchableOpacity style={styles.selector} onPress={handleDateSelect}>
              <Text style={selectedDate ? styles.selectorText : styles.selectorPlaceholder}>
                {selectedDate || 'Select a date'}
              </Text>
              <Icon name="calendar-today" size={24} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Select Time Slots *</Text>
            <TouchableOpacity style={styles.selector} onPress={handleSlotSelect}>
              <Text style={selectedSlots.length > 0 ? styles.selectorText : styles.selectorPlaceholder}>
                {selectedSlots.length > 0 ? `${selectedSlots.length} slots selected` : 'Select time slots'}
              </Text>
              <Icon name="schedule" size={24} color={theme.colors.textSecondary} />
            </TouchableOpacity>
            {selectedSlots.length > 0 && (
              <View style={styles.selectedSlots}>
                {selectedSlots.map((slot, index) => (
                  <View key={index} style={styles.slotChip}>
                    <Text style={styles.slotChipText}>{slot}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Customer Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter customer name"
              placeholderTextColor={theme.colors.placeholder}
              value={customerName}
              onChangeText={setCustomerName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mobile Number *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter mobile number"
              placeholderTextColor={theme.colors.placeholder}
              value={customerMobile}
              onChangeText={setCustomerMobile}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email address"
              placeholderTextColor={theme.colors.placeholder}
              value={customerEmail}
              onChangeText={setCustomerEmail}
              keyboardType="email-address"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Information</Text>
          
          <View style={styles.paymentOptions}>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentType === PAYMENT_TYPES.FULL && styles.selectedPaymentOption,
              ]}
              onPress={() => setPaymentType(PAYMENT_TYPES.FULL)}
            >
              <View style={[
                styles.paymentRadio,
                paymentType === PAYMENT_TYPES.FULL && styles.selectedRadioOuter,
              ]}>
                {paymentType === PAYMENT_TYPES.FULL && <View style={styles.radioInner} />}
              </View>
              <Text style={[
                styles.paymentText,
                paymentType === PAYMENT_TYPES.FULL && styles.selectedPaymentText,
              ]}>
                Full Payment
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentType === PAYMENT_TYPES.ADVANCE && styles.selectedPaymentOption,
              ]}
              onPress={() => setPaymentType(PAYMENT_TYPES.ADVANCE)}
            >
              <View style={[
                styles.paymentRadio,
                paymentType === PAYMENT_TYPES.ADVANCE && styles.selectedRadioOuter,
              ]}>
                {paymentType === PAYMENT_TYPES.ADVANCE && <View style={styles.radioInner} />}
              </View>
              <Text style={[
                styles.paymentText,
                paymentType === PAYMENT_TYPES.ADVANCE && styles.selectedPaymentText,
              ]}>
                Advance (30%)
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Booking Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Payment Type</Text>
            <Text style={styles.summaryValue}>
              {paymentType === PAYMENT_TYPES.ADVANCE ? 'Advance Payment' : 'Full Payment'}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Slots</Text>
            <Text style={styles.summaryValue}>{selectedSlots.length} slots</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{amount}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.createButton} onPress={handleCreateBooking}>
          <Text style={styles.createButtonText}>Create Booking</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

export default ManualBookingScreen;
