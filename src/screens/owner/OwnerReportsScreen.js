import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/theme';

const { width } = Dimensions.get('window');

const OwnerReportsScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const reportsData = {
    today: {
      revenue: 15000,
      bookings: 8,
      occupancy: 75,
      avgRating: 4.5,
    },
    week: {
      revenue: 85000,
      bookings: 42,
      occupancy: 78,
      avgRating: 4.4,
    },
    month: {
      revenue: 320000,
      bookings: 156,
      occupancy: 82,
      avgRating: 4.5,
    },
  };

  const currentData = reportsData[selectedPeriod];

  const renderStatCard = (title, value, icon, color, subtitle) => (
    <View style={[
      styles.statCard,
      { backgroundColor: color + '10', borderColor: color + '30' }
    ]}>
      <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
        <Icon name={icon} size={24} color={color} />
      </View>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </View>
  );

  const renderPeriodSelector = () => (
    <View style={styles.periodSelector}>
      {[
        { key: 'today', label: 'Today' },
        { key: 'week', label: 'This Week' },
        { key: 'month', label: 'This Month' },
      ].map((period) => (
        <TouchableOpacity
          key={period.key}
          style={[
            styles.periodChip,
            selectedPeriod === period.key && styles.selectedPeriodChip,
          ]}
          onPress={() => setSelectedPeriod(period.key)}
        >
          <Text style={[
            styles.periodChipText,
            selectedPeriod === period.key && styles.selectedPeriodChipText,
          ]}>
            {period.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderExportButton = () => (
    <TouchableOpacity style={styles.exportButton}>
      <Icon name="download" size={20} color={theme.colors.textLight} />
      <Text style={styles.exportButtonText}>Export CSV</Text>
    </TouchableOpacity>
  );

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
    periodSelector: {
      flexDirection: 'row',
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.xs,
      marginBottom: theme.spacing.lg,
      ...theme.shadows.sm,
    },
    periodChip: {
      flex: 1,
      paddingVertical: theme.spacing.sm,
      alignItems: 'center',
      borderRadius: theme.borderRadius.sm,
    },
    selectedPeriodChip: {
      backgroundColor: theme.colors.primary,
    },
    periodChipText: {
      ...theme.typography.body2,
      color: theme.colors.text,
    },
    selectedPeriodChipText: {
      color: theme.colors.textLight,
      fontWeight: '600',
    },
    statsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
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
    chartContainer: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.lg,
      ...theme.shadows.md,
    },
    chartTitle: {
      ...theme.typography.h4,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    chartPlaceholder: {
      height: 200,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderStyle: 'dashed',
    },
    chartPlaceholderText: {
      ...theme.typography.body2,
      color: theme.colors.textSecondary,
    },
    recentActivity: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.lg,
      ...theme.shadows.md,
    },
    activityTitle: {
      ...theme.typography.h4,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    activityItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    activityItemLastChild: {
      borderBottomWidth: 0,
    },
    activityIcon: {
      width: 40,
      height: 40,
      borderRadius: theme.borderRadius.sm,
      backgroundColor: theme.colors.primary + '10',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.spacing.md,
    },
    activityInfo: {
      flex: 1,
    },
    activityText: {
      ...theme.typography.body2,
      color: theme.colors.text,
      marginBottom: 2,
    },
    activityTime: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
    },
    activityAmount: {
      ...theme.typography.body2,
      color: theme.colors.primary,
      fontWeight: '600',
    },
    exportButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.md,
      paddingVertical: theme.spacing.md,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      ...theme.shadows.lg,
    },
    exportButtonText: {
      ...theme.typography.h4,
      color: theme.colors.textLight,
      fontWeight: 'bold',
      marginLeft: theme.spacing.sm,
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
        <Text style={styles.title}>Reports & Analytics</Text>

        {renderPeriodSelector()}

        <View style={styles.statsContainer}>
          {renderStatCard('Revenue', `₹${currentData.revenue.toLocaleString()}`, 'payments', theme.colors.success, selectedPeriod)}
          {renderStatCard('Bookings', currentData.bookings.toString(), 'book', theme.colors.primary, selectedPeriod)}
          {renderStatCard('Occupancy', `${currentData.occupancy}%`, 'pie-chart', theme.colors.warning, 'Average')}
          {renderStatCard('Rating', currentData.avgRating.toString(), 'star', theme.colors.accent, 'Average')}
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Revenue Trend</Text>
          <View style={styles.chartPlaceholder}>
            <Icon name="insert-chart" size={48} color={theme.colors.textSecondary} />
            <Text style={styles.chartPlaceholderText}>Chart visualization coming soon!</Text>
          </View>
        </View>

        <View style={styles.recentActivity}>
          <Text style={styles.activityTitle}>Recent Activity</Text>
          
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Icon name="book" size={20} color={theme.colors.primary} />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityText}>New booking confirmed</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
            <Text style={styles.activityAmount}>₹3,000</Text>
          </View>

          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Icon name="payments" size={20} color={theme.colors.success} />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityText}>Payment received</Text>
              <Text style={styles.activityTime}>5 hours ago</Text>
            </View>
            <Text style={styles.activityAmount}>₹1,500</Text>
          </View>

          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Icon name="cancel" size={20} color={theme.colors.error} />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityText}>Booking cancelled</Text>
              <Text style={styles.activityTime}>1 day ago</Text>
            </View>
            <Text style={styles.activityAmount}>-₹2,400</Text>
          </View>

          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Icon name="star" size={20} color={theme.colors.accent} />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityText}>New review received</Text>
              <Text style={styles.activityTime}>2 days ago</Text>
            </View>
            <Text style={styles.activityAmount}>5.0</Text>
          </View>
        </View>

        {renderExportButton()}
      </ScrollView>
    </LinearGradient>
  );
};

export default OwnerReportsScreen;
