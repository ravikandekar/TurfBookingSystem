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
import { useAuth } from '../../navigation/AppNavigator';
import { BOOKING_STATUS, STATIC_TURFS, SUBSCRIPTION_STATUS } from '../../constants/constants';

const { width } = Dimensions.get('window');

const OwnerDashboardScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState({
    todayRevenue: 15000,
    weeklyRevenue: 85000,
    monthlyRevenue: 320000,
    todayBookings: 8,
    totalBookings: 156,
    occupancyRate: 78.5,
    averageRating: 4.5,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [subscriptionStatus, setSubscriptionStatus] = useState(SUBSCRIPTION_STATUS.ACTIVE);
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
    // Get owner's turfs
    const ownerTurfs = STATIC_TURFS.filter(turf => turf.ownerId === user?.id);
    
    // Simulate recent bookings data
    const mockRecentBookings = [
      {
        id: 1,
        turfName: ownerTurfs[0]?.name || 'Turf 1',
        userName: 'John Doe',
        date: '2024-02-15',
        slots: ['08:00', '09:00'],
        amount: 3000,
        status: BOOKING_STATUS.CONFIRMED,
      },
      {
        id: 2,
        turfName: ownerTurfs[0]?.name || 'Turf 1',
        userName: 'Jane Smith',
        date: '2024-02-15',
        slots: ['18:00', '19:00'],
        amount: 2400,
        status: BOOKING_STATUS.PENDING,
      },
      {
        id: 3,
        turfName: ownerTurfs[1]?.name || 'Turf 2',
        userName: 'Mike Johnson',
        date: '2024-02-14',
        slots: ['10:00', '11:00', '12:00'],
        amount: 3600,
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

  const renderSubscriptionCard = () => {
    const isExpired = subscriptionStatus === SUBSCRIPTION_STATUS.EXPIRED;
    
    return (
      <View style={[
        styles.subscriptionCard,
        { backgroundColor: isExpired ? theme.colors.error + '10' : theme.colors.success + '10' }
      ]}>
        <View style={styles.subscriptionHeader}>
          <View style={styles.subscriptionIcon}>
            <Icon 
              name={isExpired ? 'error' : 'check-circle'} 
              size={32} 
              color={isExpired ? theme.colors.error : theme.colors.success} 
            />
          </View>
          <View style={styles.subscriptionInfo}>
            <Text style={styles.subscriptionTitle}>Subscription Status</Text>
            <Text style={[
              styles.subscriptionStatus,
              { color: isExpired ? theme.colors.error : theme.colors.success }
            ]}>
              {subscriptionStatus}
            </Text>
          </View>
        </View>
        
        {isExpired && (
          <View style={styles.expiredActions}>
            <Text style={styles.expiredText}>
              Your subscription has expired. Contact admin to renew.
            </Text>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={() => Alert.alert('Contact Admin', 'Please call +919876543210 to renew your subscription.')}
            >
              <Text style={styles.contactButtonText}>Contact Admin</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {!isExpired && (
          <View style={styles.subscriptionDetails}>
            <Text style={styles.subscriptionDetailText}>
              Valid until: Dec 31, 2024
            </Text>
            <Text style={styles.subscriptionDetailText}>
              30 days remaining
            </Text>
          </View>
        )}
      </View>
    );
  };

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
    subscriptionCard: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      marginHorizontal: theme.spacing.lg,
      marginBottom: theme.spacing.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadows.md,
    },
    subscriptionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    subscriptionIcon: {
      width: 56,
      height: 56,
      borderRadius: theme.borderRadius.md,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.spacing.md,
    },
    subscriptionInfo: {
      flex: 1,
    },
    subscriptionTitle: {
      ...theme.typography.h4,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    subscriptionStatus: {
      ...theme.typography.h3,
      fontWeight: 'bold',
    },
    expiredActions: {
      alignItems: 'center',
    },
    expiredText: {
      ...theme.typography.body2,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: theme.spacing.md,
    },
    contactButton: {
      backgroundColor: theme.colors.error,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm,
    },
    contactButtonText: {
      ...theme.typography.body2,
      color: theme.colors.textLight,
      fontWeight: '600',
    },
    subscriptionDetails: {
      paddingTop: theme.spacing.sm,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    subscriptionDetailText: {
      ...theme.typography.body2,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xs,
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
    sectionTitle: {
      ...theme.typography.h4,
      color: theme.colors.text,
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
          <Text style={styles.title}>Owner Dashboard</Text>
          <Text style={styles.subtitle}>Manage your turf operations</Text>
        </View>

        {renderSubscriptionCard()}

        <View style={styles.statsContainer}>
          {renderStatCard('Today Revenue', `₹${analytics.todayRevenue}`, 'payments', theme.colors.success, 'Today')}
          {renderStatCard('Today Bookings', analytics.todayBookings.toString(), 'book', theme.colors.primary, 'Today')}
          {renderStatCard('Monthly Revenue', `₹${(analytics.monthlyRevenue / 1000).toFixed(0)}K`, 'trending-up', theme.colors.info, 'This month')}
          {renderStatCard('Occupancy Rate', `${analytics.occupancyRate}%`, 'pie-chart', theme.colors.warning, 'Average')}
        </View>

        <View style={styles.recentBookingsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Bookings</Text>
            <TouchableOpacity
              style={styles.viewAllButton}
              onPress={() => navigation.navigate('OwnerBookings')}
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

export default OwnerDashboardScreen;
