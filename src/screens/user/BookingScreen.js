import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/theme';
import { TIME_SLOTS, PAYMENT_TYPES } from '../../constants/constants';

const { width } = Dimensions.get('window');

const BookingScreen = ({ route, navigation }) => {
  const { theme } = useTheme();
  const { turf } = route.params;
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [paymentType, setPaymentType] = useState(PAYMENT_TYPES.FULL);
  const [markedDates, setMarkedDates] = useState({});

  const handleDateSelect = (day) => {
    const dateString = day.dateString;
    setSelectedDate(dateString);
    setMarkedDates({
      [dateString]: {
        selected: true,
        selectedColor: theme.colors.primary,
        selectedTextColor: theme.colors.textLight,
      },
    });
  };

  const handleSlotSelect = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter(s => s !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const calculatePrice = () => {
    if (selectedSlots.length === 0) return 0;
    
    const slotCount = selectedSlots.length;
    const isWeekend = new Date(selectedDate).getDay() === 0 || new Date(selectedDate).getDay() === 6;
    const pricePerSlot = isWeekend && turf.weekendPrice ? turf.weekendPrice : turf.pricePerSlot;
    const totalPrice = slotCount * pricePerSlot;
    
    if (paymentType === PAYMENT_TYPES.ADVANCE) {
      return Math.ceil(totalPrice * 0.3); // 30% advance
    }
    return totalPrice;
  };

  const handleProceedToPayment = () => {
    if (!selectedDate) {
      Alert.alert('Error', 'Please select a date');
      return;
    }

    if (selectedSlots.length === 0) {
      Alert.alert('Error', 'Please select at least one time slot');
      return;
    }

    const bookingData = {
      turf,
      date: selectedDate,
      slots: selectedSlots,
      paymentType,
      amount: calculatePrice(),
    };

    navigation.navigate('Payment', bookingData);
  };

  const isSlotAvailable = (slot) => {
    // Simulate slot availability check
    const hour = parseInt(slot.split(':')[0]);
    const currentHour = new Date().getHours();
    const selectedDateObj = new Date(selectedDate);
    const today = new Date();
    
    // Disable past slots for today
    if (selectedDateObj.toDateString() === today.toDateString() && hour <= currentHour) {
      return false;
    }
    
    // Simulate some slots being booked
    const bookedSlots = ['08:00', '09:00', '14:00', '15:00'];
    return !bookedSlots.includes(slot);
  };

  const renderTimeSlot = (slot) => {
    const isAvailable = isSlotAvailable(slot);
    const isSelected = selectedSlots.includes(slot);

    return (
      <TouchableOpacity
        key={slot}
        style={[
          styles.timeSlot,
          !isAvailable && styles.disabledSlot,
          isSelected && styles.selectedSlot,
        ]}
        onPress={() => isAvailable && handleSlotSelect(slot)}
        disabled={!isAvailable}
      >
        <Text style={[
          styles.timeSlotText,
          !isAvailable && styles.disabledSlotText,
          isSelected && styles.selectedSlotText,
        ]}>
          {slot}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderPaymentOption = (type) => {
    const isSelected = paymentType === type;
    const amount = type === PAYMENT_TYPES.ADVANCE 
      ? Math.ceil(calculatePrice() / 0.3)
      : calculatePrice();

    return (
      <TouchableOpacity
        key={type}
        style={[
          styles.paymentOption,
          isSelected && styles.selectedPaymentOption,
        ]}
        onPress={() => setPaymentType(type)}
      >
        <View style={styles.paymentRadio}>
          <View style={[
            styles.radioOuter,
            isSelected && styles.radioOuterSelected,
          ]}>
            {isSelected && <View style={styles.radioInner} />}
          </View>
        </View>
        <View style={styles.paymentInfo}>
          <Text style={[
            styles.paymentTitle,
            isSelected && styles.selectedPaymentText,
          ]}>
            {type === PAYMENT_TYPES.ADVANCE ? 'Advance Payment' : 'Full Payment'}
          </Text>
          <Text style={[
            styles.paymentDescription,
            isSelected && styles.selectedPaymentText,
          ]}>
            {type === PAYMENT_TYPES.ADVANCE 
              ? 'Pay 30% now, remaining at venue' 
              : 'Pay full amount online'
            }
          </Text>
        </View>
        <Text style={[
          styles.paymentAmount,
          isSelected && styles.selectedPaymentText,
        ]}>
          ₹{type === PAYMENT_TYPES.ADVANCE ? Math.ceil(calculatePrice()) : calculatePrice()}
        </Text>
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
    },
    header: {
      backgroundColor: theme.colors.card,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    turfInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    turfImage: {
      width: 50,
      height: 50,
      borderRadius: theme.borderRadius.md,
      marginRight: theme.spacing.md,
    },
    turfDetails: {
      flex: 1,
    },
    turfName: {
      ...theme.typography.h4,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    turfLocation: {
      ...theme.typography.body2,
      color: theme.colors.textSecondary,
    },
    section: {
      backgroundColor: theme.colors.card,
      marginTop: theme.spacing.sm,
      padding: theme.spacing.lg,
    },
    sectionTitle: {
      ...theme.typography.h4,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    calendar: {
      borderRadius: theme.borderRadius.md,
    },
    timeSlotsContainer: {
      marginTop: theme.spacing.md,
    },
    timeSlotsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    timeSlot: {
      width: '30%',
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.md,
      paddingVertical: theme.spacing.md,
      alignItems: 'center',
      marginBottom: theme.spacing.sm,
    },
    selectedSlot: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    disabledSlot: {
      backgroundColor: theme.colors.disabled,
      borderColor: theme.colors.disabled,
    },
    timeSlotText: {
      ...theme.typography.body2,
      color: theme.colors.text,
    },
    selectedSlotText: {
      color: theme.colors.textLight,
    },
    disabledSlotText: {
      color: theme.colors.textSecondary,
    },
    paymentOptions: {
      marginTop: theme.spacing.md,
    },
    paymentOption: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.sm,
    },
    selectedPaymentOption: {
      backgroundColor: theme.colors.primary + '10',
      borderColor: theme.colors.primary,
    },
    paymentRadio: {
      marginRight: theme.spacing.md,
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
    paymentInfo: {
      flex: 1,
    },
    paymentTitle: {
      ...theme.typography.body1,
      color: theme.colors.text,
      fontWeight: '600',
    },
    paymentDescription: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    paymentAmount: {
      ...theme.typography.h4,
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
    selectedPaymentText: {
      color: theme.colors.primary,
    },
    bookingSummary: {
      backgroundColor: theme.colors.card,
      marginTop: theme.spacing.sm,
      padding: theme.spacing.lg,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.sm,
    },
    summaryLabel: {
      ...theme.typography.body1,
      color: theme.colors.textSecondary,
    },
    summaryValue: {
      ...theme.typography.body1,
      color: theme.colors.text,
      fontWeight: '600',
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
      ...theme.typography.h4,
      color: theme.colors.text,
    },
    totalValue: {
      ...theme.typography.h3,
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
    proceedButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.md,
      paddingVertical: theme.spacing.md,
      alignItems: 'center',
      marginTop: theme.spacing.md,
      ...theme.shadows.md,
    },
    proceedButtonDisabled: {
      backgroundColor: theme.colors.disabled,
    },
    proceedButtonText: {
      ...theme.typography.h4,
      color: theme.colors.textLight,
    },
    infoText: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginTop: theme.spacing.sm,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.turfInfo}>
          <Image
            source={{ uri: turf.images[0] }}
            style={styles.turfImage}
          />
          <View style={styles.turfDetails}>
            <Text style={styles.turfName}>{turf.name}</Text>
            <Text style={styles.turfLocation}>{turf.location}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <Calendar
            onDayPress={handleDateSelect}
            markedDates={markedDates}
            minDate={new Date().toISOString().split('T')[0]}
            theme={{
              backgroundColor: theme.colors.card,
              calendarBackground: theme.colors.card,
              textSectionTitleColor: theme.colors.text,
              selectedDayBackgroundColor: theme.colors.primary,
              selectedDayTextColor: theme.colors.textLight,
              todayTextColor: theme.colors.primary,
              dayTextColor: theme.colors.text,
              textDisabledColor: theme.colors.disabled,
              arrowColor: theme.colors.primary,
              monthTextColor: theme.colors.text,
              textDayFontWeight: 'normal',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: 'normal',
            }}
            style={styles.calendar}
          />
        </View>

        {selectedDate && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Time Slots</Text>
            <View style={styles.timeSlotsContainer}>
              <View style={styles.timeSlotsGrid}>
                {TIME_SLOTS.map(renderTimeSlot)}
              </View>
            </View>
          </View>
        )}

        {selectedSlots.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Option</Text>
            <View style={styles.paymentOptions}>
              {renderPaymentOption(PAYMENT_TYPES.FULL)}
              {renderPaymentOption(PAYMENT_TYPES.ADVANCE)}
            </View>
          </View>
        )}

        {selectedSlots.length > 0 && (
          <View style={styles.bookingSummary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Date</Text>
              <Text style={styles.summaryValue}>
                {new Date(selectedDate).toLocaleDateString('en-US', {
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
                {selectedSlots.length} slot{selectedSlots.length > 1 ? 's' : ''}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Payment Type</Text>
              <Text style={styles.summaryValue}>
                {paymentType === PAYMENT_TYPES.ADVANCE ? 'Advance' : 'Full'}
              </Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>₹{calculatePrice()}</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.proceedButton,
                !selectedDate && styles.proceedButtonDisabled,
              ]}
              onPress={handleProceedToPayment}
              disabled={!selectedDate || selectedSlots.length === 0}
            >
              <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
            </TouchableOpacity>

            <Text style={styles.infoText}>
              Bookings once confirmed are non-refundable and cannot be cancelled
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default BookingScreen;
