import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/theme';
import { useAuth } from '../../navigation/AppNavigator';
import { STATIC_TURFS } from '../../constants/constants';

const OwnerTurfsScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [ownerTurfs, setOwnerTurfs] = useState([]);

  useEffect(() => {
    loadOwnerTurfs();
  }, []);

  const loadOwnerTurfs = () => {
    // Filter turfs belonging to the current owner
    const turfs = STATIC_TURFS.filter(turf => turf.ownerId === user?.id);
    setOwnerTurfs(turfs);
  };

  const renderTurfCard = ({ item }) => (
    <View style={styles.turfCard}>
      <View style={styles.cardHeader}>
        <View style={styles.turfInfo}>
          <Text style={styles.turfName}>{item.name}</Text>
          <Text style={styles.turfLocation}>
            <Icon name="location-on" size={14} color={theme.colors.textSecondary} />
            {' '}{item.location}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => Alert.alert('Edit Turf', 'Edit turf feature coming soon!')}
        >
          <Icon name="edit" size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.turfStats}>
        <View style={styles.statItem}>
          <Icon name="attach-money" size={16} color={theme.colors.primary} />
          <Text style={styles.statText}>₹{item.pricePerSlot}/slot</Text>
        </View>
        
        <View style={styles.statItem}>
          <Icon name="star" size={16} color={theme.colors.accent} />
          <Text style={styles.statText}>{item.rating} ({item.reviews})</Text>
        </View>

        <View style={styles.statItem}>
          <Icon name="schedule" size={16} color={theme.colors.textSecondary} />
          <Text style={styles.statText}>{item.workingHours.opening} - {item.workingHours.closing}</Text>
        </View>
      </View>

      <View style={styles.turfDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Sports:</Text>
          <Text style={styles.detailValue}>Football, Cricket</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Facilities:</Text>
          <Text style={styles.detailValue}>Parking, Washroom, Lights</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Slot Duration:</Text>
          <Text style={styles.detailValue}>{item.slotDuration} minutes</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <TouchableOpacity
          style={[styles.actionButton, styles.manageButton]}
          onPress={() => Alert.alert('Manage Turf', 'Turf management features coming soon!')}
        >
          <Icon name="settings" size={16} color={theme.colors.primary} />
          <Text style={styles.actionButtonText}>Manage</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, slots.bookingsButton]}
          onPress={() => navigation.navigate('OwnerBookings')}
        >
          <Icon name="book" size={16} color={theme.colors.success} />
          <Text style={styles.actionButtonText}>Bookings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      ...theme.typography.h2,
      color: theme.colors.text,
    },
    addButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      flexDirection: 'row',
      alignItems: 'center',
    },
    addButtonText: {
      ...theme.typography.body2,
      color: theme.colors.textLight,
      marginLeft: theme.spacing.xs,
    },
    turfList: {
      flex: 1,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
    },
    turfCard: {
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
    editButton: {
      backgroundColor: theme.colors.primary + '10',
      borderRadius: theme.borderRadius.sm,
      padding: theme.spacing.sm,
    },
    turfStats: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.md,
      paddingBottom: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    statItem: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    statText: {
      ...theme.typography.caption,
      color: theme.colors.text,
      marginLeft: theme.spacing.xs,
    },
    turfDetails: {
      marginBottom: theme.spacing.md,
    },
    detailRow: {
      flexDirection: 'row',
      marginBottom: theme.spacing.sm,
    },
    detailLabel: {
      ...theme.typography.body2,
      color: theme.colors.textSecondary,
      width: 100,
    },
    detailValue: {
      ...theme.typography.body2,
      color: theme.colors.text,
      flex: 1,
    },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: theme.spacing.md,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: theme.borderRadius.sm,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: theme.spacing.xs,
    },
    manageButton: {
      backgroundColor: theme.colors.primary + '10',
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    bookingsButton: {
      backgroundColor: theme.colors.success + '10',
      borderWidth: 1,
      borderColor: theme.colors.success,
    },
    actionButtonText: {
      ...theme.typography.caption,
      color: theme.colors.text,
      fontWeight: '600',
      marginLeft: theme.spacing.xs,
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
    emptyStateSubtext: {
      ...theme.typography.body2,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginTop: theme.spacing.sm,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Turfs</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('TurfRegistration')}
        >
          <Icon name="add" size={20} color={theme.colors.textLight} />
          <Text style={styles.addButtonText}>Add Turf</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.turfList}
        data={ownerTurfs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTurfCard}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="grass" size={64} color={theme.colors.textSecondary} style={styles.emptyStateIcon} />
            <Text style={styles.emptyStateText}>No turfs found</Text>
            <Text style={styles.emptyStateSubtext}>Add your first turf to get started</Text>
          </View>
        }
      />
    </View>
  );
};

export default OwnerTurfsScreen;
