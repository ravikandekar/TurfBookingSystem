import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/theme';
import { BOOKING_STATUS, STATIC_TURFS } from '../../constants/constants';

const BookingHistoryScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [bookings, setBookings] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    // Simulate booking data
    const mockBookings = [
      {
        id: 1,
        turfId: 1,
        turf: STATIC_TURFS[0],
        date: '2024-02-15',
        slots: ['08:00', '09:00'],
        amount: 3000,
        status: BOOKING_STATUS.CONFIRMED,
        paymentStatus: 'FULL',
        bookingDate: '2024-02-10',
      },
      {
        id: 2,
        turfId: 2,
        turf: STATIC_TURFS[1],
        date: '2024-02-20',
        slots: ['18:00', '19:00', '20:00'],
        amount: 3600,
        status: BOOKING_STATUS.CONFIRMED,
        paymentStatus: 'ADVANCE',
        bookingDate: '2024-02-12',
      },
      {
        id: 3,
        turfId: 3,
        turf: STATIC_TURFS[2],
        date: '2024-02-08',
        slots: ['10:00', '11:00'],
        amount: 2000,
        status: BOOKING_STATUS.CANCELLED_BY_OWNER,
        paymentStatus: 'REFUNDED',
        bookingDate: '2024-02-05',
      },
      {
        id: 4,
        turfId: 1,
        turf: STATIC_TURFS[0],
        date: '2024-02-25',
        slots: ['16:00', '17:00'],
        amount: 3000,
        status: BOOKING_STATUS.PENDING,
        paymentStatus: 'PENDING',
        bookingDate: '2024-02-13',
      },
    ];

    let filteredBookings = mockBookings;
    if (selectedFilter !== 'all') {
      filteredBookings = mockBookings.filter(booking => booking.status === selectedFilter);
    }

    setBookings(filteredBookings);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadBookings();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case BOOKING_STATUS.CONFIRMED:
        return theme.colors.success;
      case BOOKING_STATUS.PENDING:
        return theme.colors.warning;
      case BOOKING_STATUS.CANCELLED:
      case BOOKING_STATUS.CANCELLED_BY_OWNER:
      case BOOKING_STATUS.CANCELLED_BY_ADMIN:
        return theme.colors.error;
      default:
        return theme.colors.textSecondary;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case BOOKING_STATUS.CONFIRMED:
        return 'Confirmed';
      case BOOKING_STATUS.PENDING:
        return 'Pending Payment';
      case BOOKING_STATUS.CANCELLED:
        return 'Cancelled';
      case BOOKING_STATUS.CANCELLED_BY_OWNER:
        return 'Cancelled by Owner';
      case BOOKING_STATUS.CANCELLED_BY_ADMIN:
        return 'Cancelled by Admin';
      default:
        return status;
    }
  };

  const renderBookingCard = ({ item, index }) => {
    const fadeAnim = new Animated.Value(0);
    
    React.useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <Animated.View
        style={[
          styles.bookingCard,
          { opacity: fadeAnim }
        ]}
      >
        <View style={styles.cardHeader}>
          <View style={styles.turfInfo}>
            <Text style={styles.turfName}>{item.turf.name}</Text>
            <Text style={styles.turfLocation}>
              <Icon name="location-on" size={14} color={theme.colors.textSecondary} />
              {' '}{item.turf.location}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {getStatusText(item.status)}
            </Text>
          </View>
        </View>

        <View style={styles.bookingDetails}>
          <View style={styles.detailRow}>
            <Icon name="calendar-today" size={16} color={theme.colors.textSecondary} />
            <Text style={styles.detailText}>
              {new Date(item.date).toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Icon name="schedule" size={16} color={theme.colors.textSecondary} />
            <Text style={styles.detailText}>
              {item.slots.join(', ')}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Icon name="payments" size={16} color={theme.colors.textSecondary} />
            <Text style={styles.detailText}>
              ₹{item.amount} • {item.paymentStatus}
            </Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.bookingDate}>
            Booked on {new Date(item.bookingDate).toLocaleDateString()}
          </Text>
          {item.status === BOOKING_STATUS.CONFIRMED && (
            <TouchableOpacity
              style={styles.viewButton}
              onPress={() => {
                // Navigate to booking details
                Alert.alert('Booking Details', 'Booking details feature coming soon!');
              }}
            >
              <Text style={styles.viewButtonText}>View Details</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    );
  };

  const renderFilterChip = (filter) => {
    const isSelected = selectedFilter === filter.value;
    const count = bookings.filter(b => filter.value === 'all' ? true : b.status === filter.value).length;

    return (
      <TouchableOpacity
        key={filter.value}
        style={[
          styles.filterChip,
          isSelected && styles.selectedFilterChip,
        ]}
        onPress={() => setSelectedFilter(filter.value)}
      >
        <Text style={[
          styles.filterChipText,
          isSelected && styles.selectedFilterChipText,
        ]}>
          {filter.label} ({count})
        </Text>
      </TouchableOpacity>
    );
  };

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Confirmed', value: BOOKING_STATUS.CONFIRMED },
    { label: 'Pending', value: BOOKING_STATUS.PENDING },
    { label: 'Cancelled', value: BOOKING_STATUS.CANCELLED },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      backgroundColor: theme.colors.card,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    title: {
      ...theme.typography.h2,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    filterContainer: {
      flexDirection: 'row',
    },
    filterChip: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.xl,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      marginRight: theme.spacing.sm,
    },
    selectedFilterChip: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    filterChipText: {
      ...theme.typography.body2,
      color: theme.colors.text,
    },
    selectedFilterChipText: {
      color: theme.colors.textLight,
    },
    bookingList: {
      flex: 1,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
    },
    bookingCard: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.md,
      ...theme.shadows.md,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: theme.spacing.md,
    },
    turfInfo: {
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
    statusBadge: {
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.sm,
    },
    statusText: {
      ...theme.typography.caption,
      fontWeight: '600',
    },
    bookingDetails: {
      marginBottom: theme.spacing.md,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.sm,
    },
    detailText: {
      ...theme.typography.body2,
      color: theme.colors.text,
      marginLeft: theme.spacing.sm,
    },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: theme.spacing.md,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    bookingDate: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
    },
    viewButton: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.sm,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
    },
    viewButtonText: {
      ...theme.typography.caption,
      color: theme.colors.primary,
      fontWeight: '600',
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: theme.spacing.xxl,
    },
    emptyStateIcon: {
      marginBottom: theme.spacing.md,
    },
    emptyStateText: {
      ...theme.typography.body1,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
        <View style={styles.filterContainer}>
          {filters.map(renderFilterChip)}
        </View>
      </View>

      <FlatList
        style={styles.bookingList}
        data={bookings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBookingCard}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="book" size={64} color={theme.colors.textSecondary} style={styles.emptyStateIcon} />
            <Text style={styles.emptyStateText}>No bookings found</Text>
          </View>
        }
      />
    </View>
  );
};

export default BookingHistoryScreen;
