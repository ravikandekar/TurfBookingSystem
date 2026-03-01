import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/theme';
import { ANALYTICS_DATA, BOOKING_STATUS, STATIC_TURFS } from '../../constants/constants';

const { width } = Dimensions.get('window');

const AdminDashboardScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [analytics, setAnalytics] = useState(ANALYTICS_DATA);
  const [recentBookings, setRecentBookings] = useState([]);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    loadData();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const loadData = () => {
    // Simulate recent bookings data
    const mockRecentBookings = [
      {
        id: 1,
        turfName: STATIC_TURFS[0].name,
        userName: 'John Doe',
        date: '2024-02-15',
        slots: ['08:00', '09:00'],
        amount: 3000,
        status: BOOKING_STATUS.CONFIRMED,
      },
      {
        id: 2,
        turfName: STATIC_TURFS[1].name,
        userName: 'Jane Smith',
        date: '2024-02-15',
        slots: ['18:00', '19:00'],
        amount: 2400,
        status: BOOKING_STATUS.PENDING,
      },
      {
        id: 3,
        turfName: STATIC_TURFS[2].name,
        userName: 'Mike Johnson',
        date: '2024-02-14',
        slots: ['10:00', '11:00', '12:00'],
        amount: 3000,
        status: BOOKING_STATUS.CONFIRMED,
      },
    ];

    setRecentBookings(mockRecentBookings);
  };

  const renderStatCard = (title, value, icon, color, subtitle) => {
    const scaleAnim = new Animated.Value(0);
    
    useEffect(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 7,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <Animated.View
        style={[
          styles.statCard,
          {
            transform: [{ scale: scaleAnim }],
            backgroundColor: color + '10',
            borderColor: color + '30',
          }
        ]}
      >
        <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
          <Icon name={icon} size={24} color={color} />
        </View>
        <Text style={[styles.statValue, { color }]}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
        {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
      </Animated.View>
    );
  };

  const renderBookingItem = (booking, index) => {
    const slideAnim = new Animated.Value(50);
    
    useEffect(() => {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    }, []);

    const getStatusColor = (status) => {
      switch (status) {
        case BOOKING_STATUS.CONFIRMED:
          return theme.colors.success;
        case BOOKING_STATUS.PENDING:
          return theme.colors.warning;
        default:
          return theme.colors.textSecondary;
      }
    };

    return (
      <Animated.View
        style={[
          styles.bookingItem,
          { transform: [{ translateX: slideAnim }] }
        ]}
      >
        <View style={styles.bookingInfo}>
          <Text style={styles.bookingTurf}>{booking.turfName}</Text>
          <Text style={styles.bookingUser}>{booking.userName}</Text>
          <Text style={styles.bookingDate}>
            {new Date(booking.date).toLocaleDateString()} • {booking.slots.join(', ')}
          </Text>
        </View>
        <View style={styles.bookingRight}>
          <Text style={styles.bookingAmount}>₹{booking.amount}</Text>
          <View style={[styles.bookingStatus, { backgroundColor: getStatusColor(booking.status) + '20' }]}>
            <Text style={[styles.bookingStatusText, { color: getStatusColor(booking.status) }]}>
              {booking.status}
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  const renderQuickAction = (title, icon, onPress, color) => (
    <TouchableOpacity
      key={title}
      style={[styles.quickAction, { backgroundColor: color + '10' }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.quickActionIcon, { backgroundColor: color + '20' }]}>
        <Icon name={icon} size={24} color={color} />
      </View>
      <Text style={styles.quickActionText}>{title}</Text>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
    },
    header: {
      padding: theme.spacing.lg,
      paddingBottom: theme.spacing.md,
    },
    title: {
      ...theme.typography.h2,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    subtitle: {
      ...theme.typography.body1,
      color: theme.colors.textSecondary,
    },
    statsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.lg,
      marginBottom: theme.spacing.lg,
    },
    statCard: {
      width: '48%',
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.md,
      borderWidth: 1,
      alignItems: 'center',
      ...theme.shadows.md,
    },
    statIcon: {
      width: 48,
      height: 48,
      borderRadius: theme.borderRadius.md,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing.sm,
    },
    statValue: {
      ...theme.typography.h2,
      fontWeight: 'bold',
      marginBottom: theme.spacing.xs,
    },
    statTitle: {
      ...theme.typography.body2,
      color: theme.colors.text,
      textAlign: 'center',
    },
    statSubtitle: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginTop: 2,
    },
    quickActionsContainer: {
      paddingHorizontal: theme.spacing.lg,
      marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
      ...theme.typography.h4,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    quickActionsGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    quickAction: {
      width: '30%',
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      alignItems: 'center',
      ...theme.shadows.sm,
    },
    quickActionIcon: {
      width: 48,
      height: 48,
      borderRadius: theme.borderRadius.md,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing.sm,
    },
    quickActionText: {
      ...theme.typography.caption,
      color: theme.colors.text,
      textAlign: 'center',
      fontWeight: '500',
    },
    recentBookingsContainer: {
      backgroundColor: theme.colors.card,
      marginHorizontal: theme.spacing.lg,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.lg,
      ...theme.shadows.md,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    viewAllButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    viewAllText: {
      ...theme.typography.body2,
      color: theme.colors.primary,
      marginRight: theme.spacing.xs,
    },
    bookingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    bookingItemLastChild: {
      borderBottomWidth: 0,
    },
    bookingInfo: {
      flex: 1,
    },
    bookingTurf: {
      ...theme.typography.body1,
      color: theme.colors.text,
      fontWeight: '600',
      marginBottom: 2,
    },
    bookingUser: {
      ...theme.typography.body2,
      color: theme.colors.textSecondary,
      marginBottom: 2,
    },
    bookingDate: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
    },
    bookingRight: {
      alignItems: 'flex-end',
    },
    bookingAmount: {
      ...theme.typography.body1,
      color: theme.colors.text,
      fontWeight: '600',
      marginBottom: theme.spacing.xs,
    },
    bookingStatus: {
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.sm,
    },
    bookingStatusText: {
      ...theme.typography.caption,
      fontWeight: '600',
    },
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Admin Dashboard</Text>
          <Text style={styles.subtitle}>Manage your turf booking platform</Text>
        </View>

        <View style={styles.statsContainer}>
          {renderStatCard('Total Revenue', `₹${(analytics.totalRevenue / 100000).toFixed(1)}L`, 'payments', theme.colors.success, 'This month')}
          {renderStatCard('Total Bookings', analytics.totalBookings.toString(), 'book', theme.colors.primary, 'All time')}
          {renderStatCard('Active Turfs', analytics.activeTurfs.toString(), 'grass', theme.colors.info, 'Currently active')}
          {renderStatCard('Active Users', analytics.activeUsers.toString(), 'people', theme.colors.warning, 'Registered users')}
        </View>

        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {renderQuickAction('Manual Booking', 'add-circle', () => navigation.navigate('ManualBooking'), theme.colors.primary)}
            {renderQuickAction('Add Turf', 'add-location', () => navigation.navigate('AdminTurfs'), theme.colors.success)}
            {renderQuickAction('Add User', 'person-add', () => navigation.navigate('AdminUsers'), theme.colors.info)}
          </View>
        </View>

        <View style={styles.recentBookingsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Bookings</Text>
            <TouchableOpacity
              style={styles.viewAllButton}
              onPress={() => navigation.navigate('AdminBookings')}
            >
              <Text style={styles.viewAllText}>View All</Text>
              <Icon name="chevron-right" size={16} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
          {recentBookings.map((booking, index) => renderBookingItem(booking, index))}
        </View>
      </ScrollView>
    </Animated.View>
  );
};

export default AdminDashboardScreen;
